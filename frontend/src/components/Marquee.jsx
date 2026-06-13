export default function Marquee() {
  const items = [
    "SUMMER COLLECTION '26",
    "✦",
    "FREE SHIPPING OVER ₹2,999",
    "✦",
    "LUXURY REDEFINED",
    "✦",
    "HANDCRAFTED WITH LOVE",
    "✦",
    "YOUR STORY. YOUR रूप.",
    "✦",
    "SUMMER COLLECTION '26",
    "✦",
    "FREE SHIPPING OVER ₹2,999",
    "✦",
    "LUXURY REDEFINED",
    "✦",
    "HANDCRAFTED WITH LOVE",
    "✦",
    "YOUR STORY. YOUR रूप.",
    "✦",
  ];

  return (
    <div className="py-[1.2rem] px-0 bg-bg-dark overflow-hidden whitespace-nowrap">
      <div className="flex w-max animate-[marquee_30s_linear_infinite]">
        <div className="flex items-center gap-10 pr-10">
          {items.map((item, i) => (
            <span key={i} className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-white/70 shrink-0">
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-10 pr-10" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-white/70 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
