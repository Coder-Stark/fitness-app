export default function Stars({ value }) {
  return (
    <span className="text-lg text-amber-500" role="img" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-gray-300">{"★".repeat(5 - value)}</span>
    </span>
  );
}