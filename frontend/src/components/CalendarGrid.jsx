// /src/components/CalendarGrid.jsx
const weeks = [
  [26, 27, 28, 29, 30, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
];

const colorMap = {
  rishi: "bg-rishi text-white shadow-lg shadow-rishi/20",
  dark: "bg-[#2f2f2f] text-white",
  peach: "bg-[#fff1ec] text-ink",
  outline: "border border-line bg-white text-muted",
};

export default function CalendarGrid({ events, selectedId, onSelect }) {
  return (
    <div className="grid flex-1 grid-cols-7 overflow-hidden border-t border-line">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
        <div key={day} className="border-b border-line py-4 text-center text-[11px] font-bold tracking-[0.18em] text-muted">
          {day}
        </div>
      ))}
      {weeks.flatMap((week, weekIndex) =>
        week.map((date, dayIndex) => {
          const isMuted = weekIndex === 0 && dayIndex < 5;
          const dayEvents = events.filter((event) => event.day === date);
          const isToday = date === 10 && weekIndex === 2;
          return (
            <div key={`${weekIndex}-${dayIndex}`} className={`min-h-[132px] border-b border-r border-line p-3 ${isToday ? "bg-rishi/5" : "bg-white/75"}`}>
              <div className={`mb-3 text-sm font-semibold ${isMuted ? "text-muted/35" : "text-ink/80"}`}>
                <span className={isToday ? "grid h-7 w-7 place-items-center rounded-full bg-rishi text-white" : ""}>{date}</span>
              </div>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onSelect(event)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs transition hover:-translate-y-0.5 ${colorMap[event.color]} ${
                      selectedId === event.id ? "ring-2 ring-rishi/30" : ""
                    }`}
                  >
                    <b className="block truncate">{selectedId === event.id ? "✓ " : ""}{event.short}</b>
                    <span className="truncate opacity-75">{event.venue}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
