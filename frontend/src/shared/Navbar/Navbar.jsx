import { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // get first letters of name
  let initials = 'U';
  if (user?.name) {
    const parts = user.name.split(' ');
    initials = parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
  }

  // logout and go to login
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">RishiSphere</Link>

      <div className="nav-links">
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/coming-soon" className="nav-link">My Club</Link>
        <Link to="/coming-soon" className="nav-link">Explore</Link>
        <Link to="/coming-soon" className="nav-link">Certificates</Link>
      </div>

      <div className="nav-right">
        <button className="notification-bell" type="button">
          <span className="notification-dot" />
          <Bell size={20} />
        </button>

        {/* profile button + dropdown */}
        <div className="profile-wrapper">
          <button className="user-avatar" type="button" onClick={() => setOpen(!open)}>
            {initials}
          </button>

          {open && (
            <div className="profile-dropdown">
              {/* user info */}
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">{initials}</div>
                <div>
                  <div className="profile-dropdown-name">{user?.name}</div>
                  <div className="profile-dropdown-enroll">{user?.enrollmentNumber}</div>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              {/* admin link */}
              {user?.role === 'admin' && (
                <button className="profile-dropdown-item" onClick={() => { setOpen(false); navigate('/admin'); }}>
                  <LayoutDashboard size={15} /> Admin Dashboard
                </button>
              )}

              {/* logout */}
              <button className="profile-dropdown-item logout" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
