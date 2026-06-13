import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { IconChevronDown, IconChevronUp, IconArrowLeft } from "@tabler/icons-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [openSection, setOpenSection] = useState("details");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-text-secondary tracking-widest uppercase text-sm">Loading Product...</div>;
  }

  if (!product || product.error) {
    return <div className="min-h-screen flex items-center justify-center text-text-secondary">Product not found.</div>;
  }

  const sizes = product.category === "Accessories" ? ["ONE SIZE"] : ["XS", "S", "M", "L", "XL"];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="bg-bg font-sans text-text pt-24 pb-16 min-h-screen">
      <div className="px-[clamp(1.5rem,4vw,4rem)] max-w-[1600px] mx-auto">
        
        {/* Back navigation */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-[0.8rem] tracking-[0.1em] uppercase text-text-secondary hover:text-text no-underline mb-8 transition-colors">
          <IconArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* ── LEFT: IMAGE GALLERY ── */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-[3/4] bg-[#e8e4dd] overflow-hidden rounded-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* We could map more images here if we had them in the DB */}
            <div className="grid grid-cols-2 gap-4">
               <div className="w-full aspect-[3/4] bg-[#e8e4dd] overflow-hidden rounded-sm">
                 <img src={product.image} alt={`${product.name} detail`} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
               </div>
               <div className="w-full aspect-[3/4] bg-[#e8e4dd] overflow-hidden rounded-sm">
                 <img src={product.image} alt={`${product.name} back`} className="w-full h-full object-cover grayscale-[30%] opacity-90" />
               </div>
            </div>
          </div>

          {/* ── RIGHT: PRODUCT INFO (STICKY) ── */}
          <div className="w-full lg:w-[45%]">
            <div className="sticky top-32">
              
              <div className="mb-8">
                <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-text-secondary mb-2 block">
                  {product.category}
                </span>
                <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.1] m-0 mb-4">
                  {product.name}
                </h1>
                <p className="text-[1.25rem] font-medium m-0">{product.price}</p>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[0.85rem] font-semibold tracking-[0.05em] uppercase">Select Size</span>
                  <button className="text-[0.75rem] text-text-secondary underline bg-transparent border-none p-0 cursor-pointer hover:text-text transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 min-w-[3rem] px-4 border text-[0.85rem] font-medium transition-all duration-200 cursor-pointer ${
                        selectedSize === size 
                          ? "border-text bg-text text-white" 
                          : "border-border bg-transparent text-text hover:border-text"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                   <p className="text-[#d9534f] text-[0.75rem] mt-2 opacity-0 transition-opacity">Please select a size</p>
                )}
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addItem(product, selectedSize);
                }}
                className="w-full h-14 bg-text text-white text-[0.85rem] font-semibold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:shadow-lg shadow-sm"
              >
                Add to Bag
              </button>

              {/* Accordions */}
              <div className="border-t border-border">
                {/* Description */}
                <div className="border-b border-border">
                  <button 
                    onClick={() => toggleSection("details")}
                    className="w-full py-5 flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="text-[0.9rem] font-semibold tracking-[0.05em] uppercase">Details & Care</span>
                    {openSection === "details" ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection === "details" ? "max-h-[500px] pb-5" : "max-h-0"}`}>
                    <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <ul className="text-[0.9rem] text-text-secondary pl-5 m-0 leading-relaxed space-y-1">
                      {product.details?.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shipping */}
                <div className="border-b border-border">
                  <button 
                    onClick={() => toggleSection("shipping")}
                    className="w-full py-5 flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="text-[0.9rem] font-semibold tracking-[0.05em] uppercase">Shipping & Returns</span>
                    {openSection === "shipping" ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection === "shipping" ? "max-h-[300px] pb-5" : "max-h-0"}`}>
                    <p className="text-[0.9rem] text-text-secondary leading-relaxed">
                      Complimentary express shipping on all orders above ₹5,000. 
                      Returns are accepted within 14 days of delivery for a full refund. 
                      Items must be in original condition with tags attached.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
