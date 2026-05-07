// /src/pages/LandingPage.jsx
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      <Navbar />
      <section className="soft-bg relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 text-center">
        {["TEDx", "Clubs", "Workshops", "Open Mic", "Web3", "Films"].map((tag, index) => (
          <span
            key={tag}
            className="absolute hidden rounded-full bg-white px-5 py-3 text-xs font-bold text-ink shadow-card md:block"
            style={{
              left: `${14 + (index % 3) * 22}%`,
              top: `${16 + index * 9}%`,
            }}
          >
            {tag}
          </span>
        ))}
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-7xl">
            Every moment<br />
            <em>of Rishihood</em><br />
            <span className="text-ink/10">one place.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-muted">
            Discover calendar, club events, certificates, approvals, and campus momentum in one aligned sphere.
          </p>
          <Link to="/calendar" className="brand-button mt-8 inline-flex items-center gap-3">
            Open Calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <div className="relative mx-auto grid h-80 w-80 place-items-center rounded-full border border-rishi/25">
          <span className="absolute inset-10 rounded-full border border-line" />
          <div className="card grid h-28 w-28 place-items-center rounded-full">
            <div><b className="block text-4xl">243</b><span className="text-xs text-muted">campus moments</span></div>
          </div>
          {[52, 47, 89, 34, 21].map((number, index) => (
            <span key={number} className="absolute text-sm font-bold" style={{ transform: `rotate(${index * 72}deg) translateY(-145px) rotate(-${index * 72}deg)` }}>{number}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold">Upcoming Events Highlights</h2>
        <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
          <article className="card bg-rishi-soft p-8">
            <p className="muted-label text-rishi">May 21</p>
            <h3 className="mt-6 font-serif text-3xl italic">TEDx Rishihood</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">Talks and performances from students and leaders shaping new campus conversations.</p>
            <button className="mt-8 text-sm font-bold text-rishi">Save Seat</button>
          </article>
          <div className="grid gap-5">
            {["Intro to Web3", "Diwali Mela"].map((title, index) => (
              <article key={title} className="card p-6">
                <p className="text-xs text-muted">May {26 + index * 6}</p>
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-2 text-xs text-muted">Campus-wide experience</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-3">
          {[
            ["Day calendar", CalendarDays, "Full month views with event status and venue details."],
            ["Zero conflicts", ShieldCheck, "Conflict hints and seat capacity before enrollment."],
            ["Always yours", Clock3, "Personal event lists and approvals for every role."],
          ].map(([title, Icon, copy]) => (
            <article key={title} className="p-4">
              <Icon className="mb-5 h-6 w-6 text-rishi" />
              <h3 className="font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-bg px-5 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold">One platform.<br /><em>Two experiences.</em></h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {["For Students", "For Admins"].map((title) => (
            <article key={title} className="card p-7 text-left">
              <Sparkles className="mb-5 h-5 w-5 text-rishi" />
              <h3 className="font-bold">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-rishi" />Discover and enroll in events.</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-rishi" />Submit events for review.</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-rishi" />Track certificates and activity.</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold">Campus Stream</h2>
        <div className="mx-auto mt-12 max-w-xl rounded-[28px] bg-white p-12 shadow-card">
          <p className="muted-label text-rishi">Join the community</p>
          <h3 className="mt-4 font-serif text-3xl italic">Your campus awaits.</h3>
          <Link to="/signup" className="brand-button mt-8 inline-block">Create Account</Link>
        </div>
      </section>
    </div>
  );
}
