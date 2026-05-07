// /src/components/AuthCard.jsx
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../lib/api";

export default function AuthCard({ mode = "login" }) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    en: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isSignup) {
      setStatus({ type: "info", message: "Login is ready for the next backend endpoint. Signup is connected now." });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await registerUser({
        name: form.name.trim(),
        en: Number(form.en),
        email: form.email.trim(),
        password: form.password,
      });
      setForm({ name: "", en: "", email: "", password: "", confirmPassword: "" });
      setStatus({ type: "success", message: "Account created. You can log in once the login API is added." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const passwordScore = Math.min(4, Math.floor(form.password.length / 3));
  const statusTone = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    info: "border-sky-200 bg-sky-50 text-sky-700",
  }[status.type];

  return (
    <main className="soft-bg grid min-h-screen place-items-center px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid-cols-[1fr_430px]">
        <aside className="hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" className="text-2xl font-extrabold text-white">RishiSphere</Link>
          <div>
            <p className="muted-label text-white/55">Campus access</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight">
              One account for every event, approval, and campus moment.
            </h1>
          </div>
          <div className="grid gap-3 text-sm text-white/75">
            <p className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-rishi-soft" />Calendar, clubs, and certificates together</p>
            <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-rishi-soft" />Verified Rishihood email access</p>
          </div>
        </aside>

        <div className="px-6 py-8 sm:px-9 sm:py-10">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link to="/" className="text-xl font-extrabold text-rishi">RishiSphere</Link>
            <span className="text-xs font-bold text-muted">Rishihood University</span>
          </div>

          <div>
            <p className="muted-label text-rishi">{isSignup ? "New account" : "Member access"}</p>
            <h1 className="mt-3 text-3xl font-extrabold">{isSignup ? "Create your account" : "Welcome back"}</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              {isSignup ? "Use your university details to enter the campus event workspace." : "Sign in to continue to your RishiSphere dashboard."}
            </p>
          </div>

          {status.message ? (
            <div className={`mt-6 rounded-lg border px-4 py-3 text-sm font-semibold ${statusTone}`}>
              {status.message}
            </div>
          ) : null}

          <form className="mt-7 space-y-4" onSubmit={onSubmit}>
            {isSignup ? (
              <>
                <label className="block">
                  <span className="muted-label">Full Name</span>
                  <div className="relative mt-2">
                    <UserRound className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted" />
                    <input className="form-field pl-11" placeholder="Your full name" value={form.name} onChange={updateField("name")} required />
                  </div>
                </label>
                <label className="block">
                  <span className="muted-label">Enrollment Number</span>
                  <input className="form-field mt-2" placeholder="e.g. 230012" inputMode="numeric" value={form.en} onChange={updateField("en")} required />
                </label>
              </>
            ) : null}
            <label className="block">
              <span className="muted-label">University Email</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted" />
                <input className="form-field pl-11" placeholder="yourname@rishihood.edu.in" type="email" value={form.email} onChange={updateField("email")} required />
              </div>
              {isSignup ? <span className="mt-2 block text-xs text-muted">Only verified campus emails should be used.</span> : null}
            </label>
            <label className="block">
              <span className="muted-label">Password</span>
              <div className="relative mt-2">
                <input className="form-field pr-12" type={visible ? "text" : "password"} value={form.password} onChange={updateField("password")} minLength={6} required />
                <button type="button" className="absolute right-4 top-3 text-muted" onClick={() => setVisible((value) => !value)} aria-label="Toggle password">
                  {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {isSignup ? (
                <div className="mt-3">
                  <div className="grid grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map((index) => (
                      <span key={index} className={`h-1 rounded-full ${index < passwordScore ? "bg-rishi" : "bg-line"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-right text-xs text-muted">{passwordScore >= 3 ? "Strong" : "Minimum 6 characters"}</p>
                </div>
              ) : null}
            </label>
            {isSignup ? (
              <label className="block">
                <span className="muted-label">Confirm Password</span>
                <input className="form-field mt-2" type="password" value={form.confirmPassword} onChange={updateField("confirmPassword")} required />
              </label>
            ) : (
              <Link to="/signup" className="block text-right text-sm font-semibold text-rishi">Forgot password?</Link>
            )}
            <button className="brand-button flex w-full items-center justify-center gap-2" type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isSignup ? "Create Account" : "Log In"}
              {!submitting ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-muted">
            <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
          </div>
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-line bg-white font-semibold transition hover:border-rishi/30">
            <span className="text-xl font-black text-[#4285f4]">G</span>
            Continue with Google
          </button>
          {isSignup ? <p className="mt-6 text-center text-xs leading-5 text-muted">By continuing you agree to our <b className="text-rishi">Terms</b> and <b className="text-rishi">Privacy Policy</b>.</p> : null}
          <div className="mt-7 border-t border-line pt-6 text-center text-sm text-muted">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={isSignup ? "/login" : "/signup"} className="font-bold text-rishi">{isSignup ? "Log In" : "Sign Up"}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
