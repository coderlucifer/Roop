"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import Searchbar from "./ui/searchbar.jsx";
import { IconMenu2, IconHeart, IconUser, IconShoppingBag, IconLogout } from "@tabler/icons-react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

function Navbar({ setOpenLeft, setOpenRight }) {
  const [scrolled, setScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`group fixed top-0 left-0 w-full px-6 py-3 lg:px-12 lg:py-4 grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_auto_1fr] items-center z-[100] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-white/85 backdrop-blur-[20px] saturate-180 text-text shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent text-white hover:bg-white/85 hover:backdrop-blur-[20px] hover:saturate-180 hover:text-text hover:shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-6 shrink justify-start order-1 lg:order-none">
        <button
          className="bg-none border-none cursor-pointer flex items-center text-inherit p-1 transition-opacity duration-200 hover:opacity-70"
          onClick={() => setOpenLeft(true)}
          aria-label="Open menu"
        >
          <IconMenu2 size={22} />
        </button>
        <div className="flex items-center gap-1 opacity-85 cursor-pointer">
          <Searchbar scrolled={scrolled} />
        </div>
      </div>

      {/* CENTER */}
      <div className="flex justify-center items-center min-w-[200px] col-span-2 lg:col-span-1 order-[-1] lg:order-none mb-1 lg:mb-0">
        <Link to="/">
          <img
            src={logo}
            alt="Roop logo"
            className={`h-[45px] w-auto max-w-[160px] object-contain transition-filter duration-400 ease-in-out ${
              scrolled ? "filter-none" : "brightness-0 invert group-hover:filter-none"
            }`}
          />
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex justify-end items-center gap-6 text-inherit order-2 lg:order-none">
        <span
          className="hidden lg:inline-block opacity-80 text-[0.9rem] font-medium cursor-pointer tracking-[0.02em] transition-opacity duration-200 hover:opacity-100"
          onClick={() => setOpenRight(true)}
        >
          Call Us
        </span>
        <IconHeart className="cursor-pointer opacity-85 transition-opacity duration-150 hover:opacity-100" size={22} />
        {isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-3 text-inherit">
            <Link to="/account" className="text-inherit no-underline">
              <span className="text-[0.8rem] font-medium tracking-wider cursor-pointer transition-opacity duration-150 hover:opacity-70">
                HI, {user?.firstName?.toUpperCase() || "USER"}
              </span>
            </Link>
            <IconLogout 
              className="cursor-pointer opacity-85 transition-opacity duration-150 hover:opacity-100 text-[#d9534f]" 
              size={20} 
              onClick={() => logout()}
            />
          </div>
        ) : (
          <Link to="/auth" className="text-inherit">
            <IconUser className="cursor-pointer opacity-85 transition-opacity duration-150 hover:opacity-100" size={22} />
          </Link>
        )}
        <div className="relative">
          <IconShoppingBag 
            className="cursor-pointer opacity-85 transition-opacity duration-150 hover:opacity-100" 
            size={22} 
            onClick={() => toggleCart()}
          />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center pointer-events-none">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
