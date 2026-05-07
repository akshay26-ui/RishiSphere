// /src/pages/SubmitEventPage.jsx
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SubmitEventForm from "../components/SubmitEventForm";

export default function SubmitEventPage() {
  return (
    <div className="app-frame min-h-screen bg-white">
      <Navbar compact />
      <main className="mx-auto w-full max-w-[1180px] px-5 py-10">
        <Link to="/calendar" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-rishi">
          <ArrowLeft className="h-4 w-4" />
          Back to Calendar
        </Link>
        <div className="mt-8 grid gap-4 border-b border-line pb-8">
          <h1 className="text-3xl font-black">Submit an Event</h1>
          <p className="max-w-xl text-sm leading-6 text-muted">Your submission will be reviewed by admin before going live on the campus calendar.</p>
        </div>
        <div className="mt-10">
          <SubmitEventForm />
        </div>
      </main>
    </div>
  );
}
