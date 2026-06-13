import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./ui/sidebar.jsx";
import RightSidebar from "./ui/Callus.jsx";
import Footer from "./ui/Footer.jsx";
import CartDrawer from "./ui/CartDrawer.jsx";

export default function Layout() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useState(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar open={openLeft} setOpen={setOpenLeft} />
      <RightSidebar open={openRight} setOpen={setOpenRight} />
      <Navbar
        openLeft={openLeft}
        setOpenLeft={setOpenLeft}
        openRight={openRight}
        setOpenRight={setOpenRight}
      />
      
      {/* The nested pages will render here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
