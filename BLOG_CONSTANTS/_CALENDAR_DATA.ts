/**
 * 行事曆資料常數
 * 
 * 這個檔案定義了 Google Sheets 的連結資訊
 */

// Google Sheets ID (從網址中提取)
// 完整網址: https://docs.google.com/spreadsheets/d/1n6Dc0nq-4A7RZjdgG5_nzsYMK9KevNhht6w-5_zz2pU/edit
export const CALENDAR_SPREADSHEET_ID = '1n6Dc0nq-4A7RZjdgG5_nzsYMK9KevNhht6w-5_zz2pU';

// 工作表名稱
export const CALENDAR_SHEET_NAME = '行事曆';

// 工作表 GID (新格式)
export const CALENDAR_SHEET_GID = '1575785136';

/**
 * 活動類型與顏色對應
 * 根據試算表中的活動類型定義
 */
export const EVENT_TYPE_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  '守壇': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    badge: 'bg-purple-500',
  },
  '拜年': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-500',
  },
  '傳統節日': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-500',
  },
  '悔過班': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    badge: 'bg-indigo-500',
  },
  '道一經典': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-500',
  },
  '青世代': {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    badge: 'bg-cyan-500',
  },
  '國定假日': {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    badge: 'bg-pink-500',
  },
  '班會': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-500',
  },
  '其他': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-500',
  },
};


/**
 * 取得活動類型的顏色
 */
export function getEventTypeColor(type?: string) {
  if (!type) return EVENT_TYPE_COLORS['其他'];
  
  // 嘗試精確匹配
  if (EVENT_TYPE_COLORS[type]) {
    return EVENT_TYPE_COLORS[type];
  }
  
  // 嘗試部分匹配
  for (const key in EVENT_TYPE_COLORS) {
    if (type.includes(key) || key.includes(type)) {
      return EVENT_TYPE_COLORS[key];
    }
  }
  
  return EVENT_TYPE_COLORS['其他'];
}
