// /src/components/ApprovalList.jsx
export default function ApprovalList({ approvals, onDecision }) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <p className="muted-label">Needs Your Attention</p>
        <button className="text-sm font-bold text-rishi">View All Approvals →</button>
      </div>
      <div className="space-y-5">
        {approvals.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-rishi-soft text-rishi">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.submitter} <span className="mx-2">·</span> {item.date} <span className="mx-2">·</span> {item.place}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => onDecision(item.title, "rejected")} className="h-11 rounded-full border border-rishi/30 px-7 text-sm font-bold text-rishi hover:bg-rishi-soft">Reject</button>
                <button onClick={() => onDecision(item.title, "approved")} className="brand-button h-11 px-7 py-0 text-sm">Approve</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
