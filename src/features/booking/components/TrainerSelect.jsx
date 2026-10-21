export default function TrainerSelect({
  trainers,
  value,
  onChange,
  autoLabel = "Auto-assign the nearest available trainer",
  help = "If your preferred trainer can't take the session, the nearest available trainer is assigned.",
}) {
  return (
    <label className="block text-sm font-medium">
      Preferred trainer (optional)
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      >
        <option value="">{autoLabel}</option>
        {trainers.map((trainer) => (
          <option key={trainer.id} value={trainer.id}>
            {trainer.name}
          </option>
        ))}
      </select>
      <span className="mt-1 block text-xs font-normal text-gray-500">{help}</span>
    </label>
  );
}