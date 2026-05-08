import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../pages/Calendar/calendarData';
import { getEvents } from '../../services/event.service';
import { getRooms } from '../../services/room.service';
import './Sidebar.css';

const STATUS_CLASS = {
  enrolled: 'tag-enrolled', pending: 'tag-pending',
  approved: 'tag-approved', rejected: 'tag-rejected',
  cancelled: 'tag-rejected',
};
const EVENT_CLASS = {
  enrolled: 'my-event-enrolled', pending: 'my-event-pending',
  approved: 'my-event-approved', rejected: 'my-event-rejected',
  cancelled: 'my-event-rejected',
};

export default function Sidebar({
  selectedRooms,
  setSelectedRooms,
  activeCategories,
  setActiveCategories,
}) {
  const navigate = useNavigate();

  const [myEvents, setMyEvents] = useState([]);
  const [dynamicVenues, setDynamicVenues] = useState([]);

  // Track which venue blocks are expanded (open accordion panels)
  const [expandedVenues, setExpandedVenues] = useState(new Set(['all-venues']));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User's Events
        const eventsRes = await getEvents({ mine: 'true' });
        if (eventsRes.data) {
          const formattedEvents = eventsRes.data.map(evt => ({
            id: evt.id,
            title: evt.title,
            date: new Date(evt.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' }),
            time: new Date(evt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: evt.status.toLowerCase(),
          }));
          setMyEvents(formattedEvents);
        }

        // Fetch Rooms
        const roomsRes = await getRooms();
        if (roomsRes.data) {
          const venueData = [
            {
              id: 'all-venues',
              name: 'Campus Venues',
              roomCount: roomsRes.data.length,
              expanded: true,
              floors: [
                {
                  label: 'All Rooms',
                  rooms: roomsRes.data.map(r => ({ id: r.name, active: true }))
                }
              ]
            }
          ];
          setDynamicVenues(venueData);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };
    fetchData();
  }, []);

  /* ── Category filter ── */
  const toggleCategory = (id) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Venue accordion expand/collapse ── */
  const toggleVenueOpen = (id) => {
    setExpandedVenues(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Room pill toggle ── */
  const toggleRoom = (roomId) => {
    setSelectedRooms(prev => {
      const next = new Set(prev);
      next.has(roomId) ? next.delete(roomId) : next.add(roomId);
      return next;
    });
  };

  /* ── Clear all venue selections (keeps accordions open) ── */
  const clearVenues = () => setSelectedRooms(new Set());

  const venueFilterActive = selectedRooms.size > 0;

  return (
    <aside className="sidebar" aria-label="Sidebar">

      {/* ── My Events ── */}
      <section className="sidebar-section">
        <div className="sidebar-label"><span>My Events</span></div>
        <div className="my-events-list" role="list">
          {myEvents.length === 0 && <p className="panel-short-desc" style={{fontSize: '13px', color: 'var(--text-muted)'}}>No events found.</p>}
          {myEvents.map(evt => (
            <button
              key={evt.id}
              className={`my-event-item ${EVENT_CLASS[evt.status]}`}
              role="listitem"
              aria-label={`${evt.title} — ${evt.status}`}
              type="button"
            >
              <div className="my-event-info">
                <div className="my-event-title">{evt.title}</div>
                <div className="my-event-time">{evt.date} • {evt.time}</div>
              </div>
              <span className={`status-tag ${STATUS_CLASS[evt.status]}`}>
                {evt.status.charAt(0).toUpperCase() + evt.status.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <button className="see-all-link" type="button">
          See all <ArrowRight size={14} />
        </button>
      </section>

      <div className="sidebar-divider" />

      {/* ── Submit Event CTA ── */}
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

      {/* ── Filter by Category ── */}
      <section className="sidebar-section">
        <div className="sidebar-label"><span>Filter Events</span></div>
        <div className="filters-list">
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className="filter-row"
              onClick={() => toggleCategory(cat.id)}
              aria-pressed={activeCategories.has(cat.id)}
              type="button"
            >
              <div className="filter-left">
                <div className={`filter-dot ${cat.dotClass}`} />
                <span className={`filter-name${!activeCategories.has(cat.id) ? ' dimmed' : ''}`}>
                  {cat.label}
                </span>
              </div>
              <div className={`filter-checkbox${activeCategories.has(cat.id) ? ' active' : ''}`}>
                {activeCategories.has(cat.id) && <Check size={12} color="#ffffff" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="sidebar-divider" />

      {/* ── Filter by Venue ── */}
      <section className="sidebar-section">
        <div className="sidebar-label">
          <span>
            Filter by Venue
            {venueFilterActive && (
              <span className="venue-active-badge">{selectedRooms.size}</span>
            )}
          </span>
          {venueFilterActive && (
            <button className="clear-link" type="button" onClick={clearVenues}>
              Clear all
            </button>
          )}
        </div>

        <div className="venue-accordion">
          {dynamicVenues.map(venue => {
            const isOpen = expandedVenues.has(venue.id);
            const hasRooms = venue.floors.length > 0;

            return (
              <div key={venue.id} className="venue-block">
                {/* Accordion header — always clickable */}
                <button
                  className={`accordion-header${isOpen ? ' open' : ''}`}
                  onClick={() => toggleVenueOpen(venue.id)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className="accordion-title">{venue.name}</span>
                  <div className="accordion-right">
                    {venue.roomCount && (
                      <span className="room-count-pill">{venue.roomCount} rooms</span>
                    )}
                    {isOpen
                      ? <ChevronDown size={16} color="var(--text-muted)" />
                      : <ChevronRight size={16} color="var(--text-muted)" />
                    }
                  </div>
                </button>

                {/* Accordion body — only if open and has floors */}
                {isOpen && hasRooms && (
                  <div className="accordion-body">
                    {venue.floors.map(floor => (
                      <div key={floor.label} className="floor-group">
                        <div className="floor-label">{floor.label}</div>
                        <div className="room-pills">
                          {floor.rooms.map(room => {
                            const isSelected = selectedRooms.has(room.id);
                            return (
                              <button
                                key={room.id}
                                className={`room-pill${isSelected ? ' active' : ''}`}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleRoom(room.id)}
                                title={`Filter by ${room.id}`}
                              >
                                {room.id}
                                {isSelected && (
                                  <Check
                                    size={10}
                                    style={{ marginLeft: 4, flexShrink: 0 }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Open but no rooms (e.g. Block C, Other Venues) */}
                {isOpen && !hasRooms && (
                  <div className="accordion-body">
                    <p className="no-rooms-text">No specific rooms listed.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {venueFilterActive && (
          <div className="venue-filter-summary">
            Showing events in: {[...selectedRooms].join(', ')}
          </div>
        )}
      </section>

      <div className="sidebar-divider" />

      {/* ── Conflict Warning ── */}
      <section className="sidebar-section">
        <div className="sidebar-conflict" role="alert">
          <div className="conflict-text">⚠ You have a time conflict on May 10.</div>
          <button className="conflict-link" type="button">Review</button>
        </div>
      </section>

    </aside>
  );
}
