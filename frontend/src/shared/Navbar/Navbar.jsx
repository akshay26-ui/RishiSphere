import { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Calendar', path: '/calendar' },
  { label: 'My Club', path: '/coming-soon' },
  { label: 'Explore', path: '/coming-soon' },
  { label: 'Certificates', path: '/coming-soon' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAdmin = user?.role === 'admin';

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>RishiSphere</Link>

      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} to={item.path} className="nav-link">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="nav-right">
        <button className="notification-bell" aria-label="Notifications" type="button">
          <span className="notification-dot" aria-hidden="true" />
          <Bell size={20} />
        </button>

        <div className="profile-wrapper" ref={dropdownRef}>
          <button
            className="user-avatar"
            aria-label="User menu"
            type="button"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            {initials}
          </button>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">{initials}</div>
                <div>
                  <div className="profile-dropdown-name">{user?.name || 'User'}</div>
                  <div className="profile-dropdown-enroll">{user?.enrollmentNumber || ''}</div>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              {isAdmin && (
                <button
                  className="profile-dropdown-item"
                  onClick={() => { setDropdownOpen(false); navigate('/admin'); }}
                >
                  <LayoutDashboard size={15} />
                  Admin Dashboard
                </button>
              )}

              <button className="profile-dropdown-item logout" onClick={handleLogout}>
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

