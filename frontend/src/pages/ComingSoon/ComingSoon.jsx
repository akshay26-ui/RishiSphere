import Navbar from '../../shared/Navbar/Navbar';
import './ComingSoon.css';

export default function ComingSoon() {
  return (
    <div className="coming-soon-wrapper">
      <div className="cs-bg-wash-1"></div>
      <div className="cs-bg-wash-2"></div>

      <div className="cs-anim-nav">
        <Navbar />
      </div>

      <div className="cs-main-content">
        <div className="cs-anim-wordmark">
          <div className="cs-hero-wordmark">RISHISPHERE</div>
          <div className="cs-hero-line"></div>
        </div>

        <div className="cs-hero-coming cs-anim-coming">Coming</div>
        <div className="cs-hero-soon cs-anim-soon">Soon</div>

        <div className="cs-hero-divider cs-anim-divider"></div>

        <div className="cs-hero-tagline cs-anim-tagline">
          Your campus<span className="cs-tagline-period">.</span> Every event<span className="cs-tagline-period">.</span> One place<span className="cs-tagline-period">.</span>
        </div>

        <div className="cs-message-card cs-anim-card">
          <p className="cs-msg-p">
            We know what it feels like to miss an event because no one told you.
          </p>
          <p className="cs-msg-p">
            To show up to a room that changed at the last minute.
          </p>
          <p className="cs-msg-p">
            To do something great — and have nothing to show for it.
          </p>
          <p className="cs-msg-p">
            RishiSphere is being built so that{' '}
            <span className="cs-msg-highlight">
              no student at Rishihood ever feels left out of their own campus again.
            </span>
          </p>
          <p className="cs-msg-p">Every event. Every club. Every moment.</p>
          <p className="cs-msg-p">We are almost ready.</p>
          <div className="cs-signature-line"></div>
          <p className="cs-signature-text">— The RishiSphere Team</p>
        </div>

        <div className="cs-countdown-section cs-anim-countdown">
          <div className="cs-countdown-row">
            <div className="cs-cd-unit">
              <div className="cs-cd-num">14</div>
              <div className="cs-cd-lbl">DAYS</div>
            </div>
            <div className="cs-cd-div"></div>
            <div className="cs-cd-unit">
              <div className="cs-cd-num">08</div>
              <div className="cs-cd-lbl">HOURS</div>
            </div>
            <div className="cs-cd-div"></div>
            <div className="cs-cd-unit">
              <div className="cs-cd-num">32</div>
              <div className="cs-cd-lbl">MINUTES</div>
            </div>
            <div className="cs-cd-div"></div>
            <div className="cs-cd-unit">
              <div className="cs-cd-num">45</div>
              <div className="cs-cd-lbl">SECONDS</div>
            </div>
          </div>
          <div className="cs-cd-sub">We'll be live before you know it.</div>
        </div>

        <div className="cs-notify-wrapper cs-anim-input">
          <div className="cs-notify-pill">
            <div className="cs-notify-input-wrapper">
              <input 
                type="email" 
                className="cs-notify-input-text" 
                placeholder="Your university email" 
                aria-label="Email Address"
              />
            </div>
            <button className="cs-notify-btn" type="button">
              Notify Me
            </button>
          </div>
          <div className="cs-notify-sub">Only for @rishihood.edu.in emails.</div>
        </div>
      </div>

      <div className="cs-bottom-anchor cs-anim-anchor">
        RISHIHOOD UNIVERSITY · SONIPAT · 2026
      </div>
    </div>
  );
}
