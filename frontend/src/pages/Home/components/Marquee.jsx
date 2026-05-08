import s from './Marquee.module.css';
import s2 from './Upcoming.module.css';

export default function MarqueeSection() {
  const renderText = () => (
    <>
      <span className={s.card}>Tech & AI Society</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Autumn Cultural Fest</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Open Mic Tonight</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Design Thinking</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Photography Club</span>
      <span className={s.top}>•</span>
    </>
  );

  return (
    <section className={s.main}>
      <div className={s2.sub} style={{ marginBottom: '60px' }}>
        <h2 className={s.title}>Campus <i>Stream</i></h2>
        <p className={s.home}>Live updates from clubs and societies.</p>
      </div>

      <div className={[s.scroll, s.small].join(' ')}>
        <div className={[s.page, s.text].join(' ')}>{renderText()}</div>
      </div>
    </section>
  );
}
