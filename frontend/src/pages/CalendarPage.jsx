// /src/pages/CalendarPage.jsx
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import CalendarGrid from "../components/CalendarGrid";
import EventDetailsPanel from "../components/EventDetailsPanel";
import Navbar from "../components/Navbar";
import { events, filters, myEvents } from "../data/mockData";

export default function CalendarPage() {
  const [activeEvent, setActiveEvent] = useState(events[0]);
  const [activeFilters, setActiveFilters] = useState(filters);
  const visibleEvents = useMemo(
    () => events.filter((event) => activeFilters.includes(event.type)),
    [activeFilters]
  );

  const toggleFilter = (filter) => {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  return (
    <div className="app-frame">
      <Navbar compact />
      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="hidden w-[300px] shrink-0 overflow-y-auto border-r border-line bg-[#f3f8f8] p-7 lg:block">
          <p className="muted-label mb-5">My Events</p>
          <div className="space-y-5">
            {myEvents.map((event) => (
              <article key={event.title} className="border-l-4 border-rishi pl-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold">{event.title}</h3>
                    <p className="text-xs text-muted">{event.date}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] text-muted">{event.status}</span>
                </div>
              </article>
            ))}
          </div>
          <button className="mt-5 text-sm font-bold text-rishi">See all →</button>

          <div className="card mt-12 p-5">
            <p className="text-sm text-muted">Have an event idea? Submit it for admin approval.</p>
            <a href="/submit-event" className="mt-4 block rounded-full border border-rishi py-3 text-center text-sm font-bold text-rishi hover:bg-rishi hover:text-white">Submit Event →</a>
          </div>

          <p className="muted-label mb-5 mt-12">Filter Events</p>
          <div className="space-y-4">
            {filters.map((filter) => (
              <label key={filter} className="flex cursor-pointer items-center justify-between text-sm">
                <span className="flex items-center gap-3"><i className="h-2 w-2 rounded-full bg-rishi" />{filter}</span>
                <input type="checkbox" checked={activeFilters.includes(filter)} onChange={() => toggleFilter(filter)} className="h-4 w-4 accent-rishi" />
              </label>
            ))}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex flex-col gap-4 border-b border-line p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex rounded-full border border-line bg-[#f7f8f8] p-1">
              {["Month", "Week", "Day"].map((view) => (
                <button key={view} className={`rounded-full px-6 py-2 text-sm font-bold ${view === "Month" ? "bg-rishi text-white" : "text-muted"}`}>{view}</button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-7">
              <ChevronLeft className="h-5 w-5 text-muted" />
              <h1 className="text-lg font-extrabold">May 2026</h1>
              <ChevronRight className="h-5 w-5 text-muted" />
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-rishi/20 px-5 py-2 text-sm font-bold text-rishi">Today</button>
              <label className="flex h-10 min-w-0 items-center gap-3 rounded-lg bg-[#f5f6f7] px-4 text-sm text-muted">
                <Search className="h-4 w-4" />
                <input className="w-full bg-transparent outline-none" placeholder="Search events..." />
              </label>
            </div>
          </div>
          <CalendarGrid events={visibleEvents} selectedId={activeEvent.id} onSelect={setActiveEvent} />
        </main>
        <EventDetailsPanel event={activeEvent} />
      </div>
    </div>
  );
}
