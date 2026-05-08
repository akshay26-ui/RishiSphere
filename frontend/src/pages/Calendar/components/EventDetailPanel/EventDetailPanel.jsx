import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Users } from 'lucide-react';
import './EventDetailPanel.css';

// css class for each event category badge
const BADGE = {
  official: 'badge-official',
  club: 'badge-club',
  workshop: 'badge-workshop',
  guest: 'badge-guest',
  cultural: 'badge-cultural',
};

export default function EventDetailPanel({ event, day, dayEvents, onClose, onEventSelect }) {
  const [enrolled, setEnrolled] = useState(event?.enrolled ?? false);

  // ── Mode 1: show full details for a selected event ──
  if (event) {
    const pct = event.enrollment.percent;
    const badge = BADGE[event.category] || 'badge-official';

    return (
      <aside className="right-panel">
        <div className="panel-scrollable">

          {/* header with badge and close button */}
          <div className="panel-section">
            <div className="panel-top">
              <span className={`event-badge ${badge}`}>{event.badge}</span>
              <button className="close-btn" type="button" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <h2 className="panel-title">{event.title}</h2>
            <p className="panel-short-desc">{event.shortDesc}</p>
          </div>

          <div className="panel-divider" />

          {/* organizer */}
          <div className="panel-section">
            <div className="section-label">Conducted By</div>
            <div className="organizer-row">
              <div className="avatar-circle">{event.organizer.initials}</div>
              <div className="organizer-info">
                <div className="organizer-name">{event.organizer.name}</div>
                <div className="organizer-role">{event.organizer.role}</div>
              </div>
            </div>
          </div>

          <div className="panel-divider" />

          {/* when */}
          <div className="panel-section">
            <div className="section-label">When</div>
            <div className="meta-row"><div className="meta-icon"><Calendar size={16} /></div><span>{event.date}</span></div>
            <div className="meta-row"><div className="meta-icon"><Clock size={16} /></div><span>{event.time}</span></div>
            <div className="meta-row"><span className="duration-pill">{event.duration}</span></div>
          </div>

          <div className="panel-divider" />

          {/* where */}
          <div className="panel-section">
            <div className="section-label">Where</div>
            <div className="meta-row">
              <div className="meta-icon"><MapPin size={16} /></div>
              <span style={{ fontWeight: 600 }}>{event.venue.room}</span>
            </div>
            <div className="meta-row indent">{event.venue.detail}</div>
            <div className="venue-detail-card">
              <div className="venue-col">
                <div className="venue-lbl">Block</div>
                <div className="venue-val">{event.venue.block}</div>
              </div>
              <div className="venue-divider" />
              <div className="venue-col">
                <div className="venue-lbl">Floor</div>
                <div className="venue-val">{event.venue.floor}</div>
              </div>
              <div className="venue-divider" />
              <div className="venue-col">
                <div className="venue-lbl">Room</div>
                <div className="venue-val crimson">{event.venue.roomLabel}</div>
              </div>
            </div>
          </div>

          <div className="panel-divider" />

          {/* about */}
          <div className="panel-section">
            <div className="section-label">About</div>
            <p className="description-text">{event.description}</p>
            <div className="tags-row">
              {event.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
            </div>
          </div>

          {/* speakers (only if any) */}
          {event.speakers && event.speakers.length > 0 && (
            <>
              <div className="panel-divider" />
              <div className="panel-section">
                <div className="section-label">Speakers</div>
                {event.speakers.map((s, i) => (
                  <div key={i} className="organizer-row">
                    <div className="avatar-circle muted">{s.initials}</div>
                    <div className="organizer-info">
                      <div className="organizer-name">{s.name}</div>
                      <div className="organizer-role">{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

        {/* enrollment footer */}
        <div className="enrollment-section">
          <div className="seat-info">
            <span>
              <Users size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
              {event.enrollment.filled} / {event.enrollment.total} seats
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>

          {event.conflict && (
            <div className="conflict-warning-inline">
              <div className="conflict-warning-text">{event.conflict.text}</div>
            </div>
          )}

          <button
            type="button"
            className={`ghost-btn-crimson${enrolled ? ' enrolled' : ''}`}
            onClick={() => setEnrolled(e => !e)}
          >
            {enrolled ? <><Check size={16} /> Enrolled · Tap to cancel</> : 'Enroll Now'}
          </button>
        </div>
      </aside>
    );
  }

  // ── Mode 2: day was clicked, show list of events that day ──
  return (
    <aside className="right-panel">
      <div className="panel-scrollable">
        <div className="panel-section">
          <div className="panel-top">
            <span className="event-badge badge-official">
              May {day} · {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
            </span>
            <button className="close-btn" type="button" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <h2 className="panel-title">
            {dayEvents.length > 0 ? 'Events on this day' : 'No events today'}
          </h2>
          {dayEvents.length === 0 && (
            <p className="panel-short-desc">Nothing scheduled. A great day to plan something new!</p>
          )}
        </div>

        {/* list of events for this day */}
        {dayEvents.length > 0 && (
          <div className="panel-section" style={{ paddingTop: 0 }}>
            {dayEvents.map(ev => (
              <button key={ev.id} className="day-event-row" type="button" onClick={() => onEventSelect(ev)}>
                <div className={`mini-dot pill-${ev.category}`} style={{ marginTop: 6 }} />
                <div className="day-event-info">
                  <div className="day-event-title">{ev.title}</div>
                  <div className="day-event-meta">
                    <Clock size={12} /> {ev.time}
                    <span style={{ margin: '0 6px' }}>·</span>
                    <MapPin size={12} /> {ev.room}
                  </div>
                </div>
                <span className="day-event-arrow">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
