import { Calendar, Clock } from 'lucide-react';

export default function DateTimeForm({
  recurring, setRecurring,
  eventDate, setEventDate,
  startTime, setStartTime,
  endTime, setEndTime
}) {
  // Calculate duration display
  let duration = '--';
  if (startTime && endTime) {
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins > 0) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      duration = h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}`.trim() : `${m}m`;
    }
  }

  return (
    <>
      <div className="section-header">
        <div className="section-header-row">
          <span className="section-pill">Step 2</span>
          <span className="section-title">Date & Time</span>
        </div>
        <p className="section-desc">When will this take place?</p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="event-date">
          Date <span className="required">*</span>
        </label>
        <div className="form-input-with-icon">
          <div className="icon"><Calendar size={18} /></div>
          <input
            id="event-date"
            type="date"
            className="form-input"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
          />
        </div>
      </div>

      <div className="two-cols">
        <div className="form-group">
          <label className="form-label" htmlFor="start-time">
            Start Time <span className="required">*</span>
          </label>
          <div className="form-input-with-icon">
            <div className="icon"><Clock size={18} /></div>
            <input
              id="start-time"
              type="time"
              className="form-input"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="end-time">
            End Time <span className="required">*</span>
          </label>
          <div className="form-input-with-icon">
            <div className="icon"><Clock size={18} /></div>
            <input
              id="end-time"
              type="time"
              className="form-input"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="duration-wrapper">
        <div className="duration-pill">Duration: {duration}</div>
      </div>

      <div className="form-group">
        <div className="toggle-row">
          <div>
            <div className="toggle-label dark">Recurring Event</div>
            <div className="helper-text" style={{ marginTop: '2px' }}>Does this happen weekly or monthly?</div>
          </div>
          <button
            type="button"
            className={`toggle-switch ${recurring ? 'on' : 'off'}`}
            onClick={() => setRecurring(!recurring)}
            aria-label="Toggle recurring event"
          />
        </div>
      </div>
    </>
  );
}
