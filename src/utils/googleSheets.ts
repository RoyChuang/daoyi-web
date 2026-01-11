/**
 * Google Sheets 資料讀取工具
 * 
 * 使用 Google Sheets 公開 CSV API 讀取試算表資料
 * 不需要 API Key,只需將試算表設為「知道連結的人可以檢視」
 */

export interface CalendarEvent {
  date: string;        // 格式: YYYY-MM-DD
  title: string;       // 活動名稱
  type?: string;       // 活動類型 (用於分類和顏色標記)
  description?: string; // 活動描述
  location?: string;   // 地點
  time?: string;       // 時間
}

/**
 * 從 Google Sheets 讀取行事曆資料 (使用 CSV 格式)
 * 
 * @param spreadsheetId - Google Sheets ID
 * @param gid - 工作表 GID (從網址中取得)
 * @returns 行事曆事件陣列
 */
export async function fetchCalendarFromGoogleSheets(
  spreadsheetId: string,
  gid: string = '78728578' // 行事曆分頁的 GID
): Promise<CalendarEvent[]> {
  try {
    // 使用 Google Sheets CSV Export API
    // 格式: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={GID}
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheets data: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // 解析 CSV 資料
    const events = parseCalendarCSV(csvText);
    
    return events;
  } catch (error) {
    console.error('Error fetching calendar from Google Sheets:', error);
    return [];
  }
}

/**
 * 解析行事曆 CSV 資料
 * 
 * 根據試算表的實際結構解析:
 * 第一列: 國曆 (標題)
 * 第二列: 日期 (2/16, 2/17, ...)
 * 第三列: 星期 (一, 二, 三, ...)
 * 第四列: 農曆 (除夕, 初一, ...)
 * 第五列: 工作 (守壇, 拜年, ...)
 * 第六列: 地點
 * 第七列: 時間
 */
/**
 * 解析行事曆 CSV 資料
 */
function parseCalendarCSV(csvText: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  
  try {
    // 先將整個 CSV 解析成二維陣列
    const rows = parseCSV(csvText);
    
    console.log('📊 CSV 總行數:', rows.length);
    console.log('📊 前 10 行:', rows.slice(0, 10).map((row, i) => `第 ${i} 行: ${row.slice(0, 5).join(' | ')}`));
    
    // 找到「國曆」開頭的行
    let dateRowIndex = -1;
    for (let i = 0; i < Math.min(rows.length, 20); i++) {
      const firstCell = rows[i][0]?.trim() || '';
      if (firstCell.includes('國曆') || firstCell.includes('国历') || firstCell === '國曆') {
        dateRowIndex = i;
        console.log('✅ 找到「國曆」標題行,索引:', dateRowIndex);
        break;
      }
    }
    
    if (dateRowIndex === -1) {
      console.warn('❌ 找不到「國曆」標題行');
      return events;
    }
    
    // 讀取各行
    // 「國曆」這一行本身就包含日期資料!
    // 索引 0: 國曆, 2/16, 2/17, 2/18, ... (第一欄是標題,後面是日期)
    // 索引 1: 星期, 一, 二, 三, ...
    // 索引 2: 農曆, 除夕, 初一, 初二, ...
    // 索引 3: 工作, 辭歲迎歲, 守壇, 守壇, ...
    // 索引 4: 地點, , 道一中心, 道一中心, ...
    // 索引 5: 時間, , 早上八點, 晚上六點, ...
    
    const dateRow = rows[dateRowIndex] || [];          // 國曆 (包含日期)
    const weekdayRow = rows[dateRowIndex + 1] || [];   // 星期
    const lunarRow = rows[dateRowIndex + 2] || [];     // 農曆
    const workRow = rows[dateRowIndex + 3] || [];      // 工作
    const locationRow = rows[dateRowIndex + 4] || [];  // 地點
    const timeRow = rows[dateRowIndex + 5] || [];      // 時間
    
    console.log('📅 日期行:', dateRow.slice(0, 10));
    console.log('📅 農曆行:', lunarRow.slice(0, 10));
    console.log('📅 工作行:', workRow.slice(0, 10));
    
    // 從第二欄開始處理 (第一欄是標題)
    for (let col = 1; col < dateRow.length; col++) {
      const dateStr = dateRow[col]?.trim();
      if (!dateStr) continue;
      
      // 解析日期 (格式: "2/16")
      const dateParts = dateStr.split('/');
      if (dateParts.length !== 2) continue;
      
      const month = parseInt(dateParts[0]);
      const day = parseInt(dateParts[1]);
      if (!month || !day || isNaN(month) || isNaN(day)) continue;
      
      // 取得各項資訊
      const lunar = lunarRow[col]?.trim() || '';
      const work = workRow[col]?.trim() || '';
      const location = locationRow[col]?.trim() || '';
      const time = timeRow[col]?.trim() || '';
      
      // 如果有農曆或工作內容,就建立事件
      if (lunar || work) {
        const year = 2026;
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        let title = '';
        let type = '其他';
        let description = '';
        
        if (work) {
          title = work;
          if (work.includes('守壇')) type = '守壇';
          else if (work.includes('拜年')) type = '拜年';
          else if (work.includes('醉歲') || work.includes('迎歲')) type = '傳統節日';
          else if (work.includes('班會')) type = '班會';
          
          if (lunar) description = `農曆: ${lunar}`;
        } else if (lunar) {
          title = lunar;
          if (lunar.includes('除夕') || lunar.includes('初一') || lunar.includes('初二') || 
              lunar.includes('初三') || lunar.includes('初四')) {
            type = '傳統節日';
          }
        }
        
        if (!title) continue;
        
        const details = [];
        if (time) details.push(`時間: ${time}`);
        if (location) details.push(`地點: ${location}`);
        if (details.length > 0) {
          description = description ? `${description}\n${details.join(' | ')}` : details.join(' | ');
        }
        
        events.push({
          date: isoDate,
          title,
          type,
          description: description || undefined,
          location: location || undefined,
          time: time || undefined,
        });
      }
    }
    
    console.log(`📅 解析到 ${events.length} 個活動`);
    
  } catch (error) {
    console.error('❌ Error parsing calendar CSV:', error);
  }
  
  return events;
}

