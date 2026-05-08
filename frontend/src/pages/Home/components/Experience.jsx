import s from './Experience.module.css';
import { Users, Check, Shield } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section className={s.role}>
      <div className={s.foot} />
      <div className={s.item} />

      <div className={s.head}>
        <h2 className={s.title}>
          One platform.&nbsp;
          <div><i>Two experiences.</i></div>
        </h2>
        <p className={s.page}>Designed for both sides of the campus.</p>
      </div>

      <div className={s.main}>
        <div className={s.card}>
          <h3 className={s.row}>
            <div className={s.top}><Users size={20} /></div>
            For Students
          </h3>
          <ul className={s.list}>
            <li className={s.box}>
              <div className={s.icon}><Check size={12} /></div>
              <div className={s.text}>Discover upcoming events across all clubs</div>
            </li>
            <li className={s.box}>
              <div className={s.icon}><Check size={12} /></div>
              <div className={s.text}>Submit event proposals directly to the administration</div>
            </li>
            <li className={s.box}>
              <div className={s.icon}><Check size={12} /></div>
              <div className={s.text}>Secure your spot with one-tap registration</div>
            </li>
            <li className={s.box}>
              <div className={s.icon}><Check size={12} /></div>
              <div className={s.text}>Automatically receive attendance certificates</div>
            </li>
          </ul>
        </div>

        <div className={s.card}>
          <h3 className={s.row}>
            <div className={s.top} style={{ background: 'var(--text-main)' }}>
              <Shield size={20} />
            </div>
            For Admins
          </h3>
          <ul className={s.list}>
            <li className={s.box}>
              <div className={s.icon} style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className={s.text}>Review and approve student event submissions</div>
            </li>
            <li className={s.box}>
              <div className={s.icon} style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className={s.text}>Resolve venue and timing conflicts instantly</div>
            </li>
            <li className={s.box}>
              <div className={s.icon} style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className={s.text}>Maintain a clean, unified campus calendar</div>
            </li>
            <li className={s.box}>
              <div className={s.icon} style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className={s.text}>Issue certificates and track engagement data</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
