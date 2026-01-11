import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../utils/googleSheets';
import { getEventTypeColor } from '../../BLOG_CONSTANTS/_CALENDAR_DATA';
import { useState } from 'react';

// 設定中文本地化
moment.locale('zh-tw', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
});

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  events: CalendarEvent[];
  year: number;
  month: number;
}

// 將 CalendarEvent 轉換為 React Big Calendar 的 Event 格式
interface BigCalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  resource: CalendarEvent;
}

const CalendarView = ({ events, year, month }: CalendarViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // 轉換事件格式
  const calendarEvents: BigCalendarEvent[] = events.map(event => {
    const date = new Date(event.date);
    return {
      title: event.title,
      start: date,
      end: date,
      resource: event,
    };
  });

  // 設定當前月份的日期範圍
  const currentDate = new Date(year, month - 1, 1);

  // 自訂事件樣式
  const eventStyleGetter = (event: BigCalendarEvent) => {
    const colors = getEventTypeColor(event.resource.type);
    return {
      style: {
        backgroundColor: colors.color,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '0.85rem',
        padding: '2px 4px',
      }
    };
  };

  // 處理事件點擊
  const handleSelectEvent = (event: BigCalendarEvent) => {
    setSelectedEvent(event.resource);
  };

  // 關閉詳情 modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  // 自訂訊息
  const messages = {
    today: '今天',
    previous: '上個月',
    next: '下個月',
    month: '月',
    week: '週',
    day: '日',
    agenda: '議程',
    date: '日期',
    time: '時間',
    event: '活動',
    noEventsInRange: '此期間沒有活動',
    showMore: (total: number) => `+${total} 更多`,
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
      <div className="calendar-container" style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView="month"
          views={['month']}
          date={currentDate}
          onNavigate={() => {}} // 禁用導航
          toolbar={false} // 隱藏工具列
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          popup
          messages={messages}
        />
      </div>

      {/* 活動詳情 Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedEvent.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {selectedEvent.type && (
                <div>
                  <span className={`
                    ${getEventTypeColor(selectedEvent.type).badge} 
                    text-white text-sm px-3 py-1 rounded-full
                  `}>
                    {selectedEvent.type}
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">日期</p>
                <p className="text-gray-900">
                  {new Date(selectedEvent.date).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </p>
              </div>

              {selectedEvent.time && (
                <div>
                  <p className="text-sm text-gray-500">時間</p>
                  <p className="text-gray-900">{selectedEvent.time}</p>
                </div>
              )}

              {selectedEvent.location && (
                <div>
                  <p className="text-sm text-gray-500">地點</p>
                  <p className="text-gray-900">{selectedEvent.location}</p>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <p className="text-sm text-gray-500">說明</p>
                  <p className="text-gray-900 whitespace-pre-line">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          padding: 12px 4px;
          font-weight: 600;
          color: #334155;
          border-bottom: 2px solid #e2e8f0;
        }
        .rbc-today {
          background-color: #eff6ff;
        }
        .rbc-off-range-bg {
          background-color: #f8fafc;
        }
        .rbc-date-cell {
          padding: 8px;
          text-align: right;
        }
        .rbc-event {
          cursor: pointer;
        }
        .rbc-event:hover {
          opacity: 1 !important;
        }
        .rbc-month-view {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid #e2e8f0;
        }
        .rbc-month-row + .rbc-month-row {
          border-top: 1px solid #e2e8f0;
        }
      `}} />
    </div>
  );
};

export default CalendarView;
