import { useState, useEffect, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExpand, faCompress, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './PdfFlipbook.module.css';

// 設定 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfFlipbookProps {
  pdfUrl: string;
  className?: string;
}

// 單頁元件 - 用 forwardRef 讓 react-pageflip 可以控制
const Page = forwardRef<HTMLDivElement, { pageImage: string; pageNumber: number }>(
  ({ pageImage, pageNumber }, ref) => {
    return (
      <div ref={ref} className={`${styles.pdfPage} bg-white shadow-lg`}>
        <img 
          src={pageImage} 
          alt={`第 ${pageNumber} 頁`}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-2 left-0 right-0 text-center text-gray-400 text-sm">
          {pageNumber}
        </div>
      </div>
    );
  }
);
Page.displayName = 'Page';

const PdfFlipbook = ({ pdfUrl, className = '' }: PdfFlipbookProps) => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 偵測手機
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 載入 PDF 並轉換成圖片
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const numPages = pdf.numPages;
        setTotalPages(numPages);

        const pageImages: string[] = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 2; // 高解析度
          const viewport = page.getViewport({ scale });

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
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
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

  // 頁面變更事件
  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

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
      className={`${styles.pdfFlipbookContainer} ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 flex flex-col' : ''}`}
    >
      {/* 控制列 */}
      <div className={`flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg`}>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            disabled={currentPage === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-sm min-w-[80px] text-center">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            disabled={currentPage >= totalPages - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-300 hidden sm:inline">
            {isMobile ? '👆 滑動翻頁' : '👆 點擊邊緣或滑動翻頁'}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title={isFullscreen ? '退出全螢幕' : '全螢幕'}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>

      {/* 翻書區域 */}
      <div className={`flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 ${isFullscreen ? 'flex-1' : 'py-4 md:py-8'} overflow-hidden rounded-b-lg`}>
        <HTMLFlipBook
          ref={bookRef}
          width={isMobile ? 300 : 400}
          height={isMobile ? 420 : 560}
          size="stretch"
          minWidth={280}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="shadow-2xl"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
        >
          {pages.map((pageImage, index) => (
            <Page key={index} pageImage={pageImage} pageNumber={index + 1} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* 手機提示 */}
      {isMobile && (
        <div className="text-center py-2 text-sm text-gray-500 bg-gray-50 rounded-b-lg">
          ← 向左滑動翻下一頁 | 向右滑動翻上一頁 →
        </div>
      )}
    </div>
  );
};

export default PdfFlipbook;

