// /src/components/StatCard.jsx
export default function StatCard({ stat }) {
  return (
    <article className="card relative overflow-hidden p-7">
      <span className="absolute -right-9 -top-8 h-24 w-24 rounded-full bg-rishi/5" />
      <p className="text-4xl font-black tracking-tight text-rishi">{stat.value}</p>
      <h3 className="mt-3 text-sm font-semibold text-muted">{stat.label}</h3>
      <p className="mt-5 text-xs text-muted"><span className="rounded-full bg-green-50 px-2 py-1 font-bold text-green-700">{stat.change}</span> {stat.helper}</p>
    </article>
  );
}
