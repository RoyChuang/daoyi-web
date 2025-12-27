---
description: 首頁設計與資料管理最佳實踐
---

# 首頁設計與資料管理最佳實踐

## 首頁區塊結構

目前首頁的區塊順序：

1. **頂部大圖** - `h-[200px]` 背景圖
2. **隨機活動照片輪播** - Swiper + 玻璃效果，從 blog 圖片隨機選取
3. **人物分享 + 好書閱讀** - 左右兩欄佈局
4. **影音分享** - Swiper 輪播精選 YouTube 影片
5. **近期活動** - 部落格文章列表

---

## 集中式資料管理

### 影片資料

**位置**: `BLOG_CONSTANTS/_VIDEOS_LIST.ts`

新增影片只需：

```ts
{
  id: "YouTube影片ID",
  title: "影片標題",
  featured: true,  // 設為 true 會顯示在首頁
},
```

### 書籍資料

**位置**: `pages/index.tsx` 內的 `books` 陣列

```ts
{
  id: 1,
  title: "書名",
  href: "/page-path",
  icon: faBook,
},
```

### 部落格圖片

**位置**: `public/images/blog/[日期]/` 資料夾

- 圖片會自動被 `imageUtils.ts` 讀取
- 用於首頁隨機活動照片輪播

---

## Swiper 輪播使用方式

```tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

<Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={12}
  slidesPerView={2}
  breakpoints={{
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  loop={true}
>
  {items.map((item) => (
    <SwiperSlide key={item.id}>{/* 內容 */}</SwiperSlide>
  ))}
</Swiper>;
```

---

## 玻璃效果 (Glassmorphism)

```tsx
className =
  "bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20";
```

- `bg-white/70` - 70% 透明白色背景
- `backdrop-blur-md` - 背景模糊
- `border-white/20` - 微透明邊框

---

## YouTube 工具函數

```ts
import {
  getFeaturedVideos,
  getYoutubeThumbnail,
  getYoutubeWatchUrl,
} from "../BLOG_CONSTANTS/_VIDEOS_LIST";

// 取得精選影片
getFeaturedVideos(2); // 取得前 2 個

// 取得縮圖 URL
getYoutubeThumbnail(videoId, "high"); // 'default' | 'medium' | 'high' | 'maxres'

// 取得播放 URL
getYoutubeWatchUrl(videoId);
```

---

## 注意事項

1. **靜態輸出限制** - 不能使用 `getServerSideProps`，詳見 `/nextjs-static-export`
2. **客戶端隨機化** - 使用 `useState` + `useEffect` 在瀏覽器端做隨機選取
3. **Next.js Link** - 需要用 `passHref` 並包裹 `<a>` 標籤
