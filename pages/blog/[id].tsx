/**These are necessary imports / components for the page */
import _ from 'lodash';
import fs from "fs";
import path from "path";
import { useState } from 'react';

import { ImageSize } from "../../src/shared/enums";
import { PageLayout, Text, Image, } from "../../src/components";
import { getArticleDetailById } from '../../src/utils/utils';
import { ARTICLES_LIST } from '../../BLOG_CONSTANTS/_ARTICLES_LIST';

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 解析內容，分離課程摘要和感謝名單
function parseContent(shortIntro: string) {
  // 嘗試分離感謝名單
  const thanksPatterns = [
    /感謝[\s\S]*?(?:慈悲|午餐|班會)[。．\.\s]*$/,
    /感謝.*$/
  ];
  
  let mainContent = shortIntro;
  let thanksSection = '';
  
  // 尋找最後一個「感謝」開頭的句子作為感謝區塊
  const thanksMatch = shortIntro.match(/(?:感謝[^感謝]*){1,}$/);
  if (thanksMatch) {
    const thanksStart = shortIntro.lastIndexOf(thanksMatch[0]);
    if (thanksStart > shortIntro.length * 0.5) { // 確保感謝區在內容後半部
      mainContent = shortIntro.substring(0, thanksStart).trim();
      thanksSection = thanksMatch[0].trim();
    }
  }
  
  return { mainContent, thanksSection };
}

// 格式化內容，增加段落分隔
function formatContent(content: string) {
  // 在常見的分段點加入換行
  return content
    .replace(/([。！？])\s*(?=[\u4e00-\u9fa5])/g, '$1\n\n')
    .replace(/([。！？])(?=[「『])/g, '$1\n\n')
    .replace(/內容[：:]/g, '\n\n**📖 課程內容：**\n\n')
    .replace(/前言[：:]/g, '\n\n**📝 前言：**\n\n');
}

function Activities(props: { detail: any; images: any }) {
  const details = JSON.parse(props.detail);
  const images = props.images as string[];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // 分離首圖和其他圖片（用於下方相簿區塊）
  const galleryImages = images.length > 1 ? images.slice(1) : [];
  
  // 解析內容
  const { mainContent, thanksSection } = parseContent(details.shortIntro || '');

  // Hero 首圖區塊 - 使用 Swiper 輪播所有照片
  const heroSlot = images.length > 0 ? (
    <div className="relative w-full blog-hero-swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ 
          clickable: true,
          type: 'fraction'  // 顯示 1/7 格式
        }}
        loop={images.length > 1}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img 
                src={image} 
                alt={`${details.articleTitle} - ${index + 1}`}
                className="w-full h-[300px] md:h-[450px] object-cover object-top cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : undefined;

  return (
    <PageLayout blogcentered heroSlot={heroSlot}>
      {/* 內容區塊 */}
      <div className="prose prose-lg max-w-none">
        {/* 主要內容 - 使用引言風格 */}
        <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 mb-8 border-l-4 border-blue-500 shadow-sm">
          <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            📋 活動紀要
          </div>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-2 whitespace-pre-line">
            {mainContent}
          </p>
        </div>

        {/* 感謝名單區塊 */}
        {thanksSection && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 mb-8 border border-amber-200">
            <h3 className="flex items-center gap-2 text-amber-800 font-bold text-lg mb-3 mt-0">
              🙏 感謝名單
            </h3>
            <p className="text-amber-900/80 text-sm md:text-base leading-relaxed m-0">
              {thanksSection}
            </p>
          </div>
        )}
      </div>

      {/* 圖片相簿區塊 */}
      {galleryImages.length > 0 && (
        <div className="mt-10">
          <h3 className="flex items-center gap-2 text-gray-800 font-bold text-xl mb-4">
            📸 活動照片
          </h3>
          <div className={`grid gap-3 ${
            galleryImages.length === 1 ? 'grid-cols-1' :
            galleryImages.length === 2 ? 'grid-cols-2' :
            'grid-cols-2 md:grid-cols-3'
          }`}>
            {galleryImages.map((image: string, index: number) => (
              <div 
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`活動照片 ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox 圖片檢視器 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <img 
            src={selectedImage} 
            alt="放大檢視"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageLayout>
  );
}

export default Activities;

// 靜態路徑生成
export async function getStaticPaths() {
  // 從文章列表取得所有 ID
  const paths = ARTICLES_LIST.map((article) => ({
    params: { id: article.id || article.path?.split('/').pop() || '' },
  }));

  return {
    paths,
    fallback: false, // 不在列表中的路徑返回 404
  };
}

// 靜態頁面生成
export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const ARTICLE_DETAILS = getArticleDetailById(id);   
  let detail = JSON.stringify(ARTICLE_DETAILS?.preview || {});

  let images: string[] = [];
  try {
    const imagesDirectory = path.join(process.cwd(), `public/images/blog/${id}`);
    const filenames = fs.readdirSync(imagesDirectory);
    // 排序圖片（確保順序一致）
    images = filenames
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(name => `/images/blog/${id}/${name}`);
  } catch (error) {
    // 如果圖片目錄不存在，使用空陣列
    images = [];
  }

  return {
    props: {
      detail,
      images,
    },
  };
}
