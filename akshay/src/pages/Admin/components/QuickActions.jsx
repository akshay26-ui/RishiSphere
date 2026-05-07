import { Download, FileText } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="quick-actions-grid">
      <div className="action-card">
        <div className="action-icon">
          <Download size={24} />
        </div>
        <div className="action-info">
          <div className="action-title">Export Calendar Data</div>
          <div className="action-desc">Download a CSV of all approved events for the current semester.</div>
        </div>
      </div>

      <div className="action-card">
        <div className="action-icon">
          <FileText size={24} />
        </div>
        <div className="action-info">
          <div className="action-title">View Audit Log</div>
          <div className="action-desc">See a history of all event approvals, rejections, and changes.</div>
        </div>
      </div>
    </div>
  );
}
