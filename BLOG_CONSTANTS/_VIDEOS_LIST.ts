// 影片資料集中管理 - 新增影片只需在這裡加入即可

export interface Video {
  id: string;           // YouTube 影片 ID
  title: string;        // 影片標題
  description?: string; // 影片描述 (選填)
  featured?: boolean;   // 是否為精選影片 (會顯示在首頁)
}

// YouTube 影片列表
export const VIDEOS: Video[] = [
  {
    id: "135eVc2YFtc",
    title: "牧羊人",
    description: "牧羊人",
    featured: true,
  },
  {
    id: "C4Jsi-Q66dM",
    title: "一家人(追思何前人)",
    description: "一家人(追思何前人)",
    featured: true,
  },
  {
    id: "cJtZ7SaScmY",
    title: "前人的手",
    description: "前人的手",
    featured: true,
  },
  {
    id: "R91BihX-h1A",
    title: "但願活佛師尊慈訓(壇主版)",
    description: "但願活佛師尊慈訓(壇主版)",
    featured: true,
  },
  {
    id: "kW90YSbwEU8",
    title: "我愿",
    description: "我愿",
    featured: true,
  },
  {
    id: "-GFIbU221JI",
    title: "但願&總壇開壇",
    description: "但願&總壇開壇",
    featured: true,
  },
  {
    id: "QefFeDgybhs",
    title: "善歌丨但願丨活佛師尊 慈訓丨白陽小徒兒",
    description: "活佛師尊慈訓善歌",
    featured: true,
  },
  {
    id: "uq0RaaAzLPw",
    title: "佛燈管弦樂",
    description: "佛燈管弦樂",
    featured: true,
  },
  {
    id: "jX5xsE0ZwT0",
    title: "盼望",
    description: "盼望",
    featured: true,
  },
  {
    id: "C58QZakIDOw",
    title: "重光興毅第二章節管絃樂",
    description: "重光興毅第二章節管絃樂",
    featured: true,
  },
  {
    id: "XPHEUjVAIsc",
    title: "上天賜福給咱",
    description: "上天賜福給咱",
    featured: true,
  },
  {
    id: "3YMYF8MRIrw",
    title: "敬拜老母娘-101年壬辰新春",
    description: "敬拜老母娘-101年壬辰新春",
    featured: true,
  },
  {
    id: "Xqzx0boyZNI",
    title: "佛燈",
    description: "佛燈",
    featured: true,
  },
  {
    id: "dS14sujsbNY",
    title: "佛燈-97年興毅總壇開壇",
    description: "佛燈-97年興毅總壇開壇",
    featured: true,
  },
  {
    id: "5n-KHboTMHM",
    title: "前後相隨",
    description: "前後相隨",
    featured: true,
  },
  {
    id: "cQwy0orXSIg",
    title: "東山之歌",
    description: "東山之歌",
    featured: true,
  },

  // 新增影片範例：
  // {
  //   id: "VIDEO_ID_HERE",
  //   title: "影片標題",
  //   description: "影片描述",
  //   featured: false,  // 設為 true 會顯示在首頁
  // },
];

// 取得精選影片 (首頁用)
export const getFeaturedVideos = (count?: number): Video[] => {
  const featured = VIDEOS.filter(v => v.featured);
  return count ? featured.slice(0, count) : featured;
};

// 取得 YouTube 縮圖 URL
export const getYoutubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string => {
  const qualityMap = {
    default: 'default',      // 120x90
    medium: 'mqdefault',     // 320x180
    high: 'hqdefault',       // 480x360
    maxres: 'maxresdefault', // 1280x720
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};

// 取得 YouTube 嵌入 URL
export const getYoutubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// 取得 YouTube 播放 URL
export const getYoutubeWatchUrl = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};
