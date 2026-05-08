import { Check, X, Eye } from 'lucide-react';
import './PendingApprovalsTable.css';

// shows a table of all events waiting for approval
export default function PendingApprovalsTable({ events, onApprove, onReject }) {

  // no events waiting
  if (events.length === 0) {
    return (
      <div className="table-card empty-state">
        <div className="empty-icon">✓</div>
        <div className="empty-title">All caught up!</div>
        <div className="empty-desc">No events pending approval right now.</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event Details</th>
            <th>Type</th>
            <th>Proposed Date</th>
            <th>Requested Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>
                <div className="event-cell">
                  <span className="event-name">{ev.name}</span>
                  <span className="event-org">{ev.org}</span>
                </div>
              </td>
              <td><span className="type-badge">{ev.type}</span></td>
              <td className="date-cell">{ev.date}</td>
              <td className="venue-cell">{ev.venue}</td>
              <td>
                <div className="action-cell">
                  {/* approve button */}
                  <button className="action-btn approve" onClick={() => onApprove(ev.id)} title="Approve event">
                    <Check size={16} />
                  </button>
                  {/* reject button */}
                  <button className="action-btn reject" onClick={() => onReject(ev.id)} title="Reject event">
                    <X size={16} />
                  </button>
                  {/* view button */}
                  <button className="action-btn view" title="View details">
                    <Eye size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
