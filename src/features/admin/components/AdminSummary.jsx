export default function AdminSummary({ summary }) {
  const { bookings, today, people } = summary;

  const cards = [
    { label: "Total bookings", value: bookings.total },
    { label: "Scheduled", value: bookings.scheduled },
    { label: "In progress", value: bookings.in_progress },
    { label: "Ending soon", value: bookings.ending_soon },
    { label: "Completed", value: bookings.completed },
    { label: "Cancelled", value: bookings.cancelled },
    { label: "Today's sessions", value: today.sessions },
    { label: "Customers", value: people.customers },
    { label: "Active trainers", value: people.activeTrainers },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-2xl font-semibold">{card.value}</p>
          <p className="text-xs text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
}