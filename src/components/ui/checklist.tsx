export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base leading-relaxed sm:text-lg">
          <span className="mt-1 text-gray-400">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
