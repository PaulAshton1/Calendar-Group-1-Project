
import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';


const CalendarGrid = ({ currentDate, events, onDeleteEvent }) => {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = eachDayOfInterval({ start, end });

  return (
    <>
      <div className="calendar-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="header-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(new Date(event.date), day)
          );

          return (
            <div key={day} className="calendar-cell">
              <div className="date">{format(day, 'd')}</div>
              {dayEvents.map((event, index) => (
                <Event key={index} event={event} onDeleteEvent={onDeleteEvent} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;
