import { Check } from 'lucide-react';
import { CALENDAR_EVENTS } from '../../calendarData';
import './CalendarGrid.css';

const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const PILL_CLASS = {
  official: 'pill-official',
  club: 'pill-club',
  workshop: 'pill-workshop',
  guest: 'pill-guest',
  cultural: 'pill-cultural',
};

export default function CalendarGrid({
  cells,
  onDayClick,
  onEventClick,
  selectedEventId,
  selectedRooms,    // Set<string> of selected room IDs (empty = no filter)
  activeCategories, // Set<string> of active category IDs
}) {
  return (
    <>
      <div className="calendar-header-row">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="day-header">{d}</div>
        ))}
      </div>

      <div className="calendar-grid" role="grid" aria-label="Calendar">
        {cells.map((cell, idx) => {
          const classes = ['calendar-cell'];
          if (cell.outsideMonth) classes.push('outside-month');
          if (cell.past) classes.push('past');
          if (cell.today) classes.push('today');
          if (cell.selected) classes.push('selected');

          const rawEvents = !cell.outsideMonth ? (CALENDAR_EVENTS[cell.day] || []) : [];

          // Highlight the day cell if the currently open event lives here
          const hasSelectedEvent = rawEvents.some(e => e.id === selectedEventId);
          if (hasSelectedEvent) classes.push('selected');

          return (
            <div
              key={idx}
              className={classes.join(' ')}
              role="gridcell"
              aria-label={`Day ${cell.day}`}
              onClick={() => onDayClick(cell.day, cell.outsideMonth)}
              style={{ cursor: cell.outsideMonth ? 'default' : 'pointer' }}
            >
              <span className="date-number">{cell.day}</span>

              {rawEvents.map((evt) => {
                // ── Filtering logic ──
                // 1. Category filter: if category is unchecked, hide (dim) the pill
                const categoryOff = activeCategories && !activeCategories.has(evt.category);

                // 2. Venue filter: if rooms are selected AND this event's room isn't in the set → dim
                const venueOff = selectedRooms && selectedRooms.size > 0
                  && !selectedRooms.has(evt.room);

                const isFiltered = categoryOff || venueOff;
                const isActiveEvent = evt.id === selectedEventId;

                return (
                  <button
                    key={evt.id}
                    className={[
                      'cal-event-pill',
                      PILL_CLASS[evt.category],
                      evt.conflict ? 'conflict-pill' : '',
                      isActiveEvent ? 'pill-active' : '',
                      isFiltered ? 'pill-filtered' : '',
                    ].filter(Boolean).join(' ')}
                    type="button"
                    aria-label={`${evt.title} at ${evt.room}`}
                    aria-hidden={isFiltered}
                    tabIndex={isFiltered ? -1 : 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isFiltered) onEventClick(evt);
                    }}
                  >
                    <div className="pill-left">
                      <div className="cal-event-pill-title">
                        {evt.enrolled && (
                          <Check
                            size={12}
                            color={evt.category === 'official' ? '#ffffff' : 'var(--text-main)'}
                            style={{ flexShrink: 0 }}
                          />
                        )}
                        <span>{evt.title}</span>
                      </div>
                      <div className="cal-event-pill-room">{evt.room}</div>
                    </div>
                    {evt.conflict && (
                      <span className="conflict-indicator" aria-label="Conflict">!</span>
                    )}
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
