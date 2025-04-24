// components/CalendarGrid.jsx
import React from 'react';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import Event from './Event';

function CalendarGrid({ currentDate, view, events }) {
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday

  const renderCells = () => {
    const cells = [];
    const daysToShow = view === 'month' ? 35 : view === 'week' ? 7 : 1;

    for (let i = 0; i < daysToShow; i++) {
      const day = addDays(startDate, i);
      const dayEvents = events.filter((event) =>
        isSameDay(new Date(event.date), day)
      );

      cells.push(
        <div key={i} className="border p-2 h-32 relative">
          <div className="text-xs font-medium">{format(day, 'EEE d')}</div>
          {dayEvents.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      );
    }

    return cells;
  };

  return (
    <div
      className={`grid gap-px bg-gray-300 ${
        view === 'month' ? 'grid-cols-7' : 'grid-cols-1'
      }`}
    >
      {renderCells()}
    </div>
  );
}

export default CalendarGrid;

