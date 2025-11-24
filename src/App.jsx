import Navbar from "./components/Navbar";
import { Carousel } from "./components/ui/apple-cards-carousel";
import "./App.css";

function App() {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      title: "Men Collection",
      button: "Explore Now",
    },
    {
      src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      title: "Women Collection",
      button: "Shop Now",
    },
    {
      src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      title: "Festive Wear",
      button: "View Collection",
    },
  ];

  return (
    <div className="page">
      <Navbar />
      <div className="flex justify-center mt-10">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}

export default App;
