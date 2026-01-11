import { PageLayout } from "../src/components";
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import CalendarView from "../src/components/CalendarView";
import { GetStaticProps } from "next";
import { fetchCalendarFromGoogleSheets, CalendarEvent } from "../src/utils/googleSheets";
import { CALENDAR_SPREADSHEET_ID } from "../BLOG_CONSTANTS/_CALENDAR_DATA";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface CalendarPageProps {
  allEvents: CalendarEvent[];
}

const CalendarPage = ({ allEvents }: CalendarPageProps) => {
  // 預設顯示當前月份
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);

  // 篩選當前月份的活動
  const currentMonthEvents = allEvents.filter(event => {
    try {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentYear && eventDate.getMonth() + 1 === currentMonth;
    } catch {
      return false;
    }
  });

  // 上一個月
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 下一個月
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 回到今天
  const goToToday = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
  };

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  return (
    <PageLayout PAGE_SEO={DEFAULT_SEO}>
      <div className="container mx-auto px-4 py-8">
        {/* 標題 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#334155] mb-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-blue-600 mr-2" />
            行事曆
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            查看協會的活動安排與重要日期
          </p>
        </div>

        {/* 月份導航 */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={goToPreviousMonth}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              title="上一個月"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
            </button>

            <div className="text-center flex-1">
              <div className="text-xl font-bold text-gray-900">
                {currentYear} 年 {monthNames[currentMonth - 1]}
              </div>
            </div>

            <button
              onClick={goToNextMonth}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              title="下一個月"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
            </button>

            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm flex-shrink-0"
            >
              今天
            </button>
          </div>
        </div>

        {/* 月曆視圖 */}
        <CalendarView 
          events={currentMonthEvents}
          year={currentYear}
          month={currentMonth}
        />

        {/* 活動統計 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-500">本月活動</div>
            <div className="text-2xl font-bold text-gray-900">{currentMonthEvents.length} 項</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-500">全年活動</div>
            <div className="text-2xl font-bold text-gray-900">{allEvents.length} 項</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <div className="text-sm text-gray-500">資料來源</div>
            <div className="text-sm font-medium text-gray-900">Google Sheets 自動同步</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<CalendarPageProps> = async () => {
  // 從 Google Sheets 讀取所有行事曆資料
  let allEvents: CalendarEvent[] = [];
  try {
    allEvents = await fetchCalendarFromGoogleSheets(CALENDAR_SPREADSHEET_ID);
    console.log(`✅ 成功讀取 ${allEvents.length} 筆行事曆資料`);
  } catch (error) {
    console.error('❌ 讀取行事曆資料失敗:', error);
  }

  // 清理 undefined 值
  const cleanedEvents = allEvents.map(event => ({
    date: event.date,
    title: event.title,
    ...(event.type && { type: event.type }),
    ...(event.description && { description: event.description }),
    ...(event.location && { location: event.location }),
    ...(event.time && { time: event.time }),
  }));

  return {
    props: {
      allEvents: cleanedEvents,
    },
  };
};

export default CalendarPage;
