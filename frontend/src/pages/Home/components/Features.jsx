import s from './Features.module.css';
import { Calendar, ShieldCheck, Award } from 'lucide-react';

export default function FeatureStrip() {
  return (
    <section className={s.box}>
      <div className={s.feature}>
        <div className={s.page}>
          <div className={s.num}>01</div>
          <div className={s.icon}>
            <Calendar size={28} />
          </div>
          <h3 className={s.title}>One calendar</h3>
          <p className={s.text}>
            Every event from every club and the university administration.
            No duplicates. No confusion.
          </p>
        </div>
        <div className={s.line} />
        <div className={s.page}>
          <div className={s.num}>02</div>
          <div className={s.icon}>
            <ShieldCheck size={28} />
          </div>
          <h3 className={s.title}>Zero conflicts</h3>
          <p className={s.text}>
            If two events clash, the system flags it before it is ever
            published on the main calendar.
          </p>
        </div>
        <div className={s.line} />
        <div className={s.page}>
          <div className={s.num}>03</div>
          <div className={s.icon}>
            <Award size={28} />
          </div>
          <h3 className={s.title}>Always yours</h3>
          <p className={s.text}>
            Enroll in one tap. Your beautifully designed certificate waits
            automatically at the end.
          </p>
        </div>
      </div>
    </section>
  );
}
