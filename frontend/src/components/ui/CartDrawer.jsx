"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconTrash, IconMinus, IconPlus } from "@tabler/icons-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    toggleCart(false);
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/auth?redirect=/checkout");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-50"
            onClick={() => toggleCart(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* RIGHT PANEL */}
          <motion.div
            className="fixed top-0 right-0 h-screen w-full sm:w-[24rem] bg-white text-text font-sans z-[200] flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.1)] dark:bg-[#121212] dark:text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-6 border-b border-border dark:border-white/10 shrink-0">
              <h2 className="text-[1.2rem] font-serif font-medium m-0 tracking-wide uppercase">Shopping Bag ({items.length})</h2>
              <IconX 
                size={24} 
                className="cursor-pointer transition-transform duration-200 hover:scale-110 text-text-secondary hover:text-text dark:text-gray-400 dark:hover:text-white" 
                onClick={() => toggleCart(false)} 
              />
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text-secondary">
                  <p className="text-[0.95rem] tracking-[0.05em] uppercase mb-4">Your bag is empty</p>
                  <button 
                    onClick={() => toggleCart(false)}
                    className="border border-text text-text bg-transparent px-6 py-2 text-[0.8rem] font-semibold tracking-[0.1em] uppercase hover:bg-text hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.productId}-${item.size}-${idx}`} className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-[100px] aspect-[3/4] bg-[#e8e4dd] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Item Info */}
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-[0.95rem] font-medium m-0 leading-tight pr-4">{item.name}</h3>
                          <IconTrash 
                            size={18} 
                            className="text-text-muted hover:text-[#d9534f] cursor-pointer transition-colors"
                            onClick={() => removeItem(item.productId, item.size)}
                          />
                        </div>
                        <p className="text-[0.75rem] text-text-secondary uppercase tracking-wider m-0 mb-1">Size: {item.size}</p>
                        <p className="text-[0.9rem] font-semibold m-0">{item.price}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-4 border border-border w-max px-2 py-1 mt-3">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="bg-transparent border-none p-0 cursor-pointer text-text hover:text-text-secondary"
                        >
                          <IconMinus size={14} />
                        </button>
                        <span className="text-[0.85rem] font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="bg-transparent border-none p-0 cursor-pointer text-text hover:text-text-secondary"
                        >
                          <IconPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER / SUBTOTAL */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border dark:border-white/10 shrink-0 bg-white dark:bg-[#121212]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[0.9rem] font-semibold tracking-wider uppercase">Subtotal</span>
                  <span className="text-[1.2rem] font-medium">
                    ₹{getCartTotal().toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[0.75rem] text-text-secondary mb-6 tracking-wide">
                  Shipping & taxes calculated at checkout.
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center h-14 bg-text text-white text-[0.9rem] font-semibold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-accent no-underline"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
