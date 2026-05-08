import './DashboardStats.css';
import { FileClock, Activity, Check, TrendingUp, Calendar as CalIcon, Users } from 'lucide-react';

// shows 4 stat cards at the top of admin dashboard
export default function DashboardStats({ pendingCount = 4 }) {
  return (
    <div className="stats-grid">

      {/* pending approvals */}
      <div className="stat-card highlight">
        <div className="stat-header">
          <span className="stat-title">Pending Approvals</span>
          <div className="stat-icon"><FileClock size={18} /></div>
        </div>
        <div className="stat-value">{pendingCount}</div>
        <div className="stat-change negative">
          <Activity size={12} /> {pendingCount > 0 ? 'Requires action' : 'All clear!'}
        </div>
      </div>

      {/* approved this month */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Approved This Month</span>
          <div className="stat-icon"><Check size={18} /></div>
        </div>
        <div className="stat-value">{28 + (4 - pendingCount)}</div>
        <div className="stat-change">
          <TrendingUp size={12} /> +12% from last month
        </div>
      </div>

      {/* total active events */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Total Active Events</span>
          <div className="stat-icon"><CalIcon size={18} /></div>
        </div>
        <div className="stat-value">47</div>
        <div className="stat-change">
          <TrendingUp size={12} /> Across 5 categories
        </div>
      </div>

      {/* active clubs */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Active Clubs</span>
          <div className="stat-icon"><Users size={18} /></div>
        </div>
        <div className="stat-value">43</div>
        <div className="stat-change">
          <TrendingUp size={12} /> 2 new this semester
        </div>
      </div>

    </div>
  );
}
