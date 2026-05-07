// /src/pages/AdminOverview.jsx
import { Menu } from "lucide-react";
import { useState } from "react";
import ActivityFeed from "../components/ActivityFeed";
import ApprovalList from "../components/ApprovalList";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { activities, approvals, stats } from "../data/mockData";

export default function AdminOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const onDecision = (title, decision) => {
    setToast(`${title} ${decision}.`);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="app-frame flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="min-h-screen flex-1 px-5 py-8 sm:px-10 lg:px-20">
        <button className="mb-6 rounded-xl border border-line bg-white p-3 md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
          <Menu className="h-5 w-5" />
        </button>
        <div className="mb-12">
          <h1 className="text-4xl font-black">Overview</h1>
          <p className="mt-3 text-sm text-muted">Wednesday, October 24</p>
        </div>
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </section>
        <div className="mt-16">
          <ApprovalList approvals={approvals} onDecision={onDecision} />
        </div>
        <ActivityFeed activities={activities} />
        {toast ? <div className="fixed bottom-6 right-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-card">{toast}</div> : null}
      </main>
    </div>
  );
}
