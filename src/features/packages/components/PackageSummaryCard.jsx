export default function PackageSummaryCard({ summary }) {
  const stats = [
    { label: "Purchased", value: summary.sessionsPurchased },
    { label: "Used", value: summary.sessionsUsed },
    { label: "Remaining", value: summary.sessionsRemaining },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-md bg-gray-50 p-3 text-center">
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}