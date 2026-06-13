import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandPinterest,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white/80 px-[clamp(1.5rem,4vw,4rem)] pt-16 pb-8" id="footer">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-white/10">
        <div className="flex flex-col gap-4">
          <img src={logo} alt="Roop logo" className="h-10 w-auto object-contain object-left brightness-0 invert" />
          <p className="text-[0.9rem] text-white/50 m-0 max-w-[280px] leading-relaxed">
            Where tradition meets modern luxury.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="w-[38px] h-[38px] flex items-center justify-center border border-white/15 rounded-full text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30">
              <IconBrandInstagram size={20} />
            </a>
            <a href="#" aria-label="X (Twitter)" className="w-[38px] h-[38px] flex items-center justify-center border border-white/15 rounded-full text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30">
              <IconBrandX size={20} />
            </a>
            <a href="#" aria-label="Pinterest" className="w-[38px] h-[38px] flex items-center justify-center border border-white/15 rounded-full text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30">
              <IconBrandPinterest size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="w-[38px] h-[38px] flex items-center justify-center border border-white/15 rounded-full text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30">
              <IconBrandYoutube size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-white m-0 mb-2">Shop</h4>
          <Link to="/shop?category=Men" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Men</Link>
          <Link to="/shop?category=Women" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Women</Link>
          <Link to="/shop?category=Accessories" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Accessories</Link>
          <Link to="/shop" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">New Arrivals</Link>
          <Link to="/shop" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Sale</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-white m-0 mb-2">Company</h4>
          <a href="/about" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">About Us</a>
          <a href="/sustainability" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Sustainability</a>
          <a href="/careers" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Careers</a>
          <a href="/press" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Press</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-white m-0 mb-2">Help</h4>
          <a href="/faq" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">FAQ</a>
          <a href="/shipping" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Shipping</a>
          <a href="/returns" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Returns</a>
          <a href="/contact" className="text-[0.9rem] text-white/50 transition-colors duration-200 hover:text-white">Contact Us</a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[0.8rem] text-white/35 gap-4 md:gap-0">
        <p className="m-0">© 2026 Roop. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="/privacy" className="text-white/35 transition-colors duration-200 hover:text-white/70">Privacy Policy</a>
          <a href="/terms" className="text-white/35 transition-colors duration-200 hover:text-white/70">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
