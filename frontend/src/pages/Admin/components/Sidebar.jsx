import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileClock, Calendar as CalendarIcon, 
  Map, Settings, ArrowLeft, LogOut
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <h1 className="admin-brand-name">Admin Portal</h1>
        <div className="admin-brand-sub">RishiSphere</div>
      </div>

      <nav className="admin-nav">
        <Link to="/admin" className="admin-nav-item active">
          <LayoutDashboard size={18} /> Overview
        </Link>
        <a href="#" className="admin-nav-item">
          <FileClock size={18} /> Pending Approvals
        </a>
        <a href="#" className="admin-nav-item">
          <CalendarIcon size={18} /> Master Calendar
        </a>
        <a href="#" className="admin-nav-item">
          <Map size={18} /> Venues
        </a>
        <a href="#" className="admin-nav-item">
          <Settings size={18} /> Settings
        </a>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-profile">
          <div className="admin-avatar">{initials}</div>
          <div className="admin-info">
            <span className="admin-name">{user?.name || 'Admin'}</span>
            <span className="admin-role">{user?.enrollmentNumber || 'Administrator'}</span>
          </div>
        </div>

        <Link to="/calendar" className="admin-nav-item" style={{ marginTop: '12px', padding: '8px 10px' }}>
          <ArrowLeft size={16} /> Back to Calendar
        </Link>

        <button
          className="admin-nav-item admin-logout-btn"
          onClick={handleLogout}
          style={{ marginTop: '4px', padding: '8px 10px', width: '100%', border: 'none', cursor: 'pointer', background: 'none' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

