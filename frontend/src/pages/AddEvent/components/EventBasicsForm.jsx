import { Users } from 'lucide-react';
import { EVENT_TYPES } from '../../../shared/constants';

export default function EventBasicsForm({ activeType, setActiveType, eventName, setEventName }) {
  return (
    <>
      <div className="section-header">
        <div className="section-header-row">
          <span className="section-pill">Step 1</span>
          <span className="section-title">Event Basics</span>
        </div>
        <p className="section-desc">What is your event about?</p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="event-name">
          Event Name <span className="required">*</span>
        </label>
        <input
          id="event-name"
          type="text"
          className="form-input"
          placeholder="Enter a clear, descriptive title"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          maxLength={60}
        />
        <div className="char-counter">{eventName.length} / 60</div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Event Category <span className="required">*</span>
        </label>
        <div className="type-grid">
          {EVENT_TYPES.map((type) => (
            <div
              key={type.id}
              className={`type-card ${activeType === type.id ? 'active' : ''}`}
              onClick={() => setActiveType(type.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveType(type.id)}
            >
              <div className="type-icon"><type.icon size={16} /></div>
              <div className="type-title">{type.label}</div>
              <div className="type-desc">{type.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="attendees">
          Expected Attendees <span className="required">*</span>
        </label>
        <div className="form-input-with-icon">
          <div className="icon"><Users size={18} /></div>
          <input id="attendees" type="number" className="form-input" placeholder="e.g. 50" min="1" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="event-desc">
          Description <span className="required">*</span>
        </label>
        <textarea id="event-desc" className="form-textarea" placeholder="Describe the agenda, target audience, and key takeaways..." maxLength={500}></textarea>
        <div className="char-counter">0 / 500</div>
      </div>
    </>
  );
}
