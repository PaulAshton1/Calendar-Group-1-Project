import React, { useState } from 'react';

const EventForm = ({ currentDate, onAddEvent, onClose }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(currentDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onAddEvent({ title, date: date.toISOString().split('T')[0] });
    }
  };

  return (
    <div className="event-form">
      <h3>Add Event</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <button type="submit">Add Event</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EventForm;
