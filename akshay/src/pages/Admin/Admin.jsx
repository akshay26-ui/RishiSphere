import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import PendingApprovalsTable from './components/PendingApprovalsTable';
import QuickActions from './components/QuickActions';
import { PENDING_EVENTS } from '../../shared/constants';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(PENDING_EVENTS);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event approved and published to calendar!', 'success');
  };

  const handleReject = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event rejected and organizer notified.', 'error');
  };

  return (
    <div className="admin-page">
      <Sidebar />

      <main className="admin-main">
        {toast && (
          <div className={`admin-toast ${toast.type}`}>
            {toast.msg}
          </div>
        )}

        <header className="admin-header">
          <div>
            <h1 className="admin-title">Dashboard Overview</h1>
            <p className="admin-subtitle">Welcome back. Here's what's happening on campus.</p>
          </div>
          <Link to="/submit-event" className="admin-btn-primary">
            <Plus size={16} /> New Event
          </Link>
        </header>

        <DashboardStats pendingCount={events.length} />

        <h2 className="section-title">
          Pending Approvals
          {events.length > 0 && <span className="section-badge">{events.length}</span>}
        </h2>
        <PendingApprovalsTable
          events={events}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        <h2 className="section-title">Quick Actions</h2>
        <QuickActions />
      </main>
    </div>
  );
}
