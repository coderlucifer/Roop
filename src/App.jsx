import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/ui/sidebar.jsx";      
import RightSidebar from "./components/ui/Callus.jsx";  
import { Carousel } from "./components/ui/apple-cards-carousel";
import "./App.css";

import mannyMoreno from "./assets/maleModels/manny-moreno-pidhWc7zHjA-unsplash.jpg";
import renny from "./assets/femaleModels/rendy-novantino-MhGiGFHz-8Y-unsplash.jpg";
import accessories from "./assets/Accessories/moises-gonzalez-3nM6BebX_58-unsplash.jpg";
import video from "./assets/video.mp4";

function App() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const slides = [
    { src: mannyMoreno, title: "Men Collection", button: "Explore Now" },
    { src: renny, title: "Women Collection", button: "Shop Now" },
    { src: accessories, title: "Accessories", button: "View Collection" },
  ];

  return (
    <>
      <Sidebar open={openLeft} setOpen={setOpenLeft} />
      <RightSidebar open={openRight} setOpen={setOpenRight} />
      <Navbar
        openLeft={openLeft}
        setOpenLeft={setOpenLeft}
        openRight={openRight}
        setOpenRight={setOpenRight}
      />
      <div className="page">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay loop muted playsInline>
            <source src={video} type="video/mp4" />
          </video>

          <div className="hero-overlay-text">
            <h1>Your Story. Your रूप.</h1>
            <p>Where tradition meets modern luxury.</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Carousel slides={slides} />
        </div>
      </div>
    </>
  );
}

export default App;
