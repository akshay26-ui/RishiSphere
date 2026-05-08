import './Cta.css';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PremiumCtaSection() {
  return (
    <section className="premium-cta-section">
      <div className="light-orb light-orb-1">43 Clubs</div>
      <div className="light-orb light-orb-2">200+ Events</div>
      <div className="light-orb light-orb-3">0 Conflicts</div>

      <Link to="/signup" className="premium-cta-card">
        <div className="slab-overline">Join RishiSphere</div>
        <h2 className="slab-headline">Your campus awaits.</h2>
        <div className="slab-btn">
          Explore Events
          <ArrowRight size={18} />
        </div>
      </Link>
    </section>
  );
}
