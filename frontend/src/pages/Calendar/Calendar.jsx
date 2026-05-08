import { useState, useEffect } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Sidebar from '../../shared/Sidebar/Sidebar';
import CalendarTopbar from './components/CalendarTopbar/CalendarTopbar';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import EventDetailPanel from './components/EventDetailPanel/EventDetailPanel';
import { EVENT_CATEGORIES } from './calendarData';
import { getEvents } from '../../services/event.service';
import { getRooms } from '../../services/room.service';
import './Calendar.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// build grid cells using real JS Date (no hardcoded lookup tables)
function buildCells(month, year, selectedDay) {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // first day of this month (0=Sun)
  const firstDay = new Date(year, month, 1).getDay();
  // total days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // days in previous month (for the leading grey cells)
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // leading cells from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, outsideMonth: true, past: true, today: false, selected: false });
  }

  // this month's days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === todayDay && month === todayMonth && year === todayYear;

    // past = before today's date
    const cellDate = new Date(year, month, d);
    const todayDate = new Date(todayYear, todayMonth, todayDay);
    const isPast = cellDate < todayDate;

    cells.push({
      day: d,
      outsideMonth: false,
      past: isPast,
      today: isToday,
      selected: d === selectedDay,
    });
  }

  // trailing cells to fill up to 35
  const left = 35 - cells.length;
  for (let d = 1; d <= left; d++) {
    cells.push({ day: d, outsideMonth: true, past: false, today: false, selected: false });
  }

  return cells;
}

export default function Calendar() {
  // start on actual current month/year
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState({});
  const [roomNames, setRoomNames] = useState({});

  // filter states for sidebar
  const [selectedRooms, setSelectedRooms] = useState(new Set());
  const [activeCategories, setActiveCategories] = useState(
    new Set(EVENT_CATEGORIES.map(c => c.id))
  );

  // load events when month changes
  useEffect(() => {
    loadEvents();
  }, [month, year]);

  async function loadEvents() {
    try {
      // get rooms first to build a name lookup
      const roomsRes = await getRooms();
      const roomList = roomsRes.data || [];
      const names = {};
      for (let r of roomList) {
        names[r.id] = r.name;
      }
      setRoomNames(names);

      // get approved events for this month
      const start = new Date(year, month, 1).toISOString();
      const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
      const res = await getEvents({ startDate: start, endDate: end, status: 'approved' });

      // group events by day number
      const grouped = {};
      for (let ev of (res.data || [])) {
        const day = new Date(ev.startTime).getDate();
        if (!grouped[day]) grouped[day] = [];

        const room = names[ev.roomId] || 'Unknown Room';
        const startStr = new Date(ev.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endStr = new Date(ev.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const hours = Math.round((new Date(ev.endTime) - new Date(ev.startTime)) / 3600000);

        grouped[day].push({
          ...ev,
          room,
          category: ev.type || 'official',
          badge: ev.type ? ev.type.charAt(0).toUpperCase() + ev.type.slice(1) + ' Event' : 'Official Event',
          shortDesc: ev.description || 'No description available.',
          time: `${startStr} — ${endStr}`,
          date: new Date(ev.startTime).toLocaleDateString(),
          duration: `${hours} hours`,
          organizer: { name: ev.organizerEnrollmentNumber, initials: 'RU', role: 'Organizer' },
          venue: { room, detail: 'Rishihood University', block: 'Campus', floor: 'Main', roomLabel: room },
          tags: [],
          speakers: [],
          enrollment: { filled: 0, total: 100, percent: 0 },
        });
      }

      setEventsData(grouped);
    } catch (err) {
      console.log('Error loading calendar data:', err);
    }
  }

  // go to previous month
  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDay(null);
    setSelectedEvent(null);
  }

  // go to next month
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDay(null);
    setSelectedEvent(null);
  }

  // jump back to today
  function goToToday() {
    const t = new Date();
    setMonth(t.getMonth());
    setYear(t.getFullYear());
    setSelectedDay(t.getDate());
    setSelectedEvent(eventsData[t.getDate()]?.[0] ?? null);
  }

  // day click
  function clickDay(day, isOutside) {
    if (isOutside) return;
    setSelectedDay(day);
    setSelectedEvent(null);
  }

  // event click
  function clickEvent(event) {
    setSelectedDay(null);
    setSelectedEvent(event);
  }

  const cells = buildCells(month, year, selectedDay);
  const label = `${MONTHS[month]} ${year}`;
  const panelOpen = selectedEvent !== null || selectedDay !== null;
  const dayEvents = selectedDay !== null ? (eventsData[selectedDay] || []) : [];

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
            onDayClick={clickDay}
            onEventClick={clickEvent}
            selectedEventId={selectedEvent?.id}
            selectedRooms={selectedRooms}
            activeCategories={activeCategories}
            eventsData={eventsData}
          />
        </div>
        {panelOpen && (
          <EventDetailPanel
            event={selectedEvent}
            day={selectedDay}
            dayEvents={dayEvents}
            onClose={() => { setSelectedDay(null); setSelectedEvent(null); }}
            onEventSelect={clickEvent}
          />
        )}
      </main>
    </div>
  );
}
