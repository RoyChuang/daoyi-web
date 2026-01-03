/**
 * 佛堂照片展示頁面
 * 展示如何使用 Cloudinary 照片
 */

import { PageLayout } from "../src/components";
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import { TEMPLE_PHOTOS } from "../BLOG_CONSTANTS/_TEMPLE_PHOTOS";
import { getCloudinaryUrl, getThumbnailUrl } from "../src/utils/cloudinary";
import { useState } from "react";

// Swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TemplePhotos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <PageLayout PAGE_SEO={{
      ...DEFAULT_SEO,
      title: "佛堂照片集 - 道一關懷協會",
      description: "道一關懷協會歷年佛堂開壇珍貴照片"
    }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          佛堂照片集
        </h1>
        
        <p className="text-center text-gray-600 mb-12">
          珍貴的歷史時刻 · 共 {TEMPLE_PHOTOS.length} 張照片
        </p>

        {/* Swiper 輪播 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">精選輪播</h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="pb-12"
          >
            {TEMPLE_PHOTOS.map((photo, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="cursor-pointer group"
                  onClick={() => setSelectedPhoto(index)}
                >
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={getCloudinaryUrl(photo.publicId, {
                        width: 600,
                        height: 400,
                        crop: 'fill',
                        quality: 'auto',
                        format: 'auto',
                      })}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold text-gray-800">{photo.title}</h3>
                    {photo.date && (
                      <p className="text-sm text-gray-500">{photo.date}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 網格展示 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">所有照片</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TEMPLE_PHOTOS.map((photo, index) => (
              <div
                key={index}
                className="cursor-pointer group"
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={getThumbnailUrl(photo.publicId, 400)}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">
                    {photo.title}
                  </h3>
                  {photo.date && (
                    <p className="text-xs text-gray-500">{photo.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 燈箱效果 (點擊放大) */}
        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-6xl w-full">
              <button
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>
              <img
                src={getCloudinaryUrl(TEMPLE_PHOTOS[selectedPhoto].publicId, {
                  width: 1920,
                  quality: 'auto',
                  format: 'auto',
                })}
                alt={TEMPLE_PHOTOS[selectedPhoto].title}
                className="w-full h-auto rounded-lg"
              />
              <div className="text-white text-center mt-4">
                <h3 className="text-2xl font-bold">
                  {TEMPLE_PHOTOS[selectedPhoto].title}
                </h3>
                {TEMPLE_PHOTOS[selectedPhoto].date && (
                  <p className="text-gray-300 mt-2">
                    {TEMPLE_PHOTOS[selectedPhoto].date}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default TemplePhotos;
