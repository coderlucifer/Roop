import { useEffect, useRef, useState } from "react";

export default function BrandStory() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg-dark text-white py-[clamp(4rem,8vw,8rem)] px-[clamp(1.5rem,4vw,4rem)]" id="brand-story" ref={ref}>
      <div
        className="max-w-[800px] mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(60px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="inline-block text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
          Our Philosophy
        </span>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.25] text-white m-0 mb-8">
          Rooted in Tradition,
          <br />
          <em className="italic text-accent-light">Crafted for Tomorrow</em>
        </h2>
        <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] leading-[1.8] text-white/70 m-0 mb-12 max-w-[600px] mx-auto">
          At Roop, we believe fashion is more than fabric — it's identity. Every piece in our
          collection bridges the rich heritage of Indian craftsmanship with the bold minimalism
          of contemporary design. We source the finest materials and work with artisans who've
          perfected their craft over generations.
        </p>
        <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <span className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-medium text-accent-light">500+</span>
            <span className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white/50">Artisans</span>
          </div>
          <div className="hidden md:block w-px h-[50px] bg-white/15" />
          <div className="flex flex-col items-center gap-2">
            <span className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-medium text-accent-light">12</span>
            <span className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white/50">States Sourced</span>
          </div>
          <div className="hidden md:block w-px h-[50px] bg-white/15" />
          <div className="flex flex-col items-center gap-2">
            <span className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-medium text-accent-light">100%</span>
            <span className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white/50">Ethically Made</span>
          </div>
        </div>
      </div>
    </section>
  );
}
