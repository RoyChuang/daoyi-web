/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo } from "../src/components";
import ArticleCard from '../src/components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../BLOG_CONSTANTS/_ARTICLES_LIST';
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import VideoThumbnail from "../src/components/VideoThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUserCircle, faBookOpen, faVideo, faScroll } from "@fortawesome/free-solid-svg-icons";
import { getFeaturedVideos } from "../BLOG_CONSTANTS/_VIDEOS_LIST";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllBlogImages, BlogImage } from "../src/utils/imageUtils";
import { useState, useEffect } from "react";

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


// 書籍資料型別定義
interface Book {
  id: number;
  title: string;
  href: string;
  subtitle?: string;  // 可選的副標題
  bgGradient?: string;  // 背景漸層色
  shadowColor?: string;  // 陰影顏色
}

// 書籍資料 - 未來新增書籍只需在這裡加入即可
const books: Book[] = [
  {
    id: 1,
    title: "道親手冊",
    href: "/dao-qin-handbook",
    bgGradient: "from-emerald-800 via-emerald-700 to-emerald-800",
    shadowColor: "#064e3b",
  },
  {
    id: 2,
    title: "道學心德",
    href: "/daomind",
    bgGradient: "from-red-900 via-red-800 to-red-900",
    shadowColor: "#7f1d1d",
  },
];

// 拾穗集資料
const gleanings = [
  {
    id: 'ho',
    name: '何紹棠 前人',
    title: '生平事蹟',
    image: 'daoyi-web/gleanings/ho',
    color: 'from-amber-50 to-orange-100',
    titleColor: 'text-orange-900',
  },
  {
    id: 'lin',
    name: '林月珠 壇主',
    title: '生平事蹟',
    image: 'daoyi-web/gleanings/lin',
    color: 'from-emerald-50 to-teal-100',
    titleColor: 'text-teal-900',
  },
];

interface HomeProps {
  allImages: BlogImage[];
}

