import React, { useState } from 'react';


const EventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onSave({ title, date, time, notes });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Event</h2>

        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>

        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
