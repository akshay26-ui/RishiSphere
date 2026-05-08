import s from './Marquee.module.css';
import s2 from './Upcoming.module.css';

export default function MarqueeSection() {
  const renderText = () => (
    <>
      <span className={s.card}>Damru fest</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Neutron Fest</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Datacron Fest</span>
      <span className={s.top}>•</span>
      <span className={s.card}>Psyphoria</span>
      <span className={s.top}>•</span>
      <span className={s.card}>DesisnX</span>
      <span className={s.top}>•</span>
    </>
  );

  return (
    <section className={s.main}>
      <div className={s2.sub} style={{ marginBottom: '60px' }}>
        <h2 className={s.title}>Campus <i>Events</i></h2>
        <p className={s.home}>Live updates from clubs and societies.</p>
      </div>

      <div className={[s.scroll, s.small].join(' ')}>
        <div className={[s.page, s.text].join(' ')}>{renderText()}</div>
      </div>
    </section>
  );
}
