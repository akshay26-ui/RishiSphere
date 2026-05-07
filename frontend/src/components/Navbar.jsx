// /src/components/Navbar.jsx
import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/mockData";

export default function Navbar({ compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={compact ? "border-b border-line bg-white" : "fixed inset-x-0 top-0 z-40 py-5"}>
      <nav className={compact ? "flex h-16 items-center justify-between px-6" : "mx-auto flex w-[min(1100px,92vw)] items-center justify-between"}>
        <Link to="/" className="font-extrabold tracking-tight text-rishi">
          RishiSphere
        </Link>

        <div className="hidden items-center gap-9 text-sm font-semibold text-ink/75 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `border-b-2 py-6 transition hover:text-rishi ${
                  isActive ? "border-rishi text-rishi" : "border-transparent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {compact ? <Bell className="h-5 w-5 text-ink" /> : null}
          <Link
            to="/admin"
            className="grid h-11 w-11 place-items-center rounded-full bg-rishi text-sm font-bold text-white shadow-lg shadow-rishi/25"
          >
            AM
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="absolute inset-x-4 top-16 z-50 rounded-2xl border border-line bg-white p-3 shadow-card md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-rishi-soft hover:text-rishi"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  );
}
