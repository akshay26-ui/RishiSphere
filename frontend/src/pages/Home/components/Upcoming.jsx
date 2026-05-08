import s from './Upcoming.module.css';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UpcomingSection() {
  return (
    <section className={s.event}>
      <div className={s.home} />
      <div className={s.page} />
      <div className={s.sub}>
        <h2 className={s.title}>Upcoming Events Highlights</h2>
        <p className={s.item}>The pulse of the campus, next.</p>
      </div>
      <div className={s.grid}>
        <div className={[s.top, s.main].join(' ')}>
          <div className={s.tag}><span>OCT</span> 24</div>
          <div>
            <div className={s.type}>Flagship Event</div>
            <h3 className={s.head}>TEDx Rishihood</h3>
            <p className={s.text}>
              Ideas worth spreading. Join us for a day of inspiring talks
              from industry leaders, visionaries, and our own student community.
            </p>
            <div className={s.row}>
              <span className={s.box}><MapPin size={16} /> Main Auditorium</span>
              <Link to="/calendar" className={s.btn}>RSVP Now</Link>
            </div>
          </div>
        </div>
        <div className={s.foot}>
          <div className={[s.top, s.card].join(' ')}>
            <div className={s.date}>
              <span className={s.month}>OCT</span>
              <span className={s.day}>28</span>
            </div>
            <div className={s.list}>
              <div className={s.type}>Workshop</div>
              <h4 className={s.col}>Intro to Web3</h4>
              <span className={s.time}><Clock size={14} /> 4:00 PM • Tech Society</span>
            </div>
          </div>
          <div className={[s.top, s.card].join(' ')}>
            <div className={s.date}>
              <span className={s.month}>NOV</span>
              <span className={s.day}>02</span>
            </div>
            <div className={s.list}>
              <div className={s.type}>Cultural</div>
              <h4 className={s.col}>Diwali Mela</h4>
              <span className={s.time}><Clock size={14} /> 6:00 PM • Open Ground</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
