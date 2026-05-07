import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Calendar', path: '/calendar' },
  { label: 'My Club', path: '/#' },
  { label: 'Explore', path: '/#' },
  { label: 'Certificates', path: '/#' },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>RishiSphere</Link>

      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="nav-link"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="nav-right">
        <button className="notification-bell" aria-label="Notifications" type="button">
          <span className="notification-dot" aria-hidden="true" />
          <Bell size={20} />
        </button>
        <button
          className="user-avatar"
          aria-label="User menu"
          type="button"
          onClick={() => navigate('/login')}
        >
          AM
        </button>
      </div>
    </nav>
  );
}
