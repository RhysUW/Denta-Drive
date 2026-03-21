export default function ProgressBar({ value, max, color = '#6366f1', showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const isComplete = pct >= 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value} / {max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: isComplete ? '#22c55e' : color,
          }}
        />
      </div>
    </div>
  );
}
