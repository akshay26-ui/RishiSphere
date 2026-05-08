import './Pulse.css';
export default function PulseSection() {
  return (
    <section className="pulse-section">
      <div className="scroll-progress">
        <div className="scroll-progress-fill" />
      </div>

      <div className="pulse-glow" />

      <div className="pulse-container">
        <svg viewBox="0 0 600 600" className="pulse-circle-svg">
          <circle cx="300" cy="300" r="298" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <circle cx="300" cy="300" r="298" className="pulse-arc" stroke="rgba(177,0,53,1)" strokeDashoffset="0" />
          <circle cx="300" cy="300" r="298" className="pulse-arc" stroke="rgba(177,0,53,0.8)" strokeDashoffset="-376.9" />
          <circle cx="300" cy="300" r="298" className="pulse-arc" stroke="rgba(177,0,53,0.6)" strokeDashoffset="-753.9" />
          <circle cx="300" cy="300" r="298" className="pulse-arc" stroke="rgba(177,0,53,0.4)" strokeDashoffset="-1130.9" />
          <circle cx="300" cy="300" r="298" className="pulse-arc" stroke="rgba(177,0,53,0.2)" strokeDashoffset="-1507.9" />
        </svg>

        <div className="pulse-center">
          <div className="pulse-count-total">243</div>
          <div className="pulse-count-label">Events This Year</div>
        </div>

        <div className="pulse-label pos-1">
          <div className="pulse-dot" />
          <div className="pulse-label-title">Official Events</div>
          <div className="pulse-label-count">47</div>
        </div>
        <div className="pulse-label pos-2">
          <div className="pulse-dot" />
          <div className="pulse-label-title">Club Events</div>
          <div className="pulse-label-count">89</div>
        </div>
        <div className="pulse-label pos-3">
          <div className="pulse-dot" />
          <div className="pulse-label-title">Workshops</div>
          <div className="pulse-label-count">34</div>
        </div>
        <div className="pulse-label pos-4">
          <div className="pulse-dot" />
          <div className="pulse-label-title">Guest Talks</div>
          <div className="pulse-label-count">21</div>
        </div>
        <div className="pulse-label pos-5">
          <div className="pulse-dot" />
          <div className="pulse-label-title">Cultural</div>
          <div className="pulse-label-count">52</div>
        </div>
      </div>
    </section>
  );
}
