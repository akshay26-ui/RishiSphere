import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../pages/Calendar/calendarData';
import { getEvents } from '../../services/event.service';
import { getRooms } from '../../services/room.service';
import './Sidebar.css';

// css classes for event status tags
const STATUS_CLASS = {
  enrolled: 'tag-enrolled',
  pending: 'tag-pending',
  approved: 'tag-approved',
  rejected: 'tag-rejected',
  cancelled: 'tag-rejected',
};

// css classes for event item rows
const EVENT_CLASS = {
  enrolled: 'my-event-enrolled',
  pending: 'my-event-pending',
  approved: 'my-event-approved',
  rejected: 'my-event-rejected',
  cancelled: 'my-event-rejected',
};

export default function Sidebar({ selectedRooms, setSelectedRooms, activeCategories, setActiveCategories }) {
  const navigate = useNavigate();

  const [myEvents, setMyEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [openVenues, setOpenVenues] = useState(new Set(['all-venues']));

  // load my events and rooms on mount
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // get my events
      const evRes = await getEvents({ mine: 'true' });
      if (evRes.data) {
        const list = evRes.data.map(ev => ({
          id: ev.id,
          title: ev.title,
          date: new Date(ev.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' }),
          time: new Date(ev.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: ev.status.toLowerCase(),
        }));
        setMyEvents(list);
      }

      // get rooms and build venue list
      const roomRes = await getRooms();
      if (roomRes.data) {
        setVenues([{
          id: 'all-venues',
          name: 'Campus Venues',
          roomCount: roomRes.data.length,
          floors: [{ label: 'All Rooms', rooms: roomRes.data.map(r => ({ id: r.name, active: true })) }]
        }]);
      }
    } catch (err) {
      console.log("Sidebar load error:", err);
    }
  }

  // toggle a category filter on/off
  function toggleCategory(id) {
    const next = new Set(activeCategories);
    next.has(id) ? next.delete(id) : next.add(id);
    setActiveCategories(next);
  }

  // toggle a venue accordion open/close
  function toggleVenue(id) {
    const next = new Set(openVenues);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenVenues(next);
  }

  // toggle a room filter on/off
  function toggleRoom(id) {
    const next = new Set(selectedRooms);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedRooms(next);
  }

  // clear all room filters
  function clearRooms() {
    setSelectedRooms(new Set());
  }

  const hasRoomFilter = selectedRooms.size > 0;

  return (
    <aside className="sidebar">

      {/* my events */}
      <section className="sidebar-section">
        <div className="sidebar-label"><span>My Events</span></div>
        <div className="my-events-list">
          {myEvents.length === 0 && (
            <p className="panel-short-desc" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No events found.</p>
          )}
          {myEvents.map(ev => (
            <button key={ev.id} className={`my-event-item ${EVENT_CLASS[ev.status]}`} type="button">
              <div className="my-event-info">
                <div className="my-event-title">{ev.title}</div>
                <div className="my-event-time">{ev.date} • {ev.time}</div>
              </div>
              <span className={`status-tag ${STATUS_CLASS[ev.status]}`}>
                {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <button className="see-all-link" type="button">See all <ArrowRight size={14} /></button>
      </section>

      <div className="sidebar-divider" />

      {/* submit event cta */}
      <section className="sidebar-section">
        <div className="sidebar-label"><span>Got an idea?</span></div>
        <div className="submit-card">
          <p className="submit-card-text">Have an event idea? Submit it for admin approval.</p>
          <button className="submit-card-btn" type="button" onClick={() => navigate('/submit-event')}>
            Submit Event <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <div className="sidebar-divider" />

      {/* filter by category */}
      <section className="sidebar-section">
        <div className="sidebar-label"><span>Filter Events</span></div>
        <div className="filters-list">
          {EVENT_CATEGORIES.map(cat => (
            <button key={cat.id} className="filter-row" type="button" onClick={() => toggleCategory(cat.id)}>
              <div className="filter-left">
                <div className={`filter-dot ${cat.dotClass}`} />
                <span className={`filter-name${!activeCategories.has(cat.id) ? ' dimmed' : ''}`}>{cat.label}</span>
              </div>
              <div className={`filter-checkbox${activeCategories.has(cat.id) ? ' active' : ''}`}>
                {activeCategories.has(cat.id) && <Check size={12} color="#ffffff" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="sidebar-divider" />

      {/* filter by venue */}
      <section className="sidebar-section">
        <div className="sidebar-label">
          <span>
            Filter by Venue
            {hasRoomFilter && <span className="venue-active-badge">{selectedRooms.size}</span>}
          </span>
          {hasRoomFilter && <button className="clear-link" type="button" onClick={clearRooms}>Clear all</button>}
        </div>

        <div className="venue-accordion">
          {venues.map(venue => {
            const isOpen = openVenues.has(venue.id);
            return (
              <div key={venue.id} className="venue-block">
                {/* accordion header */}
                <button
                  className={`accordion-header${isOpen ? ' open' : ''}`}
                  type="button"
                  onClick={() => toggleVenue(venue.id)}
                >
                  <span className="accordion-title">{venue.name}</span>
                  <div className="accordion-right">
                    {venue.roomCount && <span className="room-count-pill">{venue.roomCount} rooms</span>}
                    {isOpen ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                  </div>
                </button>

                {/* room pills (when open) */}
                {isOpen && venue.floors.length > 0 && (
                  <div className="accordion-body">
                    {venue.floors.map(floor => (
                      <div key={floor.label} className="floor-group">
                        <div className="floor-label">{floor.label}</div>
                        <div className="room-pills">
                          {floor.rooms.map(room => {
                            const on = selectedRooms.has(room.id);
                            return (
                              <button
                                key={room.id}
                                className={`room-pill${on ? ' active' : ''}`}
                                type="button"
                                onClick={() => toggleRoom(room.id)}
                                title={`Filter by ${room.id}`}
                              >
                                {room.id}
                                {on && <Check size={10} style={{ marginLeft: 4, flexShrink: 0 }} />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {isOpen && venue.floors.length === 0 && (
                  <div className="accordion-body">
                    <p className="no-rooms-text">No specific rooms listed.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hasRoomFilter && (
          <div className="venue-filter-summary">
            Showing events in: {[...selectedRooms].join(', ')}
          </div>
        )}
      </section>

      <div className="sidebar-divider" />

      {/* conflict warning */}
      <section className="sidebar-section">
        <div className="sidebar-conflict">
          <div className="conflict-text">⚠ You have a time conflict on May 10.</div>
          <button className="conflict-link" type="button">Review</button>
        </div>
      </section>

    </aside>
  );
}
