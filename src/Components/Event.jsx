// components/Event.jsx
import React from 'react';

const Event = ({ event }) => {
  return (
    <div className="bg-blue-500 text-white rounded px-2 py-1 mt-1 text-xs cursor-pointer hover:bg-blue-600">
      {event.title}
    </div>
  );
};

export default Event;
