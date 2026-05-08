import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import './CalendarTopbar.css';

// view options
const VIEWS = ['Month', 'Week', 'Day'];

export default function CalendarTopbar({ label, onPrev, onNext, onToday }) {
  const [view, setView] = useState('Month');
  const [search, setSearch] = useState('');

  return (
    <div className="calendar-topbar">

      {/* view buttons */}
      <div className="view-toggles">
        {VIEWS.map(v => (
          <button
            key={v}
            type="button"
            className={`view-toggle${v === view ? ' active' : ''}`}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>

      {/* month navigation */}
      <div className="month-nav">
        <button type="button" className="nav-arrow" onClick={onPrev}>
          <ChevronLeft size={20} />
        </button>
        <span className="month-label">{label}</span>
        <button type="button" className="nav-arrow" onClick={onNext}>
          <ChevronRight size={20} />
        </button>
        <button type="button" className="today-pill" onClick={onToday}>
          Today
        </button>
      </div>

      {/* search box */}
      <div className="search-wrapper">
        <div className="search-icon"><Search size={16} /></div>
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

    </div>
  );
}
