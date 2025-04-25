import './App.css';
import React, { useState } from 'react';
import CalendarGrid from './Components/CalendarGrid';
import EventForm from './Components/EventForm';
import { addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'day', 'week', 'month'
  const [events, setEvents] = useState([]);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false); // for opening event form modal

  const handlePrev = () => {
    if (view === 'day') setCurrentDate(subDays(currentDate, 1));
    else if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    if (view === 'day') setCurrentDate(addDays(currentDate, 1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setIsEventFormOpen(false); // close form after adding event
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e !== eventToDelete));
  };

  return (
    <div className="App">
      <h1 className="Calendar">My Calendar App</h1>

      {/* Navigation Controls */}
      <div className="NavigationControls flex">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNext}>Next</button>
        {['day', 'week', 'month'].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={view === v ? 'active' : ''}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        currentDate={currentDate}
        view={view}
        events={events}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* Add Event Button */}
      <button className="add-event-btn" onClick={() => setIsEventFormOpen(true)}>
        Add Event
      </button>

      {/* Event Form */}
      {isEventFormOpen && (
        <EventForm
          currentDate={currentDate}
          onAddEvent={handleAddEvent}
          onClose={() => setIsEventFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
