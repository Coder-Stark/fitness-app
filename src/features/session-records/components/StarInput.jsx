export default function StarInput({ value, onChange, disabled }) {
  return (
    <div role="radiogroup" aria-label="Rating" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
          disabled={disabled}
          onClick={() => onChange(star)}
          className={`text-3xl leading-none transition hover:text-amber-400 disabled:cursor-not-allowed ${
            star <= value ? "text-amber-500" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}