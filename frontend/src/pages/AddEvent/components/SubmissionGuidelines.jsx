import { Check } from 'lucide-react';

export default function SubmissionGuidelines({ progress = 0, steps = [] }) {
  const labels = ['Basic Information', 'Date & Time', 'Venue Selected'];

  return (
    <>
      <div className="right-label">Submission Guidelines</div>
      <div className="guidelines-list">
        <div className="guideline-item">
          <div className="guideline-dot" />
          <div className="guideline-text">Events must be submitted at least 48 hours in advance.</div>
        </div>
        <div className="guideline-item">
          <div className="guideline-dot" />
          <div className="guideline-text">Venues are not confirmed until administration approval.</div>
        </div>
        <div className="guideline-item">
          <div className="guideline-dot" />
          <div className="guideline-text">All communications must use the official RishiSphere platform.</div>
        </div>
      </div>

      <div className="section-divider" style={{ margin: '24px 0' }} />

      <div className="right-label">Checklist</div>
      <div className="checklist-list">
        {labels.map((label, i) => (
          <div className="check-item" key={label}>
            <div className={`check-box ${steps[i] ? 'checked' : ''}`}>
              {steps[i] && <Check size={10} />}
            </div>
            <div className="check-text" style={{ color: steps[i] ? 'var(--text-main)' : 'var(--text-muted)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-text">{progress}% Complete</div>
    </>
  );
}
