import './Marquee.css';

export default function MarqueeSection() {
  const renderText = () => (
    <>
      <span className="marquee-text-item">Tech & AI Society</span>
      <span className="marquee-text-dot">•</span>
      <span className="marquee-text-item">Autumn Cultural Fest</span>
      <span className="marquee-text-dot">•</span>
      <span className="marquee-text-item">Open Mic Tonight</span>
      <span className="marquee-text-dot">•</span>
      <span className="marquee-text-item">Design Thinking</span>
      <span className="marquee-text-dot">•</span>
      <span className="marquee-text-item">Photography Club</span>
      <span className="marquee-text-dot">•</span>
    </>
  );

  return (
    <section className="marquee-section">
      <div className="section-header" style={{ marginBottom: '60px' }}>
        <h2 className="section-title">Campus <i>Stream</i></h2>
        <p className="section-subtitle">Live updates from clubs and societies.</p>
      </div>

      <div className="marquee-wrapper minimal">
        <div className="marquee-content text-only">{renderText()}</div>
        <div className="marquee-content text-only" aria-hidden="true">{renderText()}</div>
      </div>
    </section>
  );
}
