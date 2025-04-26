
import React from 'react';

function Sidebar({
  onToday,
  onYearView,
  onGoToDate,
  onAddEventClick,
  onAllEvents,
  onSearchEvents,
  onClearAllEvents,
  onSettings,
  remindersEnabled,
  setRemindersEnabled,
  darkMode,
  setDarkMode
}) {
  return (
    <aside className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><button onClick={onToday}>Today</button></li>
        <li><button onClick={onYearView}>Year View</button></li>
        <li><button onClick={onGoToDate}>Go to Date</button></li>
        <li><button onClick={onAddEventClick}>Add Event</button></li>
        <li><button onClick={onAllEvents}>All Events</button></li>
        <li><button onClick={onSearchEvents}>Search Events</button></li>
        <li><button onClick={onClearAllEvents}>Clear All Events</button></li>
        <li><button onClick={onSettings}>Settings</button></li>
      </ul>

      <div className="toggles">
        <label>
          <input
            type="checkbox"
            checked={remindersEnabled}
            onChange={() => setRemindersEnabled(!remindersEnabled)}
          />
          Reminders
        </label>

        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;
