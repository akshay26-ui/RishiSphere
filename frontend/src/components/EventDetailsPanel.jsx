// /src/components/EventDetailsPanel.jsx
import { Calendar, Clock, MapPin, X } from "lucide-react";

export default function EventDetailsPanel({ event }) {
  return (
    <aside className="hidden w-[360px] shrink-0 border-l border-line bg-white xl:block">
      <div className="border-b border-line p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-rishi px-4 py-2 text-xs font-bold text-white">{event.type}</span>
          <X className="h-5 w-5 text-muted" />
        </div>
        <h2 className="mt-5 text-2xl font-extrabold leading-tight">{event.title}</h2>
        <p className="mt-4 text-sm leading-6 text-muted">{event.description}</p>
      </div>
      <div className="border-b border-line p-7">
        <p className="muted-label">Conducted By</p>
        <div className="mt-5 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-rishi text-sm font-bold text-white">SA</div>
          <div>
            <h3 className="font-bold">{event.host}</h3>
            <p className="text-xs text-muted">{event.hostMeta}</p>
          </div>
        </div>
      </div>
      <div className="space-y-5 border-b border-line p-7">
        <p className="muted-label">When</p>
        <div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-muted" />{event.date}</div>
        <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-muted" />{event.time}</div>
        <span className="ml-7 rounded-full bg-[#f6f7f7] px-4 py-2 text-xs font-bold">{event.duration}</span>
      </div>
      <div className="space-y-3 border-b border-line p-7">
        <p className="muted-label">Where</p>
        <div className="flex items-start gap-3 text-sm"><MapPin className="mt-0.5 h-4 w-4 text-muted" /><div><b>{event.venue}</b><p className="mt-2 text-xs text-muted">{event.venueMeta}</p></div></div>
      </div>
      <div className="p-7">
        <p className="text-sm font-bold">{event.seats} of {event.capacity} seats filled</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-rishi" style={{ width: `${(event.seats / event.capacity) * 100}%` }} />
        </div>
        <div className="mt-6 rounded-xl border-l-4 border-[#ef4444] bg-[#fff2ee] p-4 text-sm text-[#b94a42]">{event.conflict}</div>
        <button className="mt-6 h-12 w-full rounded-full border border-rishi text-sm font-bold text-rishi transition hover:bg-rishi hover:text-white">
          Enrolled ✓ · Tap to cancel
        </button>
      </div>
    </aside>
  );
}
