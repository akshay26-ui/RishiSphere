import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import PendingApprovalsTable from './components/PendingApprovalsTable';
import QuickActions from './components/QuickActions';
import { getEvents, approveEvent, rejectEvent } from '../../services/event.service';
import { getRooms } from '../../services/room.service';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [eventsRes, roomsRes] = await Promise.all([
          getEvents({ status: 'pending' }),
          getRooms()
        ]);
        
        const roomsMap = {};
        const roomsArray = Array.isArray(roomsRes) ? roomsRes : (roomsRes?.data || []);
        roomsArray.forEach(r => { roomsMap[r.id] = r.name; });

        const formattedEvents = (eventsRes.data || []).map(event => {
          const dateObj = new Date(event.startTime);
          return {
            id: event.id,
            name: event.title,
            org: event.organizerEnrollmentNumber,
            type: event.type || 'Standard',
            date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            venue: roomsMap[event.roomId] || 'Unknown Venue',
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        showToast("Failed to load pending events", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      showToast('Event approved and published to calendar!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to approve event.', 'error');
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt("Reason for rejection:");
    if (reason === null) return; // User cancelled

    try {
      await rejectEvent(id, reason || "Rejected by admin");
      setEvents(prev => prev.filter(e => e.id !== id));
      showToast('Event rejected and organizer notified.', 'error');
    } catch (error) {
      console.error(error);
      showToast('Failed to reject event.', 'error');
    }
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
        
        {loading ? (
            <div className="table-card empty-state">
              <div className="empty-desc">Loading pending events...</div>
            </div>
        ) : (
            <PendingApprovalsTable
              events={events}
              onApprove={handleApprove}
              onReject={handleReject}
            />
        )}

        <h2 className="section-title">Quick Actions</h2>
        <QuickActions />
      </main>
    </div>
  );
}
