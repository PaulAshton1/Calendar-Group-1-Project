import React from 'react';
import { format } from 'date-fns';

const Header = ({ currentDate, handlePrevMonth, handleNextMonth, handleToday, showForm, setShowForm }) => (
    <header className="header">
        <h1>Time Managemant App</h1>
        <h2 className="month-title">{format(currentDate, 'MMMM yyyy')}</h2>

        <div className="NavigationControls">
            <button onClick={handlePrevMonth}>Prev Month</button>
            <button onClick={handleToday}>Today</button>
            <button onClick={handleNextMonth}>Next Month</button>
        </div>

        <button onClick={() => setShowForm(!showForm)} className="add-event-button">
            {showForm ? 'Close' : 'Add Event'}
        </button>
    </header>
);

export default Header;
