const OPTIONS = [
  {
    mode: "instant",
    title: "Instant session",
    text: "A trainer starts your 60-minute workout within the hour.",
  },
  {
    mode: "scheduled",
    title: "Scheduled session",
    text: "Pick a day and time slot up to 7 days ahead.",
  },
];

export default function ModeSelector({ onSelect }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {OPTIONS.map((option) => (
        <button
          key={option.mode}
          type="button"
          onClick={() => onSelect(option.mode)}
          className="rounded-lg border border-gray-200 bg-white p-5 text-left transition hover:border-gray-900"
        >
          <h2 className="font-medium">{option.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{option.text}</p>
        </button>
      ))}
    </div>
  );
}