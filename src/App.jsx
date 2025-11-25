import Navbar from "./components/Navbar";
import { Carousel } from "./components/ui/apple-cards-carousel";
import "./App.css";

import mannyMoreno from "./assets/maleModels/manny-moreno-pidhWc7zHjA-unsplash.jpg";
import renny from "./assets/femaleModels/rendy-novantino-MhGiGFHz-8Y-unsplash.jpg";
import accessories from "./assets/Accessories/moises-gonzalez-3nM6BebX_58-unsplash.jpg";
import video from "./assets/video.mp4";
function App() {
  const slides = [
    {
      src: mannyMoreno,
      title: "Men Collection",
      button: "Explore Now",
    },
    {
      src: renny,
      title: "Women Collection",
      button: "Shop Now",
    },
    {
      src: accessories,
      title: "Accessories Collection",
      button: "View Collection",
    }
  ];

  return (
    <div className="page">
      <Navbar />
      <div className="hero-video-container">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
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
  );
}

export default App;
