import { useState, useRef, useEffect } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-bg-alt py-[clamp(4rem,8vw,8rem)] px-[clamp(1.5rem,4vw,4rem)]" id="newsletter" ref={ref}>
      <div
        className="max-w-[600px] mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="inline-block text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-accent mb-3">Stay Connected</span>
        <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-medium text-text m-0 mb-4">
          Join the Roop Family
        </h2>
        <p className="text-base text-text-secondary m-0 mb-8 leading-[1.6]">
          Get exclusive early access to new collections, styling tips, and members-only offers.
        </p>
        <form className="group flex flex-col md:flex-row gap-0 max-w-[460px] mx-auto mb-4 border-none md:border-[1.5px] border-transparent md:border-border overflow-hidden transition-colors duration-300 focus-within:md:border-text" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 p-4 px-5 border-[1.5px] border-border md:border-none bg-white font-sans text-[0.9rem] text-text outline-none placeholder:text-text-muted"
            required
            id="newsletter-email"
          />
          <button type="submit" className="p-4 md:px-8 bg-text text-white border-none text-[0.85rem] font-semibold tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-300 hover:bg-accent mt-2 md:mt-0" id="newsletter-submit">
            {submitted ? "Thank You ✓" : "Subscribe"}
          </button>
        </form>
        <p className="text-[0.75rem] text-text-muted m-0">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
