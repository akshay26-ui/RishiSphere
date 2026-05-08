import { useState, useEffect } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Sidebar from '../../shared/Sidebar/Sidebar';
import CalendarTopbar from './components/CalendarTopbar/CalendarTopbar';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import EventDetailPanel from './components/EventDetailPanel/EventDetailPanel';
import { MONTH_START_DAY, MONTH_DAYS } from './calendarData';
import { getEvents } from '../../services/event.service';
import { getRooms } from '../../services/room.service';
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState({});
  const [roomsMap, setRoomsMap] = useState({});

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const roomsRes = await getRooms();
        const rMap = {};
        if (roomsRes.data) {
          roomsRes.data.forEach(r => { rMap[r.id] = r.name; });
        }
        setRoomsMap(rMap);

        const startDate = new Date(year, month, 1).toISOString();
        const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
        
        const res = await getEvents({ startDate, endDate, status: 'approved' });
        
        const newEventsData = {};
        if (res.data) {
          res.data.forEach(evt => {
            const day = new Date(evt.startTime).getDate();
            if (!newEventsData[day]) newEventsData[day] = [];
            
            const roomName = rMap[evt.roomId] || 'Unknown Room';
            
            newEventsData[day].push({
              ...evt,
              room: roomName,
              category: evt.type || 'official',
              badge: evt.type ? (evt.type.charAt(0).toUpperCase() + evt.type.slice(1) + ' Event') : 'Official Event',
              shortDesc: evt.description || 'No description available.',
              time: new Date(evt.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' — ' + new Date(evt.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              date: new Date(evt.startTime).toLocaleDateString(),
              duration: `${Math.round((new Date(evt.endTime) - new Date(evt.startTime)) / 3600000)} hours`,
              organizer: { name: evt.organizerEnrollmentNumber, initials: 'RU', role: 'Organizer' },
              venue: { room: roomName, detail: 'Rishihood University', block: 'Campus', floor: 'Main', roomLabel: roomName },
              tags: [],
              speakers: [],
              enrollment: { filled: 0, total: 100, percent: 0 },
            });
          });
        }
        setEventsData(newEventsData);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
      }
    };
    fetchCalendarData();
  }, [month, year]);

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
    setSelectedEvent(eventsData[10]?.[0] ?? null);
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
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
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
            onEventSelect={handleEventClick}
          />
        )}
      </main>
    </div>
  );
}
