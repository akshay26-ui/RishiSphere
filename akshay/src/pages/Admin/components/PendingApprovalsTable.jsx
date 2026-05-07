import { Check, X, Eye } from 'lucide-react';

export default function PendingApprovalsTable({ events, onApprove, onReject }) {
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
          {events.map(event => (
            <tr key={event.id}>
              <td>
                <div className="event-cell">
                  <span className="event-name">{event.name}</span>
                  <span className="event-org">{event.org}</span>
                </div>
              </td>
              <td><span className="type-badge">{event.type}</span></td>
              <td className="date-cell">{event.date}</td>
              <td className="venue-cell">{event.venue}</td>
              <td>
                <div className="action-cell">
                  <button
                    className="action-btn approve"
                    aria-label="Approve"
                    onClick={() => onApprove(event.id)}
                    title="Approve event"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="action-btn reject"
                    aria-label="Reject"
                    onClick={() => onReject(event.id)}
                    title="Reject event"
                  >
                    <X size={16} />
                  </button>
                  <button
                    className="action-btn view"
                    aria-label="View Details"
                    title="View details"
                  >
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
