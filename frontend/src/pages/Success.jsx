import { Link } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-20">
      <div className="bg-white p-12 text-center shadow-sm border border-border w-full max-w-[500px]">
        <div className="w-20 h-20 bg-text rounded-full flex items-center justify-center mx-auto mb-8">
          <IconCheck size={40} className="text-white" />
        </div>
        <h1 className="text-[2rem] font-serif font-medium mb-4 uppercase tracking-wider">Order Confirmed</h1>
        <p className="text-text-secondary mb-8">
          Thank you for your purchase. We've received your order and will contact you shortly with shipping details.
        </p>
        <Link 
          to="/shop" 
          className="inline-block bg-text text-white px-8 py-4 text-[0.85rem] font-semibold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-accent no-underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
