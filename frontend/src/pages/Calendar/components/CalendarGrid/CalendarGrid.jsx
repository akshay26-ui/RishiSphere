import { Check } from 'lucide-react';
import './CalendarGrid.css';

// day names for the top row
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// css class for each event type pill
const PILL_COLOR = {
  official: 'pill-official',
  club: 'pill-club',
  workshop: 'pill-workshop',
  guest: 'pill-guest',
  cultural: 'pill-cultural',
};

export default function CalendarGrid({ cells, onDayClick, onEventClick, selectedEventId, selectedRooms, activeCategories, eventsData = {} }) {
  return (
    <>
      {/* day header row */}
      <div className="calendar-header-row">
        {DAYS.map(d => (
          <div key={d} className="day-header">{d}</div>
        ))}
      </div>

      {/* calendar grid */}
      <div className="calendar-grid">
        {cells.map((cell, i) => {

          // build class list for this cell
          let cellClass = 'calendar-cell';
          if (cell.outsideMonth) cellClass += ' outside-month';
          if (cell.past) cellClass += ' past';
          if (cell.today) cellClass += ' today';
          if (cell.selected) cellClass += ' selected';

          // get events for this day
          const dayEvents = !cell.outsideMonth ? (eventsData[cell.day] || []) : [];

          // if selected event is on this day, highlight cell
          if (dayEvents.some(e => e.id === selectedEventId)) cellClass += ' selected';

          return (
            <div
              key={i}
              className={cellClass}
              onClick={() => onDayClick(cell.day, cell.outsideMonth)}
              style={{ cursor: cell.outsideMonth ? 'default' : 'pointer' }}
            >
              <span className="date-number">{cell.day}</span>

              {/* event pills */}
              {dayEvents.map(ev => {
                // check if filtered out
                const catHidden = activeCategories && !activeCategories.has(ev.category);
                const venueHidden = selectedRooms && selectedRooms.size > 0 && !selectedRooms.has(ev.room);
                const hidden = catHidden || venueHidden;
                const isActive = ev.id === selectedEventId;

                let pillClass = 'cal-event-pill';
                if (PILL_COLOR[ev.category]) pillClass += ' ' + PILL_COLOR[ev.category];
                if (ev.conflict) pillClass += ' conflict-pill';
                if (isActive) pillClass += ' pill-active';
                if (hidden) pillClass += ' pill-filtered';

                return (
                  <button
                    key={ev.id}
                    className={pillClass}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hidden) onEventClick(ev);
                    }}
                  >
                    <div className="pill-left">
                      <div className="cal-event-pill-title">
                        {ev.enrolled && <Check size={12} color={ev.category === 'official' ? '#ffffff' : 'var(--text-main)'} style={{ flexShrink: 0 }} />}
                        <span>{ev.title}</span>
                      </div>
                      <div className="cal-event-pill-room">{ev.room}</div>
                    </div>
                    {ev.conflict && <span className="conflict-indicator">!</span>}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
