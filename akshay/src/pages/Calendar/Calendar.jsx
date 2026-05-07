import { useState } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Sidebar from '../../shared/Sidebar/Sidebar';
import CalendarTopbar from './components/CalendarTopbar/CalendarTopbar';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import EventDetailPanel from './components/EventDetailPanel/EventDetailPanel';
import { CALENDAR_EVENTS, MONTH_START_DAY, MONTH_DAYS } from './calendarData';
import './Calendar.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function generateCells(month, year, selectedDay) {
  const startDay = MONTH_START_DAY[month] ?? 0;
  const daysInMonth = MONTH_DAYS[month] ?? 30;
  const prevMonthDays = MONTH_DAYS[(month + 11) % 12] ?? 30;
  const cells = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, outsideMonth: true, past: false, today: false, selected: false });
  }
  const today = month === 4 && year === 2026 ? 10 : -1;
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d, outsideMonth: false,
      past: month === 4 && year === 2026 ? d < 10 : false,
      today: d === today,
      selected: d === selectedDay,
    });
  }
  const remaining = 35 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, outsideMonth: true, past: false, today: false, selected: false });
  }
  return cells;
}

export default function Calendar() {
  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedEvent, setSelectedEvent] = useState(CALENDAR_EVENTS[10]?.[0] ?? null);

  // Venue filter: set of selected room IDs (null = no filter active = show all)
  const [selectedRooms, setSelectedRooms] = useState(new Set());
  // Category filter: set of active category IDs
  const [activeCategories, setActiveCategories] = useState(
    new Set(['official', 'club', 'workshop', 'guest', 'cultural'])
  );

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null); setSelectedEvent(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null); setSelectedEvent(null);
  };

  const goToToday = () => {
    setMonth(4); setYear(2026); setSelectedDay(10);
    setSelectedEvent(CALENDAR_EVENTS[10]?.[0] ?? null);
  };

  const handleDayClick = (day, isOutside) => {
    if (isOutside) return;
    setSelectedDay(day);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedDay(null);
    setSelectedEvent(event);
  };

  const cells = generateCells(month, year, selectedDay);
  const label = `${MONTHS[month]} ${year}`;
  const panelOpen = selectedEvent !== null || selectedDay !== null;
  const dayEvents = selectedDay !== null ? (CALENDAR_EVENTS[selectedDay] || []) : [];

  return (
    <div className="calendar-page">
      <Navbar />
      <main className="calendar-main-content">
        <Sidebar
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
        />
        <div className="calendar-wrapper">
          <CalendarTopbar label={label} onPrev={prevMonth} onNext={nextMonth} onToday={goToToday} />
          <CalendarGrid
            cells={cells}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            selectedEventId={selectedEvent?.id}
            selectedRooms={selectedRooms}
            activeCategories={activeCategories}
          />
        </div>
        {panelOpen && (
          <EventDetailPanel
            event={selectedEvent}
            day={selectedDay}
            dayEvents={dayEvents}
            onClose={() => { setSelectedDay(null); setSelectedEvent(null); }}
            onEventSelect={handleEventClick}
          />
        )}
      </main>
    </div>
  );
}
