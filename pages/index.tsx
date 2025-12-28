/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo } from "../src/components";
import ArticleCard from '../src/components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../BLOG_CONSTANTS/_ARTICLES_LIST';
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUserCircle, faBookOpen, faVideo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getFeaturedVideos, getYoutubeThumbnail, getYoutubeWatchUrl } from "../BLOG_CONSTANTS/_VIDEOS_LIST";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllBlogImages, BlogImage } from "../src/utils/imageUtils";
import { useState, useEffect } from "react";

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


// 書籍資料 - 未來新增書籍只需在這裡加入即可
const books = [
  {
    id: 1,
    title: "道親手冊",
    href: "/dao-qin-handbook",
  },
];

interface HomeProps {
  allImages: BlogImage[];
}

const Home = ({ allImages }: HomeProps) => {
  // 在客戶端隨機選取圖片
  const [randomImages, setRandomImages] = useState<BlogImage[]>([]);

  useEffect(() => {
    // 隨機選取 10 張圖片
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 10));
  }, [allImages]);

  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <div className='w-full pb-20 mb-10 bg-slate-200 bg-cover bg-top h-[200px]' style={{backgroundImage: 'url(/images/top1.jpg)'}}>
      </div>
      
      {/* 隨機活動照片輪播區塊 */}
      {randomImages && randomImages.length > 0 && (
        <div className="container mx-auto lg:px-[15px] px-3 -mt-28 mb-8">
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
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      className="
                        relative w-[100px] h-[140px] 
                        rounded-r-md rounded-l-sm
                        flex items-center justify-center
                        p-3 cursor-pointer
                        transition-all duration-300 ease-out
                        group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
                        bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),3px_3px_0px_#064e3b,5px_5px_10px_rgba(0,0,0,0.25)]
                        group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),4px_4px_0px_#064e3b,8px_8px_15px_rgba(0,0,0,0.3)]
                      "
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

        {/* 影音分享區塊 - 加上背景 */}
        <div className="bg-slate-50 -mx-3 lg:-mx-[15px] px-3 lg:px-[15px] py-8 mb-0">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className='text-2xl font-bold text-[#334155] flex items-center gap-3'>
                <FontAwesomeIcon icon={faVideo} className="text-[#334155]" />
                影音分享
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
                  <a 
                    href={getYoutubeWatchUrl(video.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video w-full">
                      <img 
                        src={getYoutubeThumbnail(video.id, 'medium')} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* 播放按鈕 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-sm ml-0.5" />
                      </div>
                    </div>
                  </a>
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