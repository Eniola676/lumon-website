export function Placeholder({
  label,
  className,
  dark,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "flex min-h-[160px] w-full items-center justify-center rounded-2xl border border-dashed p-6 text-center text-xs font-medium tracking-wide uppercase",
        dark
          ? "border-white/25 text-white/40"
          : "border-black/20 text-black/35",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </div>
  );
}
