export default function Spinner({ fullScreen = false }) {
  const spinner = (
    <div
      className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"
      role="status"
      aria-label="Loading"
    />
  );

  if (!fullScreen) return spinner;

  return <div className="flex min-h-screen items-center justify-center">{spinner}</div>;
}