/**
 * 行事曆測試資料
 * 
 * 這個檔案提供測試用的行事曆資料
 * 實際使用時會從 Google Sheets 讀取
 */

import { CalendarEvent } from '../src/utils/googleSheets';

/**
 * 2026 年 1 月測試資料
 */
export const MOCK_CALENDAR_EVENTS_2026_01: CalendarEvent[] = [
  {
    date: '2026-01-01',
    title: '元旦',
    type: '國定假日',
  },
  {
    date: '2026-01-04',
    title: '道一經典',
    type: '道一經典',
    description: '每週日上午 9:00-11:00',
  },
  {
    date: '2026-01-11',
    title: '道一經典',
    type: '道一經典',
    description: '每週日上午 9:00-11:00',
  },
  {
    date: '2026-01-12',
    title: '悔過班',
    type: '悔過班',
    description: '週一晚上 7:00-9:00',
  },
  {
    date: '2026-01-15',
    title: '青世代聚會',
    type: '青世代',
    description: '週四晚上 7:30-9:00',
  },
  {
    date: '2026-01-18',
    title: '道一經典',
    type: '道一經典',
    description: '每週日上午 9:00-11:00',
  },
  {
    date: '2026-01-25',
    title: '道一經典',
    type: '道一經典',
    description: '每週日上午 9:00-11:00',
  },
  {
    date: '2026-01-26',
    title: '悔過班',
    type: '悔過班',
    description: '週一晚上 7:00-9:00',
  },
  {
    date: '2026-01-28',
    title: '大掃除',
    type: '其他',
    description: '春節前大掃除',
  },
];

/**
 * 取得測試資料 (依月份)
 */
export function getMockCalendarEvents(year: number, month: number): CalendarEvent[] {
  // 目前只有 2026 年 1 月的測試資料
  if (year === 2026 && month === 1) {
    return MOCK_CALENDAR_EVENTS_2026_01;
  }
  
  return [];
}
