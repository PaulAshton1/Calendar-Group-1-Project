// components/Event.jsx
import React from 'react';

const Event = ({ event, onDeleteEvent }) => {
  return (
    <div className="event">
      <div>{event.title}</div>
      <button onClick={() => onDeleteEvent(event)}>Delete</button>
    </div>
  );
};

export default Event;
