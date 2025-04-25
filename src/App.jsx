
import './App.css';
import React, { useState } from 'react';
import CalendarGrid from './Components/CalendarGrid';
import EventForm from './Components/EventForm';
import { addMonths, subMonths } from 'date-fns';
import { format } from 'date-fns';
import { isSameDay as dateFnsIsSameDay } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
  });

  // State to keep track of the selected day
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1)); // Go to previous month
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1)); // Go to next month
  };

  const handleToday = () => {
    setCurrentDate(new Date()); // Go to today's date
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const { title, date, time } = formData;
    if (!title || !date) return;

    const dateTime = time ? `${date}T${time}` : date;

    const newEvent = {
      id: Date.now(), // simple unique id
      title,
      date: dateTime,
    };

    setEvents([...events, newEvent]);
    setFormData({ title: '', date: '', time: '' });
    setShowForm(false);
  };

  const isSameDay = (date1, date2) => {
    return dateFnsIsSameDay(date1, date2);
  };

  return (
      <div className="App">
        <h1 className="Calendar">My Calendar App</h1>

        {/* Display Current Month */}
        <h2 className="month-title">
          {format(currentDate, 'MMMM yyyy')}
        </h2>

        {/* Navigation Controls */}
        <div className="NavigationControls flex">
          <button onClick={handlePrevMonth}>Prev Month</button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleNextMonth}>Next Month</button>
        </div>

        {/* Add Event Form Button */}
        <button onClick={() => setShowForm(!showForm)} className="add-event-button">
          {showForm ? 'Close' : 'Add Event'}
        </button>

        {showForm && (
          <form onSubmit={handleAddEvent} className="event-form">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            <button type="submit">Add</button>
          </form>
        )}

        {/* Calendar Grid */}
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDeleteEvent={handleDeleteEvent}
        />

        {/* Display Events for the selected day */}
        {selectedDate && (
          <div className="events-list">
            <h3>Events on {format(selectedDate, 'MMMM dd, yyyy')}</h3>
            <ul>
              {events
                .filter((event) => isSameDay(new Date(event.date), selectedDate))
                .map((event) => (
                  <li key={event.id}>
                    <div>{event.title}</div>
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
}

export default App;
