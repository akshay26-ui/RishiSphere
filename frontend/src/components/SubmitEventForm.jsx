// /src/components/SubmitEventForm.jsx
import { Calendar, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { useState } from "react";
import { eventTypes } from "../data/mockData";

export default function SubmitEventForm() {
  const [type, setType] = useState("Workshop");
  const [recurring, setRecurring] = useState(false);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <form className="space-y-10">
        <section className="space-y-5">
          <p className="muted-label">01 &nbsp; Event Basics</p>
          <input className="form-field" defaultValue="Design Thinking Bootcamp" />
          <div className="grid gap-4 sm:grid-cols-2">
            {eventTypes.map((item) => {
              const Icon = item.icon;
              const active = item.label === type;
              return (
                <button key={item.label} type="button" onClick={() => setType(item.label)} className={`rounded-xl border p-5 text-left transition ${active ? "border-rishi bg-rishi-soft text-rishi" : "border-line bg-white hover:border-rishi/30"}`}>
                  <Icon className="mb-3 h-5 w-5" />
                  <b className="block text-sm">{item.label}</b>
                  <span className="text-xs text-muted">{item.note}</span>
                </button>
              );
            })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="form-field" defaultValue="20" aria-label="Expected attendees" />
            <input className="form-field" defaultValue="60" aria-label="Capacity" />
          </div>
          <textarea className="min-h-28 w-full rounded-xl border border-line p-4 text-sm outline-none focus:border-rishi focus:ring-4 focus:ring-rishi/10" placeholder="Describe what will happen at this event, who it is for, and what attendees will gain." />
        </section>

        <section className="space-y-5">
          <p className="muted-label">02 &nbsp; Date & Time</p>
          <input className="form-field" defaultValue="May 10, 2026" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="form-field" defaultValue="10:00 AM" />
            <input className="form-field" defaultValue="1:00 PM" />
          </div>
          <div className="rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white">This time slot is available.</div>
          <label className="flex items-center justify-between text-sm text-muted">
            Recurring Event
            <button type="button" onClick={() => setRecurring((value) => !value)} className={`h-6 w-11 rounded-full p-1 transition ${recurring ? "bg-rishi" : "bg-slate-300"}`}>
              <span className={`block h-4 w-4 rounded-full bg-white transition ${recurring ? "translate-x-5" : ""}`} />
            </button>
          </label>
        </section>

        <section className="space-y-5">
          <p className="muted-label">03 &nbsp; Venue</p>
          <div className="grid grid-cols-3 gap-3">
            {["Block A", "Block C", "Other Venue"].map((block) => (
              <button key={block} type="button" className={`h-11 rounded-xl border text-sm font-bold ${block === "Block A" ? "border-rishi bg-rishi text-white" : "border-line bg-white"}`}>{block}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["A-401", "A-402", "A-403", "A-404", "A-406", "A-407", "A-408", "A-409", "A-410", "A-411"].map((room) => (
              <button key={room} type="button" className={`rounded-full border px-4 py-2 text-xs font-bold ${room === "A-401" ? "border-rishi bg-rishi text-white" : "border-line bg-white text-muted"}`}>{room}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 rounded-xl border border-line bg-white p-4 text-sm">
            <span><b className="block text-xs text-muted">Block</b>Block A</span>
            <span><b className="block text-xs text-muted">Floor</b>4th Floor</span>
            <span><b className="block text-xs text-muted">Room</b><em className="not-italic text-rishi">A-401</em></span>
          </div>
        </section>

        <section className="space-y-5">
          <p className="muted-label">04 &nbsp; Additional Details</p>
          <textarea className="min-h-24 w-full rounded-xl border border-line p-4 text-sm outline-none focus:border-rishi focus:ring-4 focus:ring-rishi/10" placeholder="Explain the purpose of this event, who will benefit, and why it matters to the Rishihood community." />
          <input className="form-field" placeholder="Search a student or club name" />
          <label className="flex items-center justify-between text-sm font-semibold">Issue Certificates to Attendees <input type="checkbox" defaultChecked className="h-5 w-5 accent-rishi" /></label>
        </section>

        <div className="flex justify-end gap-3">
          <button type="button" className="h-12 rounded-full border border-line px-7 font-bold">Save as Draft</button>
          <button type="button" className="brand-button h-12 py-0">Submit for Approval</button>
        </div>
      </form>

      <aside className="hidden lg:block">
        <p className="muted-label">Preview</p>
        <div className="card mt-5 p-6">
          <p className="muted-label">Workshop</p>
          <h3 className="mt-3 text-xl font-extrabold">Design Thinking Bootcamp</h3>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <p className="flex gap-3"><Calendar className="h-4 w-4" />May 10, 2026</p>
            <p className="flex gap-3"><Clock3 className="h-4 w-4" />10:00 AM — 1:00 PM</p>
            <p className="flex gap-3"><MapPin className="h-4 w-4" />A-401</p>
          </div>
          <span className="mt-5 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Pending Approval</span>
        </div>
        <div className="mt-7 space-y-3 text-sm text-ink">
          {["Event name filled", "Event type selected", "Date and time set", "Venue selected"].map((item) => (
            <p key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-rishi" />{item}</p>
          ))}
        </div>
      </aside>
    </div>
  );
}
