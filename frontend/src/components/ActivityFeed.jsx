// /src/components/ActivityFeed.jsx
import { Clock3 } from "lucide-react";

export default function ActivityFeed({ activities }) {
  return (
    <section className="mt-16">
      <p className="muted-label mb-6">Recent Activity</p>
      <div className="card p-8">
        {activities.map((activity, index) => (
          <div key={activity.text} className="relative flex gap-6 pb-7 last:pb-0">
            {index < activities.length - 1 ? <span className="absolute left-[7px] top-4 h-full w-px bg-line" /> : null}
            <span className={`relative z-10 mt-1 h-4 w-4 rounded-full border-4 border-white ${activity.color === "green" ? "bg-green-600" : activity.color === "gray" ? "bg-slate-400" : "bg-rishi"}`} />
            <div>
              <p className="text-sm text-ink">{activity.text}</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted"><Clock3 className="h-3.5 w-3.5" />{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
