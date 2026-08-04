export function PriceCard({
  price,
  terms,
}: {
  price: string;
  terms: string;
}) {
  return (
    <div className="rounded-3xl bg-[#070707] p-8 text-white sm:p-12">
      <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
        Investment
      </p>
      <p className="mt-4 text-4xl font-normal tracking-tight sm:text-5xl">
        {price}
      </p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
        {terms}
      </p>
    </div>
  );
}
