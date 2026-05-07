import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-divider" />
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">Rishi<span>Sphere</span></div>
          <div className="footer-loc">Rishihood University, Sonipat</div>
        </div>
        <div className="footer-center">
          <Link to="/calendar" className="footer-link">Calendar</Link>
          <a href="#" className="footer-link">Explore</a>
          <Link to="/admin" className="footer-link">Admin Login</Link>
        </div>
        <div className="footer-right">
          <div className="footer-copy">© 2026 RishiSphere</div>
          <div className="footer-credit">Built for Rishihood</div>
        </div>
      </div>
    </footer>
  );
}
