import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const amount = getCartTotal();
      const orderRes = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const order = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(order.error || "Could not create order");
      }

      if (order.isDummy) {
        alert("Running in Demo Mode without Razorpay API keys. Bypassing payment gateway to simulate success!");
        
        // Save to Database as a mock verification
        await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: order.id,
            razorpay_payment_id: "pay_dummy_" + Date.now(),
            razorpay_signature: "mock_signature",
            amount: amount,
            cartItems: items,
            shippingInfo: formData,
            isDummy: true
          }),
        });

        clearCart();
        navigate("/success");
        return;
      }

      // 2. Open Razorpay UI
      const options = {
        key: order.razorpayKeyId || "rzp_test_YourTestKeyId",
        amount: order.amount,
        currency: order.currency,
        name: "Roop Luxury",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount: amount,
                cartItems: items,
                shippingInfo: formData,
              }),
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              clearCart();
              navigate("/success");
            } else {
              alert("Payment Verification Failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error during payment verification");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#1a1a1a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
      
    } catch (err) {
      console.error(err);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row pb-20">
      {/* LEFT COL: Form */}
      <div className="flex-1 px-6 lg:px-[10%] pt-12 lg:pt-20 lg:border-r border-border bg-white">
        <Link to="/shop" className="inline-flex items-center text-[0.85rem] uppercase tracking-widest text-text-muted hover:text-text mb-8 transition-colors">
          <IconChevronLeft size={16} className="mr-1" />
          Return to Shop
        </Link>
        
        <h1 className="text-[1.8rem] font-serif font-medium mb-8 uppercase tracking-wider">Checkout</h1>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Contact */}
          <div>
            <h2 className="text-[1.1rem] font-medium mb-4">Contact Information</h2>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              required
              placeholder="Email" 
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
            />
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-[1.1rem] font-medium mb-4 mt-8">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                required
                placeholder="First name" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                required
                placeholder="Last name" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
            </div>
            <input 
              type="text" 
              name="address"
              required
              placeholder="Address" 
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors mb-4"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input 
                type="text" 
                name="city"
                required
                placeholder="City" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
              <input 
                type="text" 
                name="state"
                required
                placeholder="State" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
              <input 
                type="text" 
                name="pincode"
                required
                placeholder="PIN Code" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
            </div>
            <input 
              type="tel" 
              name="phone"
              required
              placeholder="Phone" 
              onChange={handleChange}
              className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-text text-white text-[0.9rem] font-semibold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-accent mt-8 disabled:opacity-70"
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>

      {/* RIGHT COL: Order Summary */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#fafafa] px-6 lg:px-[5%] pt-12 lg:pt-20">
        <div className="sticky top-20">
          <h2 className="text-[1.1rem] font-medium mb-6">Order Summary</h2>
          
          <div className="max-h-[40vh] overflow-y-auto pr-4 mb-6">
            {items.map((item, idx) => (
              <div key={`${item.productId}-${item.size}-${idx}`} className="flex gap-4 mb-6 relative">
                <div className="w-[64px] h-[85px] bg-[#e8e4dd] shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-2 -right-2 bg-text text-white text-[0.7rem] font-medium w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <h3 className="text-[0.9rem] font-medium m-0">{item.name}</h3>
                    <p className="text-[0.75rem] text-text-secondary m-0 mt-1 uppercase tracking-wider">{item.size}</p>
                  </div>
                  <span className="text-[0.9rem] font-medium">₹{(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex justify-between text-[0.9rem]">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[0.9rem]">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-secondary">Calculated at next step</span>
            </div>
          </div>

          <div className="border-t border-border mt-6 pt-6 flex justify-between items-center">
            <span className="text-[1.1rem] font-medium uppercase tracking-widest">Total</span>
            <div className="flex items-end gap-2">
              <span className="text-[0.75rem] text-text-secondary mb-1">INR</span>
              <span className="text-[1.5rem] font-serif font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
