import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { EVENT_TYPES, ROOMS } from '../../../shared/constants';
import './EventPreviewCard.css';

export default function EventPreviewCard({ selectedRoom, eventName, eventType, eventDate, startTime }) {
  const typeLabel = EVENT_TYPES.find(t => t.id === eventType)?.label || 'Workshop';
  const displayDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'TBD';
  const displayTime = startTime
    ? new Date(`1970-01-01T${startTime}`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
    : 'TBD';

  return (
    <div className="preview-card">
      <div className="preview-type-pill">{typeLabel}</div>
      <div className="preview-title">{eventName || 'Untitled Event'}</div>
      <div className="preview-organizer">
        <div className="preview-avatar">AM</div>
        <div className="preview-org-info">
          <span className="preview-org-label">Organized by</span>
          <span className="preview-org-name">Akshay Kumar</span>
        </div>
      </div>
      <div className="preview-meta-rows">
        <div className="preview-meta-row">
          <div className="preview-meta-icon"><Calendar size={14} /></div>
          <span>{displayDate}</span>
        </div>
        <div className="preview-meta-row">
          <div className="preview-meta-icon"><Clock size={14} /></div>
          <span>{displayTime}</span>
        </div>
        <div className="preview-meta-row">
          <div className="preview-meta-icon"><MapPin size={14} /></div>
          <span>{selectedRoom || 'Venue TBD'}</span>
        </div>
      </div>
      <div className="preview-status">Draft</div>
    </div>
  );
}
