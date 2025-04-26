import './App.css';
import React, { useState, useEffect } from 'react';
import CalendarGrid from './Components/CalendarGrid';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { addMonths, subMonths, format } from 'date-fns';
import { isSameDay as dateFnsIsSameDay, parseISO } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', time: '' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [goToDateInput, setGoToDateInput] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const { title, date, time } = formData;
    if (!title || !date) return;

    const dateTime = time ? `${date}T${time}` : date;
    const newEvent = { id: Date.now(), title, date: dateTime };

    setEvents([...events, newEvent]);
    setFormData({ title: '', date: '', time: '' });
    setShowForm(false);
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    setSearchQuery('');
    setSearchResult(null);
    setGoToDateInput('');
  };

  const handleAllEvents = () => {
    if (events.length === 0) {
      alert("No events yet, Click on Add Event to create one");
    } else {
      openModal('allEvents');
    }
  };

  const handleSearchEvents = () => openModal('search');
  const handleClearAllEvents = () => openModal('clearConfirm');
  const handleSettings = () => openModal('settings');
  const handleGoToDate = () => openModal('goToDate');
  const handleYearView = () => openModal('yearView');

  const searchEvent = () => {
    const found = events.find((e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedDate(parseISO(found.date));
      setSearchResult(found);
    } else {
      setSearchResult(null);
      alert("Event not found");
    }
  };

  const goToDate = () => {
    const parsedDate = new Date(goToDateInput);
    if (!isNaN(parsedDate)) {
      setCurrentDate(parsedDate);
      setModalOpen(false);
    } else {
      alert("Invalid date format. Please use YYYY-MM-DD.");
    }
  };

  const confirmClearEvents = () => {
    setEvents([]);
    setModalOpen(false);
  };

  const isSameDay = (d1, d2) => dateFnsIsSameDay(d1, d2);

  const Modal = () => {
    if (!modalOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={() => setModalOpen(false)}>X</button>

          {modalType !== 'settings' && modalType !== 'yearView' && (
            <h2>{modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h2>
          )}

          {modalType === 'allEvents' && (
            <>
              {events.map((event) => (
                <div key={event.id}>
                  <strong>{event.title}</strong> on {format(new Date(event.date), 'PPpp')}
                </div>
              ))}
            </>
          )}

          {modalType === 'search' && (
            <>
              <input
                type="text"
                placeholder="Enter event name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={searchEvent}>Search</button>

              {searchResult && (
                <div className="search-result">
                  <h3>Found Event</h3>
                  <p><strong>{searchResult.title}</strong> on {format(new Date(searchResult.date), 'PPpp')}</p>
                </div>
              )}
            </>
          )}

          {modalType === 'clearConfirm' && (
            <>
              <p>This will erase all your events. Are you sure?</p>
              <button onClick={confirmClearEvents}>Yes, clear all</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </>
          )}

          {modalType === 'settings' && (
            <>
              <h2>Settings</h2>
              <p>No specific settings yet.</p>
            </>
          )}

          {modalType === 'goToDate' && (
            <>
              <input
                type="date"
                value={goToDateInput}
                onChange={(e) => setGoToDateInput(e.target.value)}
              />
              <button onClick={goToDate}>Go!</button>
            </>
          )}

          {modalType === 'yearView' && (
            <>
              <h2>Year Overview: {currentDate.getFullYear()}</h2>
              <div className="year-grid">
                {[
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ].map((month, index) => (
                  <div key={index} className="month-box">
                    <h3>{month}</h3>
                    <div className="month-dates">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <div className="day-box" key={day}>
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
             <button className="back-btn" onClick={() => setModalOpen(false)}>Back</button>

            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App layout">
      <Sidebar
        onToday={handleToday}
        onYearView={handleYearView}
        onGoToDate={handleGoToDate}
        onAddEventClick={() => setShowForm(!showForm)}
        onAllEvents={handleAllEvents}
        onSearchEvents={handleSearchEvents}
        onClearAllEvents={handleClearAllEvents}
        onSettings={handleSettings}
        remindersEnabled={false}
        setRemindersEnabled={() => { }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="main-content">
        <Header
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleToday={handleToday}
          showForm={showForm}
          setShowForm={setShowForm}
        />

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

        <CalendarGrid
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDeleteEvent={handleDeleteEvent}
        />

        <Modal />
      </div>
    </div>
  );
}

export default App;
