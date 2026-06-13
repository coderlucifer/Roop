import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Shop() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Parse category and search from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryQuery = searchParams.get("category");
    const searchString = searchParams.get("search");
    
    if (categoryQuery) {
      setFilter(categoryQuery);
    }
    if (searchString !== null) {
      setSearchQuery(searchString);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = filter === "All" ? true : p.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = searchQuery === "" ? true : p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-bg font-sans text-text pt-24 pb-16 min-h-screen">
      
      {/* ── HEADER ── */}
      <div className="px-[clamp(1.5rem,4vw,4rem)] py-12 text-center max-w-[800px] mx-auto">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal m-0 mb-4 tracking-tight">The Collection</h1>
        <p className="text-text-secondary text-[1rem] leading-relaxed max-w-[500px] mx-auto m-0">
          Discover our meticulously curated selection of modern luxury pieces, designed to elevate your everyday narrative.
        </p>
      </div>

      <div className="px-[clamp(1.5rem,4vw,4rem)] max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* ── SIDEBAR FILTERS ── */}
        <aside className="w-full lg:w-[240px] shrink-0 sticky top-28 hidden md:block">
          <div className="mb-8">
            <h3 className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-4 border-b border-border pb-2">Category</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {["All", "Men", "Women", "Accessories"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setFilter(cat)}
                    className={`bg-transparent border-none p-0 text-[0.95rem] transition-colors duration-200 cursor-pointer ${
                      filter === cat ? "text-text font-medium" : "text-text-secondary hover:text-text"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── MOBILE FILTER BAR ── */}
        <div className="md:hidden w-full flex overflow-x-auto gap-4 pb-2 scrollbar-none border-b border-border">
          {["All", "Men", "Women", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`bg-transparent border-none p-0 pb-2 text-[0.95rem] whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                filter === cat ? "text-text font-medium border-b-2 border-text" : "text-text-secondary hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-8 text-[0.85rem] text-text-secondary">
            <span>Showing {filteredProducts.length} results</span>
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-text font-medium outline-none cursor-pointer"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="w-full flex justify-center py-20 text-text-secondary tracking-widest uppercase text-sm">
              Loading Collection...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.productId}`} key={product.id} className="group flex flex-col no-underline">
                  <div className="relative w-full aspect-[3/4] bg-[#e8e4dd] overflow-hidden mb-4">
                    {product.tag && (
                      <span className="absolute top-3 left-3 py-1 px-3 bg-text text-white text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-sm z-10">
                        {product.tag}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    {/* Hover Overlay "Quick View" */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                      <span className="bg-white/90 text-text px-6 py-3 text-[0.85rem] font-semibold tracking-[0.1em] uppercase shadow-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-sm">
                        View Product
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-text-muted mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="text-[1.05rem] font-medium text-text m-0 mb-1">{product.name}</h3>
                    </div>
                    <span className="text-[0.95rem] font-semibold text-text">{product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
