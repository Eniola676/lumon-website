import type { ComponentType } from "react";

export type AnimatedServiceItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export function AnimatedServiceList({ items }: { items: AnimatedServiceItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="rounded-2xl border border-[#e9e9ea] bg-white p-6">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-[#e9e9ea] bg-[#fbfbfb]">
              <Icon className="size-9 text-black" />
            </div>
            <h3 className="mt-5 text-lg font-medium">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
