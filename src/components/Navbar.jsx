"use client";
import "./Navbar.css";
import logo from "../assets/logo2.png";
import Searchbar from "./ui/searchbar.jsx";
import { IconMenu2, IconSearch, IconHeart, IconUser } from "@tabler/icons-react";

function Navbar({ setOpenLeft, setOpenRight }) {
  return (
    <header className="lux-navbar">

      {/* LEFT */}
      <div className="lux-left">
        <button className="lux-icon-btn" onClick={() => setOpenLeft(true)}>
          <IconMenu2 size={22} />
        </button>

        <div className="lux-text-icon">
          <Searchbar />
        </div>
      </div>

      {/* CENTER */}
      <div className="lux-center">
        <img src={logo} alt="Roop logo" className="lux-logo" />
      </div>

      {/* RIGHT */}
      <div className="lux-right">
        <span className="lux-call" onClick={() => setOpenRight(true)}>
          Call Us
        </span>
        <IconHeart size={22} />
        <IconUser size={22} />
      </div>

    </header>
  );
}

export default Navbar;
