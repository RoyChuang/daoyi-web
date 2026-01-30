import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faUndo, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';

const GleaningsViewer = () => {
  const router = useRouter();
  const { img, title } = router.query;
  const [loading, setLoading] = useState(true);

  // Cloudinary Base URL
  const CLOUDINARY_BASE = 'https://res.cloudinary.com/dklwgtmj2/image/upload/f_auto,q_auto';
  const imageUrl = img ? `${CLOUDINARY_BASE}/${img}` : '';
  const pageTitle = title ? `${title} - 拾穗集 | 道一關懷協會` : '拾穗集 - 生平事蹟 | 道一關懷協會';

  useEffect(() => {
    if (img) {
      setLoading(true);
    }
  }, [img]);

  if (!img) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      {/* 頂部控制列 */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md px-4 py-3 flex items-center justify-between text-white border-b border-white/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.close()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            title="關閉視窗"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <h1 className="text-lg font-medium truncate max-w-[200px] md:max-w-md">
            {title || '拾穗集'}
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href={imageUrl} 
            download={`${title || 'gleaning'}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            <FontAwesomeIcon icon={faDownload} />
            下載原圖
          </a>
        </div>
      </div>

      {/* 載入狀態 */}
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-200/60 text-sm font-medium animate-pulse">精采事蹟載入中...</p>
          </div>
        </div>
      )}

      {/* 圖片檢視區域 */}
      <div className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden">
        <TransformWrapper
          initialScale={0.8}
          minScale={0.1}
          maxScale={4}
          centerOnInit={false}
          centerZoomedOut={true}
          limitToBounds={false}
          wheel={{ step: 0.1 }}
          doubleClick={{ mode: 'reset' }}
          alignmentAnimation={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* 右下角縮放控制按鈕 */}
              <div className="fixed bottom-10 right-6 md:right-10 z-50 flex flex-col gap-3">
                <button 
                  onClick={() => zoomIn()}
                  className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 text-white rounded-full flex items-center justify-center shadow-2xl transition-all"
                  title="放大"
                >
                  <FontAwesomeIcon icon={faSearchPlus} />
                </button>
                <button 
                  onClick={() => zoomOut()}
                  className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 text-white rounded-full flex items-center justify-center shadow-2xl transition-all"
                  title="縮小"
                >
                  <FontAwesomeIcon icon={faSearchMinus} />
                </button>
                <button 
                  onClick={() => resetTransform()}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all"
                  title="重置比例"
                >
                  <FontAwesomeIcon icon={faUndo} />
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{
                  width: '100vw',
                  height: 'calc(100vh - 64px)',
                  marginTop: '64px',
                }}
                contentStyle={{
                  width: '100%',
                  minHeight: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start', // 從頂部開始
                  padding: '40px 0',
                }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={imageUrl}
                    alt={title as string}
                    onLoad={() => setLoading(false)}
                    className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] rounded-sm"
                    style={{
                      maxWidth: '90vw',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                  {/* 底部留白，方便閱讀到底部 */}
                  <div className="h-20 w-full"></div>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* 移動端提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 md:hidden pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <p className="text-white/60 text-xs">雙指縮放或單指移動</p>
        </div>
      </div>
    </div>
  );
};

export default GleaningsViewer;
