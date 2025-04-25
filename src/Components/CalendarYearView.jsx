import React from 'react';
import { format, startOfMonth, addMonths, getDaysInMonth } from 'date-fns';

const CalendarYearView = ({ currentDate, setCurrentDate }) => {
  // Get the first day of the current year
  const startOfYear = startOfMonth(currentDate);

  // Generate the months for the year
  const months = Array.from({ length: 12 }, (_, index) => {
    return addMonths(startOfYear, index); // Add months to the start of the year
  });

  return (
    <div className="calendar-year-view">
      <h2 className="year-title">{format(currentDate, 'yyyy')}</h2>
      <div className="month-grid">
        {months.map((month, index) => {
          const daysInMonth = getDaysInMonth(month); // Get number of days in this month

          return (
            <div
              key={index}
              className="month-cell"
              onClick={() => setCurrentDate(month)} // Set currentDate to the clicked month
            >
              <span className="month-name">{format(month, 'MMMM')}</span>
              <span className="month-days">({daysInMonth} days)</span> {/* Display number of days */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarYearView;
