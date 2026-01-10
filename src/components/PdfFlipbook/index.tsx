import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faExpand, 
  faCompress, 
  faSpinner,
  faSearchPlus,
  faSearchMinus,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

// 設定 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// IndexedDB 快取工具
const DB_NAME = 'pdf_cache_db';
const STORE_NAME = 'pdf_pages';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    };
  });
};

const getCachedPDF = async (url: string): Promise<{ pages: string[], totalPages: number } | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          // 檢查快取是否過期（7天）
          const cacheAge = Date.now() - result.timestamp;
          const maxAge = 7 * 24 * 60 * 60 * 1000;
          if (cacheAge < maxAge) {
            resolve({ pages: result.pages, totalPages: result.totalPages });
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('無法讀取快取:', error);
    return null;
  }
};

const cachePDF = async (url: string, pages: string[], totalPages: number): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const data = {
      url,
      pages,
      totalPages,
      timestamp: Date.now()
    };
    
    store.put(data);
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.warn('無法儲存快取:', error);
  }
};

interface PdfFlipbookProps {
  pdfUrl: string;
  className?: string;
}

const PdfFlipbook = ({ pdfUrl, className = '' }: PdfFlipbookProps) => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0); // 載入進度 (0-100)
  const [loadingStatus, setLoadingStatus] = useState(''); // 載入狀態訊息
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pageInput, setPageInput] = useState(''); // 頁碼輸入框
  const [showPageInput, setShowPageInput] = useState(false); // 是否顯示輸入框
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  // 載入 PDF 並轉換成圖片（使用 IndexedDB 快取）
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        setLoadingProgress(0);
        setLoadingStatus('檢查快取...');

        // 嘗試從 IndexedDB 讀取快取
        const cached = await getCachedPDF(pdfUrl);
        
        if (cached) {
          console.log('✅ 從快取載入 PDF');
          setLoadingStatus('從快取載入完成');
          setLoadingProgress(100);
          setPages(cached.pages);
          setTotalPages(cached.totalPages);
          setLoading(false);
          return;
        }

        console.log('📥 下載並轉換 PDF...');
        setLoadingStatus('正在下載 PDF...');
        
        // 使用帶進度追蹤的方式載入 PDF
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        
        // 標記下載是否完成
        let downloadComplete = false;
        
        // 監聽下載進度
        loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
          if (progressData.total > 0 && !downloadComplete) {
            const downloadProgress = Math.round((progressData.loaded / progressData.total) * 30); // 下載佔 30%
            setLoadingProgress(downloadProgress);
            setLoadingStatus(`下載中... ${Math.round((progressData.loaded / progressData.total) * 100)}%`);
          }
        };
        
        const pdf = await loadingTask.promise;
        downloadComplete = true; // 標記下載完成
        
        const numPages = pdf.numPages;
        setTotalPages(numPages);
        setLoadingProgress(30);
        setLoadingStatus('下載完成，開始轉換頁面...');

        const pageImages: string[] = [];

        for (let i = 1; i <= numPages; i++) {
          setLoadingStatus(`轉換頁面: ${i} / ${numPages}`);
          
          const page = await pdf.getPage(i);
          const pdfScale = 2; // 高解析度
          const viewport = page.getViewport({ scale: pdfScale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context!,
            viewport: viewport,
          }).promise;

          pageImages.push(canvas.toDataURL('image/jpeg', 0.9));
          
          // 更新進度 (30% 下載 + 60% 轉換 + 10% 快取)
          const conversionProgress = 30 + Math.round((i / numPages) * 60);
          setLoadingProgress(conversionProgress);
        }

        setPages(pageImages);
        setLoadingProgress(90);
        setLoadingStatus('正在儲存快取...');
        
        // 儲存到 IndexedDB
        await cachePDF(pdfUrl, pageImages, numPages);
        console.log('💾 PDF 已快取到 IndexedDB');
        
        setLoadingProgress(100);
        setLoadingStatus('載入完成！');
        
        // 短暫延遲後關閉載入畫面
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error('PDF 載入錯誤:', err);
        setError('無法載入 PDF 檔案');
        setLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  // 翻頁控制
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // 重置縮放
      transformRef.current?.resetTransform();
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      // 重置縮放
      transformRef.current?.resetTransform();
    }
  };

  // 跳轉到指定頁面
  const goToPage = (pageNum: number) => {
    const targetPage = pageNum - 1; // 轉換為 0-based index
    if (targetPage >= 0 && targetPage < totalPages) {
      setCurrentPage(targetPage);
      // 重置縮放
      transformRef.current?.resetTransform();
      setShowPageInput(false);
      setPageInput('');
    }
  };

  // 處理頁碼輸入
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允許數字
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  // 處理頁碼輸入提交
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  // 處理頁碼輸入框失焦
  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    } else {
      setShowPageInput(false);
      setPageInput('');
    }
  };

  // 縮放控制
  const handleZoomIn = () => {
    transformRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    transformRef.current?.zoomOut();
  };

  const handleResetZoom = () => {
    transformRef.current?.resetTransform();
  };

  // 全螢幕切換
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 監聽全螢幕變化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        {/* 載入圖示 */}
        <div className="relative mb-6">
          <FontAwesomeIcon 
            icon={faSpinner} 
            className="text-5xl text-blue-500 animate-spin" 
          />
          {/* 進度百分比 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600 mt-1">
              {loadingProgress}%
            </span>
          </div>
        </div>
        
        {/* 進度條 */}
        <div className="w-full max-w-md mb-4">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* 動畫光澤效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        {/* 狀態訊息 */}
        <p className="text-gray-700 font-medium text-center mb-2">
          {loadingStatus || '正在載入 PDF...'}
        </p>
        
        {/* 提示訊息 */}
        {loadingProgress < 30 && (
          <p className="text-gray-400 text-sm text-center">
            首次載入可能需要一些時間
          </p>
        )}
        
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 flex flex-col' : 'rounded-lg overflow-hidden shadow-lg relative'}`}
    >
      {/* 控制列 */}
      <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg">
        {/* 左側:翻頁控制 */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={goToPrevPage}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 0}
            title="上一頁"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          {/* 頁碼顯示/輸入 */}
          {!showPageInput ? (
            <button
              onClick={() => {
                setShowPageInput(true);
                setPageInput((currentPage + 1).toString());
              }}
              className="text-sm font-medium min-w-[60px] md:min-w-[80px] text-center bg-white/10 hover:bg-white/20 rounded px-2 py-1 transition-colors cursor-pointer"
              title="點擊輸入頁碼"
            >
              {currentPage + 1} / {totalPages}
            </button>
          ) : (
            <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1">
              <input
                type="text"
                value={pageInput}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
                autoFocus
                className="w-12 md:w-14 text-sm font-medium text-center bg-white text-gray-900 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`1-${totalPages}`}
              />
              <span className="text-sm font-medium">/ {totalPages}</span>
            </form>
          )}
          
          <button
            onClick={goToNextPage}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage >= totalPages - 1}
            title="下一頁"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* 右側：縮放控制 + 全螢幕 (桌機版) */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="縮小"
          >
            <FontAwesomeIcon icon={faSearchMinus} />
          </button>
          <span className="text-xs font-medium min-w-[40px] text-center hidden md:inline">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="放大"
          >
            <FontAwesomeIcon icon={faSearchPlus} />
          </button>
          {scale !== 1 && (
            <button
              onClick={handleResetZoom}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="重置"
            >
              <FontAwesomeIcon icon={faUndo} />
            </button>
          )}
          {/* 全螢幕 */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors ml-1"
            title={isFullscreen ? '退出全螢幕' : '全螢幕'}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>

      {/* PDF 頁面顯示區 */}
      <div className={`bg-gray-800 ${isFullscreen ? 'flex-1' : 'min-h-[500px] md:min-h-[700px]'} flex items-center justify-center overflow-hidden`}>
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          onTransformed={(ref) => {
            setScale(ref.state.scale);
          }}
          doubleClick={{
            mode: "reset",
          }}
        >
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {pages[currentPage] && (
              <img
                src={pages[currentPage]}
                alt={`第 ${currentPage + 1} 頁`}
                className="max-w-full max-h-full object-contain shadow-2xl"
                draggable={false}
              />
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>


    </div>
  );
};

export default PdfFlipbook;
