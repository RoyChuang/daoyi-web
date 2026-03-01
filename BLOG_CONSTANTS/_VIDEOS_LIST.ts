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
    id: "LmekUzeZQTo",
    title: "何紹棠前人成道十五週年（生平簡介）",
    description: "何紹棠前人成道十五週年（生平簡介）",
    featured: true,
  },
  {
    id: "WjpnezefGJI",
    title: "泰國道親與何前人的回憶",
    description: "泰國道親與何前人的回憶",
    featured: true,
  },
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
    id: "VX2cAMm4hNg",
    title: "前人的手(道一公共佛堂)",
    description: "前人的手(道一公共佛堂)",
    featured: true,
  },
  {
    id: "RzTmZESMNx8",
    title: "但願活佛師尊慈訓(壇主版)",
    description: "但願活佛師尊慈訓(壇主版)",
    featured: true,
  },
  {
    id: "kW90YSbwEU8",
    title: "我愿（何前人)",
    description: "我愿（何前人)",
    featured: true,
  },
  {
    id: "Iz9mLKLF-uw",
    title: "佛燈（泰國壇主)",
    description: "佛燈（泰國壇主)",
    featured: true,
  },
  {
    id: "K_C9ca-MnWg",
    title: "盼望（新加坡壇主與佛堂)",
    description: "盼望（新加坡壇主與佛堂)",
    featured: true,
  },
  {
    id: "hR2SpgW7UEA",
    title: "敬拜老母娘(馬來西亞壇主與佛堂)",
    description: "敬拜老母娘(馬來西亞壇主與佛堂)",
    featured: true,
  },
  {
    id: "EH5y4H4qZYs",
    title: "東山之歌(忠信傳習步天梯)",
    description: "東山之歌(忠信傳習步天梯)",
    featured: true,
  },
  {
    id: "Qy2AcBxV8Eg",
    title: "前後相隨(探訪何前人足跡)",
    description: "前後相隨(探訪何前人足跡)",
    featured: true,
  },
  {
    id: "RO8OA8zV6L8",
    title: "我愿(合唱團版)",
    description: "我愿(合唱團版)",
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
    id: "66a5qz76U1o",
    title: "佛燈(合唱團版)",
    description: "佛燈(合唱團版)",
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
  {
    id: "mbt-wibGjnA",
    title: "太極無上混元真經 上 何前人慈悲釋解",
    description: "太極無上混元真經 上 何前人慈悲釋解",
    featured: true,
  },
  {
    id: "JKU0oUguKVg",
    title: "太極無上混元真經 下 何前人慈悲釋解",
    description: "太極無上混元真經 下 何前人慈悲釋解",
    featured: true,
  },
  {
    id: "lxwEekKnapY",
    title: "同心同德整體成就 何前人慈悲勉勵 上",
    description: "同心同德整體成就 何前人慈悲勉勵 上",
    featured: true,
  },
  {
    id: "DMqDAijSJZM",
    title: "同心同德整體成就 何前人慈悲勉勵 下",
    description: "同心同德整體成就 何前人慈悲勉勵 下",
    featured: true,
  },
  {
    id: "WnQrRzPH2iM",
    title: "感恩道親誠心設壇了愿修行",
    description: "感恩道親誠心設壇了愿修行",
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
