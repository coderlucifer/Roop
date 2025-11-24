import Navbar from './components/Navbar'
import { Carousel, Card, BlurImage } from "./components/ui/apple-cards-carousel";
import './App.css'

function App() {

  // Example items — replace with your real items
  const items = [
    <Card key={1} index={0} card={{
      title: "Title 1",
      category: "Category",
      src: "https://via.placeholder.com/300",
      content: "Hello"
    }}/>,
    <Card key={2} index={1} card={{
      title: "Title 2",
      category: "Category",
      src: "https://via.placeholder.com/300",
      content: "Hello"
    }}/>,
  ];

  return (
    <div className="page">
      <Navbar />
      
      {/* USE THIS instead of AppleCardsCarouselDemo */}
      <Carousel items={items} />

    </div>
  )
}

export default App;
