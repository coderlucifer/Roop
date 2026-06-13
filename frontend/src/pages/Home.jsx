import { Carousel } from "../components/ui/apple-cards-carousel";
import CollectionsGrid from "../components/CollectionsGrid";
import NewArrivals from "../components/NewArrivals";
import Marquee from "../components/Marquee";
import BrandStory from "../components/BrandStory";
import Newsletter from "../components/Newsletter";
import { Link } from "react-router-dom";

// Hero assets
import video from "../assets/video.mp4";

// Carousel images
import mannyMoreno from "../assets/maleModels/manny-moreno-pidhWc7zHjA-unsplash.jpg";
import renny from "../assets/femaleModels/rendy-novantino-MhGiGFHz-8Y-unsplash.jpg";
import accessories from "../assets/Accessories/moises-gonzalez-3nM6BebX_58-unsplash.jpg";

// Collections images
import owenVangioni from "../assets/maleModels/owen-vangioni-G7vompVCBXA-unsplash.jpg";
import sofiaLasheva from "../assets/femaleModels/sofia-lasheva-cSaL2UGfcoY-unsplash.jpg";
import eveMaier from "../assets/femaleModels/eve-maier-u1OuYQa0WtQ-unsplash.jpg";

// New Arrivals images
import christopherCampbell from "../assets/maleModels/christopher-campbell-rojFrRYRvb4-unsplash.jpg";
import codyBlack from "../assets/femaleModels/cody-black-SUuvXyJVHs8-unsplash.jpg";
import ionutRoman from "../assets/maleModels/ionut-roman-65mAXnEMiuQ-unsplash.jpg";
import antonTitov from "../assets/femaleModels/anton-titov-H9-uNO9NroQ-unsplash.jpg";
import orHakim from "../assets/maleModels/or-hakim-G4QN85HfuvQ-unsplash.jpg";
import kristijanArsov from "../assets/femaleModels/kristijan-arsov-7QZtR50VQJE-unsplash.jpg";

export default function Home() {
  const slides = [
    { src: mannyMoreno, title: "Men Collection", button: "Explore Now", link: "/shop" },
    { src: renny, title: "Women Collection", button: "Shop Now", link: "/shop" },
    { src: accessories, title: "Accessories", button: "View Collection", link: "/shop" },
  ];

  const collections = [
    {
      image: owenVangioni,
      title: "Men's Essentials",
      subtitle: "Timeless staples for the modern man",
    },
    {
      image: sofiaLasheva,
      title: "Women's Edit",
      subtitle: "Elegance redefined",
    },
    {
      image: eveMaier,
      title: "Festive Collection",
      subtitle: "Celebrate in style",
    },
  ];

  const newArrivals = [
    {
      image: christopherCampbell,
      name: "Midnight Linen Blazer",
      category: "Men",
      price: "₹6,999",
      tag: "NEW",
    },
    {
      image: codyBlack,
      name: "Silk Drape Kurta",
      category: "Women",
      price: "₹8,499",
      tag: "HOT",
    },
    {
      image: ionutRoman,
      name: "Relaxed Fit Trousers",
      category: "Men",
      price: "₹3,999",
    },
    {
      image: antonTitov,
      name: "Embroidered Anarkali",
      category: "Women",
      price: "₹12,999",
      tag: "NEW",
    },
    {
      image: orHakim,
      name: "Cotton Mandarin Shirt",
      category: "Men",
      price: "₹2,999",
    },
    {
      image: kristijanArsov,
      name: "Chanderi Silk Dupatta",
      category: "Women",
      price: "₹4,499",
    },
  ];

  return (
    <div className="bg-bg font-sans text-text flex flex-col overflow-x-hidden">
      {/* ── HERO ── */}
      <div className="relative w-full h-[100vh] h-[100dvh] overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-40% to-transparent to-70% pointer-events-none" />

        <div className="absolute bottom-[12%] left-0 right-0 text-center text-white px-8">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-medium m-0 mb-3 tracking-[-0.02em] drop-shadow-[0_2px_40px_rgba(0,0,0,0.3)]">Your Story. Your रूप.</h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] opacity-85 m-0 mb-8 font-light tracking-[0.04em]">Where tradition meets modern luxury.</p>
          <Link to="/shop" className="group relative inline-flex items-center gap-2 px-10 py-[0.9rem] bg-white text-text text-[0.9rem] font-semibold tracking-[0.08em] uppercase border-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden no-underline">
            <div className="absolute inset-0 bg-text translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white">Shop Collection</span>
            <svg className="relative z-10 transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-[0.7rem] tracking-[0.15em] uppercase animate-[fadeInUp_1s_ease_1s_both]">
          <span>Scroll</span>
          <div className="w-px h-[40px] bg-gradient-to-b from-white/60 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* ── MARQUEE TICKER ── */}
      <Marquee />

      {/* ── FEATURED CAROUSEL ── */}
      <section className="py-[clamp(4rem,8vw,8rem)] px-[clamp(1.5rem,4vw,4rem)] flex flex-col items-center gap-8 bg-bg" id="featured">
        <span className="inline-block text-center text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-accent mb-[-1.5rem]">Featured</span>
        <h2 className="text-center font-serif text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.2] text-text m-0">Explore Our World</h2>
        <Carousel slides={slides} />
      </section>

      {/* ── COLLECTIONS GRID ── */}
      <CollectionsGrid collections={collections} />

      {/* ── NEW ARRIVALS ── */}
      <NewArrivals items={newArrivals} />

      {/* ── BRAND STORY ── */}
      <BrandStory />

      {/* ── NEWSLETTER ── */}
      <Newsletter />
    </div>
  );
}
