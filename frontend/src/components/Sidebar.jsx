// /src/components/Sidebar.jsx
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { adminNav } from "../data/mockData";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-[#f6fbfb] transition md:static md:z-auto md:w-[292px] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute right-4 top-4 md:hidden" onClick={onClose} aria-label="Close sidebar">
          <X className="h-5 w-5" />
        </button>
        <div className="px-9 pb-12 pt-12 text-center md:text-left">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-rishi text-lg font-bold text-white md:mx-0">
            UA
          </div>
          <h2 className="font-bold">Priya Sharma</h2>
          <p className="text-xs text-muted">University Admin</p>
        </div>

        <nav className="space-y-1">
          {adminNav.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-4 px-9 py-4 text-left text-sm font-bold transition ${
                  active
                    ? "border-l-4 border-rishi bg-rishi-soft text-rishi"
                    : "border-l-4 border-transparent text-ink/70 hover:bg-white hover:text-rishi"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-rishi px-2 py-1 text-[10px] text-white">{item.badge}</span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <Link to="/calendar" className="mt-auto flex items-center gap-3 px-9 py-8 text-sm font-bold text-rishi hover:bg-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Calendar
        </Link>
      </aside>
    </>
  );
}
