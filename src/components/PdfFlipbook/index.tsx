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
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  // 載入 PDF 並轉換成圖片（使用 IndexedDB 快取）
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        // 嘗試從 IndexedDB 讀取快取
        const cached = await getCachedPDF(pdfUrl);
        
        if (cached) {
          console.log('✅ 從快取載入 PDF');
          setPages(cached.pages);
          setTotalPages(cached.totalPages);
          setLoading(false);
          return;
        }

        console.log('📥 下載並轉換 PDF...');
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const numPages = pdf.numPages;
        setTotalPages(numPages);

        const pageImages: string[] = [];

        for (let i = 1; i <= numPages; i++) {
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
        }

        setPages(pageImages);
        
        // 儲存到 IndexedDB
        await cachePDF(pdfUrl, pageImages, numPages);
        console.log('💾 PDF 已快取到 IndexedDB');
        
        setLoading(false);
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
      <div className="flex flex-col items-center justify-center py-20">
        <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">正在載入 PDF...</p>
        <p className="text-gray-400 text-sm mt-2">首次載入可能需要一些時間</p>
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
      className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 flex flex-col' : 'rounded-lg overflow-hidden shadow-lg'}`}
    >
      {/* 控制列 */}
      <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white">
        {/* 左側：翻頁控制 */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={goToPrevPage}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 0}
            title="上一頁"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-sm font-medium min-w-[60px] md:min-w-[80px] text-center">
            {currentPage + 1} / {totalPages}
          </span>
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
