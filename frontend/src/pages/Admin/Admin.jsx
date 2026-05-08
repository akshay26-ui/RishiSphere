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

  // show a message for 3 seconds
  function showToast(msg, type) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // load pending events on page open
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      // get events and rooms at the same time
      const eventsRes = await getEvents({ status: 'pending' });
      const roomsRes = await getRooms();

      // make a simple lookup: roomId -> roomName
      const roomList = Array.isArray(roomsRes) ? roomsRes : (roomsRes?.data || []);
      const roomNames = {};
      for (let r of roomList) {
        roomNames[r.id] = r.name;
      }

      // format events for the table
      const list = (eventsRes.data || []).map(ev => ({
        id: ev.id,
        name: ev.title,
        org: ev.organizerEnrollmentNumber,
        type: ev.type || 'Standard',
        date: new Date(ev.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        venue: roomNames[ev.roomId] || 'Unknown',
      }));

      setEvents(list);
    } catch (err) {
      console.log(err);
      showToast("Could not load events", "error");
    } finally {
      setLoading(false);
    }
  }

  // approve button click
  async function handleApprove(id) {
    try {
      await approveEvent(id);
      setEvents(events.filter(e => e.id !== id));
      showToast('Event approved!', 'success');
    } catch (err) {
      console.log(err);
      showToast('Could not approve event.', 'error');
    }
  }

  // reject button click
  async function handleReject(id) {
    const reason = window.prompt("Why are you rejecting this event?");
    if (!reason && reason !== '') return; // user hit cancel

    try {
      await rejectEvent(id, reason || "Rejected by admin");
      setEvents(events.filter(e => e.id !== id));
      showToast('Event rejected.', 'error');
    } catch (err) {
      console.log(err);
      showToast('Could not reject event.', 'error');
    }
  }

  return (
    <div className="admin-page">
      <Sidebar />

      <main className="admin-main">
        {/* toast message */}
        {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}

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
            <div className="empty-desc">Loading...</div>
          </div>
        ) : (
          <PendingApprovalsTable events={events} onApprove={handleApprove} onReject={handleReject} />
        )}

        <h2 className="section-title">Quick Actions</h2>
        <QuickActions />
      </main>
    </div>
  );
}
