import type { ReactNode } from "react";

/** Fades + slides a step's content in on mount. Pure CSS (see the
 * `step-in` keyframes in globals.css) driven by React remounting this
 * element whenever `stepKey` changes — no JS animation state needed, and
 * `motion-reduce:` handles prefers-reduced-motion for free. */
export function StepTransition({ stepKey, children }: { stepKey: string; children: ReactNode }) {
  return (
    <div key={stepKey} className="animate-[step-in_300ms_ease-out] motion-reduce:animate-none">
      {children}
    </div>
  );
}
