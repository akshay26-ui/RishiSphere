import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import './CalendarTopbar.css';

const VIEWS = ['Month', 'Week', 'Day'];

export default function CalendarTopbar({ label, onPrev, onNext, onToday }) {
  const [activeView, setActiveView] = useState('Month');
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="calendar-topbar">
      <div className="view-toggles" role="group" aria-label="Calendar view">
        {VIEWS.map((view) => (
          <button
            key={view}
            className={`view-toggle${view === activeView ? ' active' : ''}`}
            onClick={() => setActiveView(view)}
            aria-pressed={view === activeView}
            type="button"
          >
            {view}
          </button>
        ))}
      </div>

      <div className="month-nav">
        <button className="nav-arrow" aria-label="Previous month" type="button" onClick={onPrev}>
          <ChevronLeft size={20} />
        </button>
        <span className="month-label">{label}</span>
        <button className="nav-arrow" aria-label="Next month" type="button" onClick={onNext}>
          <ChevronRight size={20} />
        </button>
        <button className="today-pill" type="button" onClick={onToday}>
          Today
        </button>
      </div>

      <div className="search-wrapper">
        <div className="search-icon" aria-hidden="true">
          <Search size={16} />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          aria-label="Search events"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
        />
      </div>
    </div>
  );
}
