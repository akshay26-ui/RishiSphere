import './Hero.css';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="ambient-orb orb-bg-1" />
      <div className="ambient-orb orb-bg-2" />
      <div className="ambient-orb orb-bg-3" />

      <div className="event-orb orb-w">Workshop</div>
      <div className="event-orb orb-t">Talk</div>
      <div className="event-orb orb-c">Cultural</div>
      <div className="event-orb orb-h">Hackathon</div>
      <div className="event-orb orb-s">Social</div>
      <div className="event-orb orb-g">Guest Lecture</div>
      <div className="event-orb orb-o">Open Mic</div>
      <div className="event-orb orb-f">Fest</div>

      <div className="hero-content">
        {/* Main headline */}
        <div className="kinetic-headline">
          <div className="line-1">Every moment</div>
          <div className="line-2">of Rishihood</div>
          <div className="line-3">
            in one place<span className="crimson-period">.</span>
          </div>
        </div>

        {/* Subtext — centered below headline */}
        <p className="hero-subtext">
          One shared calendar. Official events. Club events. Everything.
          For every student at Rishihood.
        </p>

        {/* CTA — centered, below subtext */}
        <div className="hero-cta-row">
          <Link to="/calendar" className="cta-orbit">
            <div className="cta-orbit-ring" />
            <div className="cta-orbit-bg" />
            <div className="cta-orbit-text">
              Explore <span className="cta-arrow">→</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="scroll-indicator" />
    </section>
  );
}
