import s from './Pulse.module.css';
export default function PulseSection() {
  return (
    <section className={s.pulse}>
      <div className={s.progress}>
        <div className={s.fill} />
      </div>

      <div className={s.card} />

      <div className={s.foot}>
        <svg viewBox="0 0 600 600" className={s.item}>
          <circle cx="300" cy="300" r="298" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <circle cx="300" cy="300" r="298" className={s.head} stroke="rgba(177,0,53,1)" strokeDashoffset="0" />
          <circle cx="300" cy="300" r="298" className={s.head} stroke="rgba(177,0,53,0.8)" strokeDashoffset="-376.9" />
          <circle cx="300" cy="300" r="298" className={s.head} stroke="rgba(177,0,53,0.6)" strokeDashoffset="-753.9" />
          <circle cx="300" cy="300" r="298" className={s.head} stroke="rgba(177,0,53,0.4)" strokeDashoffset="-1130.9" />
          <circle cx="300" cy="300" r="298" className={s.head} stroke="rgba(177,0,53,0.2)" strokeDashoffset="-1507.9" />
        </svg>

        <div className={s.mid}>
          <div className={s.num}>243</div>
          <div className={s.label}>Events This Year</div>
        </div>

        <div className={[s.tag, s.home].join(' ')}>
          <div className={s.dot} />
          <div className={s.title}>Official Events</div>
          <div className={s.list}>47</div>
        </div>
        <div className={[s.tag, s.page].join(' ')}>
          <div className={s.dot} />
          <div className={s.title}>Club Events</div>
          <div className={s.list}>89</div>
        </div>
        <div className={[s.tag, s.box].join(' ')}>
          <div className={s.dot} />
          <div className={s.title}>Workshops</div>
          <div className={s.list}>34</div>
        </div>
        <div className={[s.tag, s.main].join(' ')}>
          <div className={s.dot} />
          <div className={s.title}>Guest Talks</div>
          <div className={s.list}>21</div>
        </div>
        <div className={[s.tag, s.top].join(' ')}>
          <div className={s.dot} />
          <div className={s.title}>Cultural</div>
          <div className={s.list}>52</div>
        </div>
      </div>
    </section>
  );
}
