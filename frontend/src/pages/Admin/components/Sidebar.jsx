import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, FileClock, Calendar as CalendarIcon, 
  Map, Settings, ArrowLeft 
} from 'lucide-react';

export default function Sidebar() {
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
          <FileClock size={18} /> Pending Approvals <span className="badge">4</span>
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
          <div className="admin-avatar">AD</div>
          <div className="admin-info">
            <span className="admin-name">Admin User</span>
            <span className="admin-role">Super Admin</span>
          </div>
        </div>
        <Link to="/calendar" className="admin-nav-item" style={{ marginTop: '16px', padding: 0 }}>
          <ArrowLeft size={16} /> Back to Calendar
        </Link>
      </div>
    </aside>
  );
}
