import s from './Hero.module.css';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className={s.hero}>
      <div className={s.tag}>
        {/* Main headline */}
        <div className={s.input}>
          <div className={s.line}>Every moment</div>
          <div className={s.text}>of Rishihood</div>
          <div className={s.title}>
            in one place<span className={s.dot}>.</span>
          </div>
        </div>

        {/* Subtext - centered below headline */}
        <p className={s.form}>
          One shared calendar. Official events. Club events. Everything.
          For every student at Rishihood.
        </p>

        {/* CTA - centered, below subtext */}
        <div className={s.action}>
          <Link to="/calendar" className={s.join}>
            <div className={s.sub} />
            <div className={s.btn} />
            <div className={s.icon}>
              Explore <span className={s.grid}>→</span>
            </div>
          </Link>
        </div>
      </div>

      <div className={s.scroll} />
    </section>
  );
}
