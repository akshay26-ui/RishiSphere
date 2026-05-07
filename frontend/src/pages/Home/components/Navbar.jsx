import './Navbar.css';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <div className="landing-navbar-wrapper">
      <nav className="landing-navbar">
        <Link to="/" className="landing-logo">Rishi<span>Sphere</span></Link>

        <div className="landing-links">
          <Link to="/calendar" className="landing-link">Calendar</Link>
          <Link to="/coming-soon" className="landing-link">Events</Link>
          <Link to="/coming-soon" className="landing-link">About</Link>
        </div>

        <div className="landing-auth">
          <Link to="/signup" className="landing-signup">Sign Up</Link>
          <Link to="/login" className="landing-signin">Sign In</Link>
        </div>
      </nav>
    </div>
  );
}
