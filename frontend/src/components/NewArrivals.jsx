import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NewArrivals({ items }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="py-[clamp(4rem,8vw,8rem)] pl-[clamp(1.5rem,4vw,4rem)] max-w-full overflow-hidden"
      id="new-arrivals"
      ref={sectionRef}
    >
      <div className="flex justify-between items-end mb-10 pr-[clamp(1.5rem,4vw,4rem)]">
        <div>
          <span className="inline-block text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-accent mb-3">Just Dropped</span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.2] text-text m-0">New Arrivals</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-11 h-11 flex items-center justify-center border-[1.5px] border-border rounded-full bg-white text-text transition-all duration-300 hover:bg-text hover:border-text hover:text-white" aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => scroll(1)} className="w-11 h-11 flex items-center justify-center border-[1.5px] border-border rounded-full bg-white text-text transition-all duration-300 hover:bg-text hover:border-text hover:text-white" aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pr-[clamp(1.5rem,4vw,4rem)] pb-4 scrollbar-none" ref={scrollRef}>
        {items.map((item, i) => (
          <Link
            to="/shop"
            key={i}
            className="group shrink-0 w-[220px] sm:w-[260px] md:w-[300px] snap-start cursor-pointer block no-underline"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(50px)",
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            }}
          >
            <div className="relative w-full aspect-[3/4] rounded-[10px] overflow-hidden bg-[#e8e4dd] mb-4">
              {item.tag && <span className="absolute top-3 left-3 py-1 px-3 bg-text text-white text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-sm z-10">{item.tag}</span>}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="px-1">
              <span className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-text-muted mb-1 block">{item.category}</span>
              <h3 className="text-base font-medium m-0 mb-1 text-text">{item.name}</h3>
              <p className="text-[0.95rem] font-semibold text-text m-0">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
