import Event from './Event';
import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

const CalendarGrid = ({ currentDate, events, selectedDate, setSelectedDate, onDeleteEvent, onAddEvent }) => {
  // Get the start and end of the current month
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  // Get the first and last days of the week that contains the current month
  const start = startOfWeek(startOfCurrentMonth); // Start of the week for current month
  const end = endOfWeek(endOfCurrentMonth); // End of the week for current month

  // Get all days in the range from start to end
  const days = eachDayOfInterval({ start, end });

  // Handle day click
  const handleDayClick = (day) => {
    const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day));

    // Show an alert if no event is found for the clicked day
    if (dayEvents.length === 0) {
      alert("No event, click on add event to create one");
    }

    setSelectedDate(day); // Set the selected date
  };

  return (
    <div className="calendar">
      {/* Month Title */}
      <h2 className="month-title">{format(currentDate, 'MMMM yyyy')}</h2>

      {/* Days of the week (header) */}
      <div className="calendar-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="header-cell">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map((day) => {
          // Find the events for the day
          const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day));

          return (
            <div
              key={day}
              className={`calendar-cell ${isSameDay(day, new Date()) ? 'today' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)} // Set selected date on click
            >
              <div className="date">{format(day, 'd')}</div>
              {dayEvents.length > 0 && dayEvents.map((event, index) => (
                <div key={index} className="DayEvent">
                  <span>{event.title}</span>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}>🗑️</button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Add Event Button (visible if there are no events for the selected day) */}
      {selectedDate && events.filter((event) => isSameDay(new Date(event.date), selectedDate)).length === 0 && (
        <button onClick={() => onAddEvent(selectedDate)} className="add-event-button">
          Add Event
        </button>
      )}
    </div>
  );
};

export default CalendarGrid;


