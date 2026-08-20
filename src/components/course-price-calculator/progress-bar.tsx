export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div
      className="h-1 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Calculator progress"
    >
      <div
        className="h-full rounded-full bg-white transition-[width] duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
