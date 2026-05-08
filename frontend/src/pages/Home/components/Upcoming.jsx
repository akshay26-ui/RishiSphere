import './Upcoming.css';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UpcomingSection() {
  return (
    <section className="upcoming-section">
      <div className="orb-u1" />
      <div className="orb-u2" />
      <div className="section-header">
        <h2 className="section-title">Upcoming Events Highlights</h2>
        <p className="section-subtitle">The pulse of the campus, next.</p>
      </div>
      <div className="upcoming-grid">
        <div className="event-glass-card card-main">
          <div className="date-badge"><span>OCT</span> 24</div>
          <div className="card-content">
            <div className="event-type">Flagship Event</div>
            <h3 className="event-name">TEDx Rishihood</h3>
            <p className="event-desc">
              Ideas worth spreading. Join us for a day of inspiring talks
              from industry leaders, visionaries, and our own student community.
            </p>
            <div className="action-row">
              <span className="location"><MapPin size={16} /> Main Auditorium</span>
              <Link to="/calendar" className="glass-btn">RSVP Now</Link>
            </div>
          </div>
        </div>
        <div className="right-stack">
          <div className="event-glass-card card-small">
            <div className="date-side">
              <span className="d-month">OCT</span>
              <span className="d-day">28</span>
            </div>
            <div className="card-content-sm">
              <div className="event-type">Workshop</div>
              <h4 className="event-name-sm">Intro to Web3</h4>
              <span className="time"><Clock size={14} /> 4:00 PM • Tech Society</span>
            </div>
          </div>
          <div className="event-glass-card card-small">
            <div className="date-side">
              <span className="d-month">NOV</span>
              <span className="d-day">02</span>
            </div>
            <div className="card-content-sm">
              <div className="event-type">Cultural</div>
              <h4 className="event-name-sm">Diwali Mela</h4>
              <span className="time"><Clock size={14} /> 6:00 PM • Open Ground</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
