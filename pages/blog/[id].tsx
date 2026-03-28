/**These are necessary imports / components for the page */
import _ from 'lodash';
import fs from "fs";
import path from "path";
import { useState } from 'react';

import { ImageSize } from "../../src/shared/enums";
import { PageLayout, Text, Image, } from "../../src/components";
import { getArticleDetailById } from '../../src/utils/utils';
import { ARTICLES_LIST } from '../../BLOG_CONSTANTS/_ARTICLES_LIST';
import { getCloudinaryUrl } from '../../src/utils/cloudinary';
import ImageLightbox from '../../src/components/ImageLightbox';

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // 分離首圖和其他圖片（用於下方相簿區塊）
  const galleryImages = images.length > 1 ? images.slice(1) : [];
  
  // 直接使用完整內容
  const mainContent = details.shortIntro || '';

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
            {/* 固定高度容器，支援直立 & 橫向圖 */}
            <div
              className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-slate-900 cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {/* 底層：模糊放大背景，填滿空白區域 */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-[18px] brightness-50 pointer-events-none select-none"
              />
              {/* 上層：主圖完整顯示，不裁切 */}
              <img
                src={image}
                alt={`${details.articleTitle} - ${index + 1}`}
                className="absolute inset-0 m-auto w-full h-full object-contain"
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
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-6 mb-8">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">活動紀要</p>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {mainContent}
          </p>
        </div>

      </div>

      {/* 圖片相簿區塊 */}
      {galleryImages.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">活動照片</h3>
          <div className={`grid gap-3 ${
            galleryImages.length === 1 ? 'grid-cols-1' :
            galleryImages.length === 2 ? 'grid-cols-2' :
            'grid-cols-2 md:grid-cols-3'
          }`}>
            {galleryImages.map((image: string, index: number) => (
              <div 
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setLightboxIndex(index + 1)}
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

      {/* 共用 ImageLightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
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
  if (ARTICLE_DETAILS?.images && ARTICLE_DETAILS.images.length > 0) {
    // 如果文章有自定義圖片列表 (Cloudinary)，直接使用
    images = ARTICLE_DETAILS.images.map(id => getCloudinaryUrl(id));
  } else {
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
  }

  // 處理 thumbnail 路徑
  if (ARTICLE_DETAILS?.preview.thumbnail && !ARTICLE_DETAILS.preview.thumbnail.startsWith('/') && !ARTICLE_DETAILS.preview.thumbnail.startsWith('http')) {
      const p = ARTICLE_DETAILS.preview;
      const updatedPreview = {
          ...p,
          thumbnail: getCloudinaryUrl(p.thumbnail)
      };
      detail = JSON.stringify(updatedPreview);
  }

  return {
    props: {
      detail,
      images,
    },
  };
}
