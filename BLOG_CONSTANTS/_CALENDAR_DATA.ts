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
export const EVENT_TYPE_COLORS: Record<string, { bg: string; text: string; badge: string; color: string }> = {
  '守壇': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    badge: 'bg-purple-500',
    color: '#9333ea', // purple-600
  },
  '拜年': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-500',
    color: '#dc2626', // red-600
  },
  '傳統節日': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-500',
    color: '#dc2626', // red-600
  },
  '悔過班': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    badge: 'bg-indigo-500',
    color: '#4f46e5', // indigo-600
  },
  '道一經典': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-500',
    color: '#2563eb', // blue-600
  },
  // 不同班會的專屬顏色
  '古坑': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-500',
    color: '#2563eb', // 藍色
  },
  '玄懋': {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    badge: 'bg-orange-500',
    color: '#ea580c', // 橘色
  },
  '道一': {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    badge: 'bg-yellow-500',
    color: '#ca8a04', // 黃色
  },
  '青世代': {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    badge: 'bg-slate-500',
    color: '#64748b', // 灰色
  },
  '總壇輪值': {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    badge: 'bg-violet-500',
    color: '#7c3aed', // 紫羅蘭色
  },
  '國定假日': {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    badge: 'bg-pink-500',
    color: '#db2777', // pink-600
  },
  '班會': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-500',
    color: '#16a34a', // green-600
  },
  '其他': {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-500',
    color: '#6b7280', // gray-500
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
