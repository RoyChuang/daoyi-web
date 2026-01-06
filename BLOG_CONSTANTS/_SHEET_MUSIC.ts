/**
 * 樂譜資料列表
 * 這些樂譜照片存放在 Cloudinary
 */

export interface SheetMusic {
  publicId: string;
  title: string;
  description?: string;
}

export const SHEET_MUSIC_LIST: SheetMusic[] = [
  {
    publicId: 'daoyi-web/sheet-music/01-fo-deng',
    title: '佛燈'
  },
  {
    publicId: 'daoyi-web/sheet-music/02-qian-hou-xiang-sui',
    title: '前後相隨'
  },
  {
    publicId: 'daoyi-web/sheet-music/03-wo-yuan',
    title: '我愿'
  },
  {
    publicId: 'daoyi-web/sheet-music/04-jing-bai-lao-mu-niang',
    title: '敬拜老母娘'
  },
  {
    publicId: 'daoyi-web/sheet-music/05-dong-shan-zhi-ge',
    title: '東山之歌'
  },
  {
    publicId: 'daoyi-web/sheet-music/06-huan-ying-guang-lin',
    title: '歡迎光臨'
  },
  {
    publicId: 'daoyi-web/sheet-music/07-pan-wang',
    title: '盼望'
  },
  {
    publicId: 'daoyi-web/sheet-music/08-guan-yin-da-shi-ge',
    title: '觀音大士歌'
  },
  {
    publicId: 'daoyi-web/sheet-music/09-song-zan-mu-niang',
    title: '頌讚母娘'
  }
];

/**
 * 取得所有樂譜的 public IDs
 */
export function getSheetMusicIds(): string[] {
  return SHEET_MUSIC_LIST.map(sheet => sheet.publicId);
}

/**
 * 取得樂譜總數
 */
export function getSheetMusicCount(): number {
  return SHEET_MUSIC_LIST.length;
}