/**
 * 解析 CSV 文本為二維陣列
 * 正確處理引號、跨行和逗號
 */
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // 雙引號轉義
        currentCell += '"';
        i++;
      } else {
        // 切換引號狀態
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // 欄位結束
      currentRow.push(currentCell);
      currentCell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // 行結束
      if (char === '\r' && nextChar === '\n') {
        i++; // 跳過 \r\n 中的 \n
      }
      currentRow.push(currentCell);
      if (currentRow.some(cell => cell.trim())) {
        // 只加入非空行
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  
  // 加入最後一行
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    if (currentRow.some(cell => cell.trim())) {
      rows.push(currentRow);
    }
  }
  
  return rows;
}

/**
 * CSV 行解析器 - 正確處理引號和跨行
 * 
 * 注意: Google Sheets 的 CSV 可能包含跨行的引號欄位
 * 例如: "辭歲\n迎歲" 會被當成一個欄位
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      // 處理雙引號轉義 ("")
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // 跳過下一個引號
      } else {
        // 切換引號狀態
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // 在引號外遇到逗號,表示欄位結束
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // 加入最後一個欄位
  result.push(current);
  
  return result;
}

/**
 * 取得指定月份的活動
 * 
 * @param events - 所有活動
 * @param year - 年份
 * @param month - 月份 (1-12)
 * @returns 該月份的活動
 */
export function getEventsForMonth(
  events: CalendarEvent[],
  year: number,
  month: number
): CalendarEvent[] {
  return events.filter(event => {
    try {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month;
    } catch {
      return false;
    }
  });
}

/**
 * 取得當前月份的活動
 * 
 * @param events - 所有活動
 * @returns 當前月份的活動
 */
export function getCurrentMonthEvents(events: CalendarEvent[]): CalendarEvent[] {
  const now = new Date();
  return getEventsForMonth(events, now.getFullYear(), now.getMonth() + 1);
}
