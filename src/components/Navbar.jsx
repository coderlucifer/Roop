import "./Navbar.css";
import logo from "../assets/logo.png";

import {
  IconMenu2,
  IconSearch,
  IconHeart,
  IconUser,
} from "@tabler/icons-react";

function Navbar() {
  return (
    <header className="lux-navbar">

      {/* LEFT SECTION */}
      <div className="lux-left">
        <button className="lux-icon-btn">
          <IconMenu2 size={22} />
        </button>

        <div className="lux-text-icon">
          <IconSearch size={20} />
          <span>Search</span>
        </div>
      </div>

      {/* CENTER LOGO */}
      <div className="lux-center">
        <img src={logo} alt="Roop logo" className="lux-logo" />
      </div>

      {/* RIGHT SECTION */}
      <div className="lux-right">
        <span className="lux-call">Call Us</span>
        <IconHeart size={22} stroke={1.5} className="lux-icon" />
        <IconUser size={22} stroke={1.5} className="lux-icon" />
      </div>

    </header>
    
  );
}

export default Navbar;