const Home = ({ allImages }: HomeProps) => {
  // 在客戶端隨機選取圖片
  const [randomImages, setRandomImages] = useState<BlogImage[]>([]);
  // 影片 modal 狀態
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  useEffect(() => {
    // 隨機選取 10 張圖片
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 10));
  }, [allImages]);

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

  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <div className='w-full pb-20 mb-10 bg-slate-200 bg-cover bg-top h-[200px]' style={{backgroundImage: 'url(/images/top1.jpg)'}}>
      </div>
      
      {/* Facebook 社團小按鈕 */}
      <div className="container mx-auto lg:px-[15px] px-3 -mt-32 mb-2 flex flex-col sm:flex-row gap-3">
        <a 
          href="https://www.facebook.com/groups/1418391155044562"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-white font-medium text-sm">道一關懐協會 歡迎加入</span>
        </a>
        
        <Link href="/calendar" passHref>
          <a className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300">
            <FontAwesomeIcon icon={faCalendarDays} className="text-white flex-shrink-0" />
            <span className="text-white font-medium text-sm">查看行事曆</span>
          </a>
        </Link>
      </div>

      {/* 隨機活動照片輪播區塊 */}
      {randomImages && randomImages.length > 0 && (
        <div className="container mx-auto lg:px-[15px] px-3 mb-4">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              className="pb-8"
            >
              {randomImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link href={image.blogPath} passHref>
                    <a className="block w-full h-28 md:h-36 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <img 
                        src={image.src} 
                        alt={`活動照片 ${index + 1}`}
                        className="w-full h-full object-cover object-[50%_15%] hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <div className="container mx-auto lg:px-[15px] px-0 overflow-hidden">
        
        {/* 人物分享 + 好書閱讀 區塊 - 1:1 比例 */}
        <div className="mb-0 grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 py-6">
          
          {/* 左側：人物分享 */}
          <div>
            <h2 className='w-full mb-4 text-2xl font-bold text-[#334155] flex items-center gap-3'>
              <FontAwesomeIcon icon={faUserCircle} className="text-[#334155]" />
              人物分享
            </h2>
            <Link href="/he-qian-ren" passHref>
              <a className="block group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex">
                  <div className="w-1/2 h-40 flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/he-qian-ren/index.jpg" 
                      alt="何紹棠前人" 
                      className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-center">
                    <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded mb-1 w-fit">種籽人物志</span>
                    <h3 className="text-sm font-bold text-[#334155] group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      好學不倦，筆耕不輟 – 何紹棠前人
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">2024-12-15 | 編輯室</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>

          {/* 右側：好書閱讀 */}
          <div>
            <h2 className='w-full mb-4 text-2xl font-bold text-[#334155] flex items-center gap-3'>
              <FontAwesomeIcon icon={faBookOpen} className="text-[#334155]" />
              好書閱讀
            </h2>
            <div className="flex flex-wrap gap-6">
              {books.map((book) => (
                <Link key={book.id} href={book.href} passHref>
                  <a className="block group">
                    {/* 書本容器 */}
                    <div 
                      className={`
                        relative w-[90px] h-[120px] 
                        rounded-r-md rounded-l-sm
                        flex items-center justify-center
                        p-3 cursor-pointer
                        transition-all duration-300 ease-out
                        group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
                        bg-gradient-to-r ${book.bgGradient || 'from-emerald-800 via-emerald-700 to-emerald-800'}
                      `}
                      style={{
                        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.1), 3px 3px 0px ${book.shadowColor || '#064e3b'}, 5px 5px 10px rgba(0,0,0,0.25)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `inset 0 0 0 1px rgba(255,255,255,0.1), 4px 4px 0px ${book.shadowColor || '#064e3b'}, 8px 8px 15px rgba(0,0,0,0.3)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `inset 0 0 0 1px rgba(255,255,255,0.1), 3px 3px 0px ${book.shadowColor || '#064e3b'}, 5px 5px 10px rgba(0,0,0,0.25)`;
                      }}
                    >
                      {/* 書名 */}
                      <div 
                        className="
                          text-white text-center text-xs font-bold
                          leading-tight whitespace-pre-line
                          border-t border-b border-white/30
                          py-2 px-1
                          drop-shadow-md
                        "
                      >
                        {book.title}
                        {'subtitle' in book && (
                          <div className="text-[10px] font-normal mt-1 opacity-80">
                            ({book.subtitle})
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 拾穗集 - 生平事蹟 區塊 */}
        <div className="mb-10 px-3">
          <h2 className='w-full mb-6 text-2xl font-bold text-[#334155] flex items-center gap-3'>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faScroll} className="text-amber-700" size="sm" />
            </div>
            拾穗集
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gleanings.map((person) => (
              <a 
                key={person.id}
                href={`/gleanings-viewer?img=${person.image}&title=${encodeURIComponent(person.name + ' ' + person.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="flex aspect-[21/9] md:aspect-[4/1]">
                  {/* 圖左：文字內容 */}
                  <div className={`w-[35%] p-6 flex flex-col justify-center bg-gradient-to-br ${person.color} transition-colors duration-500`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Gleaning Collection</span>
                    <h3 className={`text-lg md:text-xl font-bold ${person.titleColor} transition-transform duration-500 group-hover:scale-105 origin-left leading-tight`}>
                      {person.name}
                    </h3>
                  </div>
                  
                  {/* 圖右：圖片預覽 */}
                  <div className="w-[65%] relative overflow-hidden">
                    <img 
                      src={`https://res.cloudinary.com/dklwgtmj2/image/upload/c_fill,g_north,h_600,w_400/f_auto,q_auto/${person.image}`}
                      alt={person.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* 裝飾線條 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
                  </div>
                </div>
                
                {/* 懸浮效果裝飾 */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 w-0 group-hover:w-full transition-all duration-500"></div>
              </a>
            ))}
          </div>
        </div>


        {/* 聖樂影音區塊 - 加上背景 */}
        <div className="bg-slate-50 -mx-3 lg:-mx-[15px] px-3 lg:px-[15px] py-8 mb-0">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className='text-2xl font-bold text-[#334155] flex items-center gap-3'>
                <FontAwesomeIcon icon={faVideo} className="text-[#334155]" />
                聖樂影音
              </h2>
              <Link href="/video" passHref>
                <a className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors group">
                  更多
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Link>
            </div>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={getFeaturedVideos().length > 5}
            >
              {getFeaturedVideos().map((video) => (
                <SwiperSlide key={video.id}>
                  <VideoThumbnail
                    videoId={video.id}
                    title={video.title}
                    onClick={() => openVideoModal(video.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* 近期活動區塊 */}
        <div className={'flex flex-wrap py-8 px-3'}>
          <h1 className='w-full mb-5 text-2xl font-bold text-[#334155] flex items-center gap-3'>
            <FontAwesomeIcon icon={faCalendarDays} className="text-[#334155]" />
            近期活動
          </h1>
          <HomeNonFeatureArticles />
        </div>

      </div>

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
    </PageLayout>
  )
}

// 在 build 時取得所有圖片列表
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allImages = getAllBlogImages();
  
  return {
    props: {
      allImages,
    },
  };
};

export default Home