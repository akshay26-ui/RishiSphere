import './Features.css';
import { Calendar, ShieldCheck, Award } from 'lucide-react';

export default function FeatureStrip() {
  return (
    <section className="diagonal-section">
      <div className="diagonal-content">
        <div className="feature-cluster">
          <div className="feature-number">01</div>
          <div className="feature-icon-wrapper">
            <Calendar size={28} />
          </div>
          <h3 className="feature-headline">One calendar</h3>
          <p className="feature-body">
            Every event from every club and the university administration.
            No duplicates. No confusion.
          </p>
        </div>
        <div className="feature-divider" />
        <div className="feature-cluster">
          <div className="feature-number">02</div>
          <div className="feature-icon-wrapper">
            <ShieldCheck size={28} />
          </div>
          <h3 className="feature-headline">Zero conflicts</h3>
          <p className="feature-body">
            If two events clash, the system flags it before it is ever
            published on the main calendar.
          </p>
        </div>
        <div className="feature-divider" />
        <div className="feature-cluster">
          <div className="feature-number">03</div>
          <div className="feature-icon-wrapper">
            <Award size={28} />
          </div>
          <h3 className="feature-headline">Always yours</h3>
          <p className="feature-body">
            Enroll in one tap. Your beautifully designed certificate waits
            automatically at the end.
          </p>
        </div>
      </div>
    </section>
  );
}
