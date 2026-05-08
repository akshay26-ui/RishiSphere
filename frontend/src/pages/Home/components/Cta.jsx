import s from './Cta.module.css';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PremiumCtaSection() {
  return (
    <section className={s.join}>
      <Link to="/signup" className={s.card}>
        <div className={s.line}>Join RishiSphere</div>
        <h2 className={s.title}>Your campus awaits.</h2>
        <div className={s.btn}>
          Explore Events
          <ArrowRight size={18} />
        </div>
      </Link>
    </section>
  );
}
