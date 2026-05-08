import './Experience.css';
import { Users, Check, Shield } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section className="experience-section">
      <div className="exp-bg-shape-1" />
      <div className="exp-bg-shape-2" />

      <div className="exp-header">
        <h2 className="exp-title">
          One platform.&nbsp;
          <div><i>Two experiences.</i></div>
        </h2>
        <p className="exp-subtitle">Designed for both sides of the campus.</p>
      </div>

      <div className="exp-layout">
        <div className="exp-card students">
          <h3 className="exp-role-title">
            <div className="exp-role-icon"><Users size={20} /></div>
            For Students
          </h3>
          <ul className="exp-list">
            <li className="exp-item">
              <div className="exp-item-icon"><Check size={12} /></div>
              <div className="exp-item-text">Discover upcoming events across all clubs</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon"><Check size={12} /></div>
              <div className="exp-item-text">Submit event proposals directly to the administration</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon"><Check size={12} /></div>
              <div className="exp-item-text">Secure your spot with one-tap registration</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon"><Check size={12} /></div>
              <div className="exp-item-text">Automatically receive attendance certificates</div>
            </li>
          </ul>
        </div>

        <div className="exp-card admins">
          <h3 className="exp-role-title">
            <div className="exp-role-icon" style={{ background: 'var(--text-main)' }}>
              <Shield size={20} />
            </div>
            For Admins
          </h3>
          <ul className="exp-list">
            <li className="exp-item">
              <div className="exp-item-icon" style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className="exp-item-text">Review and approve student event submissions</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon" style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className="exp-item-text">Resolve venue and timing conflicts instantly</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon" style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className="exp-item-text">Maintain a clean, unified campus calendar</div>
            </li>
            <li className="exp-item">
              <div className="exp-item-icon" style={{ color: 'var(--text-main)', background: 'rgba(0, 0, 0, 0.05)' }}>
                <Check size={12} />
              </div>
              <div className="exp-item-text">Issue certificates and track engagement data</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
