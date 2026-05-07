import { useState } from 'react';
import { Search, X, Tag as TagIcon } from 'lucide-react';
import './DetailsForm.css';

export default function DetailsForm({ cert, setCert }) {
  return (
    <>
      <div className="section-header">
        <div className="section-header-row">
          <span className="section-pill">Step 4</span>
          <span className="section-title">Additional Details</span>
        </div>
        <p className="section-desc">Final touches for the administration to review.</p>
      </div>

      <div className="form-group">
        <label className="form-label">
          Reason for event <span className="optional">(Internal Note)</span>
        </label>
        <textarea className="form-textarea" style={{ minHeight: '80px' }} placeholder="Briefly explain why this event is valuable to the community..."></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">
          Co-Organizers <span className="optional">(Optional)</span>
        </label>
        <div className="form-input-with-icon">
          <div className="icon">
            <Search size={18} />
          </div>
          <input type="text" className="form-input" placeholder="Search for users or clubs" />
        </div>
        <div className="tag-item">
          Design Society <span className="tag-close"><X size={14} /></span>
        </div>
      </div>

      <div className="form-group">
        <div className="toggle-row">
          <div>
            <div className="toggle-label dark">Issue Certificates</div>
            <div className="helper-text" style={{ marginTop: '2px' }}>Automatically send certificates to attendees</div>
          </div>
          <button 
            type="button" 
            className={`toggle-switch ${cert ? 'on' : 'off'}`}
            onClick={() => setCert(!cert)}
            aria-label="Toggle certificates"
          />
        </div>
      </div>
    </>
  );
}
