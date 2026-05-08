import { Type } from 'lucide-react';
import { EVENT_TYPES } from '../../../shared/constants';
import './EventBasicsForm.css';

export default function EventBasicsForm({
  activeType, setActiveType,
  eventName, setEventName
}) {
  return (
    <>
      <div className="section-header">
        <div className="section-header-row">
          <span className="section-pill">Step 1</span>
          <span className="section-title">Event Basics</span>
        </div>
        <p className="section-desc">Let's start with the name and category.</p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="event-name">
          Event Name <span className="required">*</span>
        </label>
        <div className="form-input-with-icon">
          <div className="icon"><Type size={18} /></div>
          <input
            id="event-name"
            type="text"
            className="form-input"
            placeholder="E.g., Annual Tech Symposium"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Event Type <span className="required">*</span>
        </label>
        <div className="type-grid">
          {EVENT_TYPES.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                className={`type-card ${activeType === type.id ? 'active' : ''}`}
                onClick={() => setActiveType(type.id)}
              >
                <div className="type-icon"><Icon size={16} /></div>
                <div className="type-title">{type.label}</div>
                <div className="type-desc">{type.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}


