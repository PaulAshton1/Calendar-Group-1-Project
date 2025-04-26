import React, { useState } from 'react';
import CalendarGrid from './Components/CalendarGrid';
import EventModal from './Components/EventModal';
import {
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigation handlers
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

  // Add and delete events
  const handleSaveEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="app p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar App</h1>

      {/* Navigation & View Toggle */}
      <div className="app-controls mb-4 flex gap-2">
        <button onClick={handlePrev} className="bg-gray-300 px-4 py-2 rounded">Prev</button>
        <button onClick={handleToday} className="bg-gray-300 px-4 py-2 rounded">Today</button>
        <button onClick={handleNext} className="bg-gray-300 px-4 py-2 rounded">Next</button>

        {['day', 'week', 'month'].map((v) => (
          <button
            key={v}
            className={`px-4 py-2 rounded ${view === v ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setView(v)}
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
        deleteEvent={deleteEvent}
      />

      {/* Add Event Button */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Event
        </button>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}

export default App;