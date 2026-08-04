import { Sparkles } from "lucide-react";

export type AddOnItem = {
  title: string;
  description: string;
  meta: string;
  featured?: boolean;
};

export function AddOnsBento({ items }: { items: AddOnItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col justify-between rounded-2xl border border-[#e9e9ea] bg-white p-6 ${
            item.featured ? "sm:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <div>
            {item.featured && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 font-mono text-[0.65rem] tracking-wide text-white uppercase">
                <Sparkles className="size-3" />
                AI-powered
              </span>
            )}
            <h3 className="text-lg font-medium sm:text-xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {item.description}
            </p>
          </div>
          <p className="mt-4 font-mono text-xs tracking-wide text-gray-500 uppercase">
            {item.meta}
          </p>
        </div>
      ))}
    </div>
  );
}
