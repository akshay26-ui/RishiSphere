import s from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={s.foot}>
      <div className={s.head} />
      <div className={s.page}>
        <div className={s.top}>
          <div className={s.item}>Rishi<span>Sphere</span></div>
          <div className={s.box}>Rishihood University, Sonipat</div>
        </div>
        <div className={s.row}>
          <Link to="/calendar" className={s.card}>Calendar</Link>
          <a href="#" className={s.card}>Explore</a>
          <Link to="/admin" className={s.card}>Admin Login</Link>
        </div>
        <div className={s.list}>
          <div className={s.main}>© 2026 RishiSphere</div>
          <div className={s.col}>Built for Rishihood</div>
        </div>
      </div>
    </footer>
  );
}
