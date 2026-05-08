import s from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <div className={s.home}>
      <nav className={s.nav}>
        <Link to="/" className={s.logo}>
          Rishi<span>Sphere</span>
        </Link>

        <div className={s.page}>
          <Link to="/calendar" className={s.link}>
            Calendar
          </Link>
          <Link to="/coming-soon" className={s.link}>
            Events
          </Link>
          <Link to="/coming-soon" className={s.link}>
            About
          </Link>
        </div>

        <div className={s.auth}>
          <Link to="/signup" className={s.main}>
            Sign Up
          </Link>
          <Link to="/login" className={s.box}>
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
}
