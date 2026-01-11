import { CalendarEvent } from '../utils/googleSheets';
import { getEventTypeColor } from '../../BLOG_CONSTANTS/_CALENDAR_DATA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

interface MonthlyCalendarProps {
  events: CalendarEvent[];
  year: number;
  month: number;
}

/**
 * 本月行事曆組件
 * 
 * 顯示指定月份的活動列表
 */
const MonthlyCalendar = ({ events, year, month }: MonthlyCalendarProps) => {
  // 月份名稱
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  // 格式化日期顯示
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const weekday = weekdays[date.getDay()];
      return {
        day,
        weekday,
        fullDate: date,
      };
    } catch {
      return null;
    }
  };

  // 按日期排序活動
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // 如果沒有活動
  if (sortedEvents.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl text-blue-600" />
          <h2 className="text-2xl font-bold text-[#334155]">
            本月行事曆
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>本月暫無活動</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      {/* 標題 */}
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faCalendarCheck} className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-[#334155]">
          本月行事曆
        </h2>
        <span className="ml-auto text-sm text-gray-500 font-medium">
          {year} 年 {monthNames[month - 1]}
        </span>
      </div>

      {/* 活動列表 */}
      <div className="space-y-3">
        {sortedEvents.map((event, index) => {
          const dateInfo = formatDate(event.date);
          if (!dateInfo) return null;

          const colors = getEventTypeColor(event.type);

          return (
            <div
              key={index}
              className={`
                ${colors.bg} 
                rounded-lg p-4 
                border-l-4 ${colors.badge.replace('bg-', 'border-')}
                hover:shadow-md transition-shadow duration-200
              `}
            >
              <div className="flex items-start gap-4">
                {/* 日期顯示 */}
                <div className="flex-shrink-0 text-center">
                  <div className={`
                    ${colors.text} 
                    text-3xl font-bold leading-none
                  `}>
                    {dateInfo.day}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    週{dateInfo.weekday}
                  </div>
                </div>

                {/* 活動資訊 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className={`${colors.text} font-bold text-base leading-tight`}>
                      {event.title}
                    </h3>
                    {event.type && (
                      <span className={`
                        ${colors.badge} 
                        text-white text-xs px-2 py-0.5 rounded-full 
                        whitespace-nowrap flex-shrink-0
                      `}>
                        {event.type}
                      </span>
                    )}
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部提示 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          共 {sortedEvents.length} 項活動
        </p>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
