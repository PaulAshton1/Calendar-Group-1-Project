
import React from 'react';

const Event = ({ event, onDeleteEvent }) => {
  return (
    <div className="event">
      <span>{event.title}</span>
      <button onClick={() => onDeleteEvent(event.id)}>🗑️</button>
    </div>
  );
};

export default Event;
