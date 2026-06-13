"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const { src, button, title } = slide;
  const isActive = current === index;

  return (
    <div style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-500 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        style={{
          transform: !isActive
            ? "scale(0.92) rotateX(6deg)"
            : "scale(1) rotateX(0deg)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[12px] overflow-hidden transition-all duration-300"
          style={{
            boxShadow: isActive
              ? "0 25px 60px -15px rgba(0,0,0,0.35)"
              : "0 10px 30px -10px rgba(0,0,0,0.2)",
          }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: isActive ? 1 : 0.4,
              transform: isActive ? "scale(1.05)" : "scale(1)",
            }}
            alt={title}
            src={src}
            loading="lazy"
            decoding="async"
          />
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-700" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-all duration-700 flex flex-col items-center justify-end h-full pb-[8vmin] ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <h2
            className="text-lg md:text-2xl lg:text-4xl font-semibold relative"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="mt-5 px-7 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg">
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

const CarouselControl = ({ type, title, handleClick }) => {
  return (
    <button
      className={`w-12 h-12 flex items-center mx-2 justify-center bg-white border border-[#e5e0d8] rounded-full hover:bg-[#f2efe9] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 shadow-sm ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-[#1a1a1a]" size={20} />
    </button>
  );
};

export function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const id = useId();

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
    }, 4000);
  }, [slides.length]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoScroll]);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
    startAutoScroll();
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
    startAutoScroll();
  };

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
      startAutoScroll();
    }
  };

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-700"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Slide indicators */}
      <div className="absolute flex items-center gap-2 w-full justify-center top-[calc(100%+1.5rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <div className="flex gap-2 mx-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); startAutoScroll(); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-[#1a1a1a]" : "w-3 bg-[#d4d0c8] hover:bg-[#a09c94]"
              }`}
            />
          ))}
        </div>
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}