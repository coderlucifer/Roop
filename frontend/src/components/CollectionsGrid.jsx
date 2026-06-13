import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CollectionsGrid({ collections }) {
  return (
    <section className="px-[clamp(1.5rem,4vw,4rem)] py-[clamp(4rem,8vw,8rem)] max-w-[1400px] mx-auto w-full" id="collections">
      <div className="mb-12">
        <span className="inline-block text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-accent mb-3">Curated For You</span>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.2] text-text m-0">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-6">
        {collections.map((item, i) => (
          <CollectionCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      to="/shop"
      ref={ref}
      className={`group relative overflow-hidden rounded-xl cursor-pointer bg-[#e8e4dd] block no-underline ${index === 0 ? "md:row-span-2" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      <div className="w-full h-full min-h-[280px] md:min-h-[320px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/65 to-transparent text-white flex flex-col gap-[0.3rem]">
        <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] font-medium m-0">{item.title}</h3>
        <p className="text-[0.85rem] opacity-80 m-0 font-light">{item.subtitle}</p>
        <button className="inline-flex items-center gap-[0.4rem] mt-3 p-0 bg-transparent border-none text-white text-[0.85rem] font-medium tracking-[0.08em] uppercase opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0">
          Explore
          <svg className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Link>
  );
}
