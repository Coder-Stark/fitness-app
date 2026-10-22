const STYLES = {
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700" },
  in_progress: { label: "In progress", className: "bg-amber-100 text-amber-700" },
  ending_soon: { label: "Ending soon", className: "bg-orange-100 text-orange-700" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] ?? { label: status, className: "bg-gray-100 text-gray-700" };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.className}`}>
      {style.label}
    </span>
  );
}