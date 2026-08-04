import { Star } from "lucide-react";

export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <div className={["flex items-center gap-0.5", className].filter(Boolean).join(" ")}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </div>
  );
}
