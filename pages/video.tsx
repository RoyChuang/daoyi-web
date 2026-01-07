import { PageLayout } from '../src/components';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMusic, faTimes } from "@fortawesome/free-solid-svg-icons";
import { VIDEOS } from '../BLOG_CONSTANTS/_VIDEOS_LIST';
import { SHEET_MUSIC_LIST, SheetMusic } from '../BLOG_CONSTANTS/_SHEET_MUSIC';
import { getCloudinaryUrl } from '../src/utils/cloudinary';
import VideoThumbnail from '../src/components/VideoThumbnail';
import { useState, useEffect } from 'react';

const VideoPage = () => {
    const [activeTab, setActiveTab] = useState<'videos' | 'sheets'>('videos');
    const [selectedSheet, setSelectedSheet] = useState<SheetMusic | null>(null);
    // 影片 modal 狀態
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

    // 開啟影片 modal
    const openVideoModal = (videoId: string) => {
        setCurrentVideoId(videoId);
        setIsVideoModalOpen(true);
    };

    // 關閉影片 modal
    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setCurrentVideoId(null);
    };

    // ESC 鍵關閉燈箱
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedSheet(null);
                closeVideoModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // 防止背景滾動
    useEffect(() => {
        if (selectedSheet || isVideoModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedSheet, isVideoModalOpen]);

    return (
        <PageLayout home>
            <NextSeo
                title="聖樂影音 | 社團法人新北市道一關懷協會"
                description="道一關懷協會聖樂影音"
                {...DEFAULT_SEO}
            />
            <section className='container px-3 pb-10 pt-6'>
                <h1 className='text-3xl font-bold py-6 text-[#334155] flex items-center gap-3'>
                    <FontAwesomeIcon icon={faVideo} className="text-[#334155]" />
                    聖樂影音
                </h1>

                {/* Tab 切換按鈕 */}
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2 ${
                            activeTab === 'videos'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <FontAwesomeIcon icon={faVideo} />
                        影音
                    </button>
                    <button
                        onClick={() => setActiveTab('sheets')}
                        className={`px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2 ${
                            activeTab === 'sheets'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <FontAwesomeIcon icon={faMusic} />
                        樂譜
                    </button>
                </div>

                {/* 影音內容 - 改為縮圖網格 */}
                {activeTab === 'videos' && (
                    <div className='py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {VIDEOS.map((video) => (
                            <VideoThumbnail
                                key={video.id}
                                videoId={video.id}
                                title={video.title}
                                onClick={() => openVideoModal(video.id)}
                            />
                        ))}
                    </div>
                )}

                {activeTab === 'sheets' && (
                    <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {SHEET_MUSIC_LIST.map((sheet, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedSheet(sheet)}
                                className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group'
                            >
                                <div className='aspect-[3/4] w-full overflow-hidden bg-gray-100'>
                                    <img
                                        src={getCloudinaryUrl(sheet.publicId, {
                                            width: 600,
                                            quality: 'auto',
                                            format: 'auto'
                                        })}
                                        alt={sheet.title}
                                        className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 影片播放 Modal */}
            {isVideoModalOpen && currentVideoId && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeVideoModal}
                >
                    <div 
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 關閉按鈕 */}
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-2 right-2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
                            aria-label="關閉影片"
                        >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* YouTube iframe */}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                </div>
            )}

            {/* 樂譜燈箱 Modal */}
            {selectedSheet && (
                <div 
                    className='fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4'
                    onClick={() => setSelectedSheet(null)}
                >
                    {/* 頂部標題與關閉按鈕 */}
                    <div className='w-full max-w-6xl flex items-center justify-between mb-4'>
                        <h3 className='text-white text-2xl font-bold'>
                            {selectedSheet.title}
                        </h3>
                        <button
                            onClick={() => setSelectedSheet(null)}
                            className='text-white hover:text-gray-300 transition-colors'
                            aria-label='關閉'
                        >
                            <FontAwesomeIcon icon={faTimes} className='text-3xl' />
                        </button>
                    </div>

                    {/* 圖片容器 - 可滾動 */}
                    <div 
                        className='relative w-full max-w-6xl flex-1 overflow-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={getCloudinaryUrl(selectedSheet.publicId, {
                                width: 2000,
                                quality: 'auto',
                                format: 'auto'
                            })}
                            alt={selectedSheet.title}
                            className='w-full h-auto object-contain'
                        />
                    </div>
                </div>
            )}
        </PageLayout>
    );
};

export default VideoPage;
