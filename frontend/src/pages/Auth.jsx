import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect") || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save to zustand
      login(data.user, data.token);

      // Redirect back to checkout or home
      navigate(redirectTo);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-20">
      <div className="bg-white p-8 sm:p-12 shadow-sm border border-border w-full max-w-[450px]">
        <h1 className="text-[1.8rem] font-serif font-medium mb-2 uppercase tracking-wider text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-center text-text-secondary text-[0.85rem] mb-8">
          {isLogin 
            ? "Enter your details to access your account." 
            : "Join us for exclusive access and faster checkout."}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 text-[0.85rem] text-center mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName"
                required
                placeholder="First Name" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
              <input 
                type="text" 
                name="lastName"
                required
                placeholder="Last Name" 
                onChange={handleChange}
                className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
              />
            </div>
          )}
          
          <input 
            type="email" 
            name="email"
            required
            placeholder="Email Address" 
            onChange={handleChange}
            className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
          />
          <input 
            type="password" 
            name="password"
            required
            placeholder="Password" 
            onChange={handleChange}
            className="w-full border border-border px-4 py-3 bg-transparent text-[0.95rem] outline-none focus:border-text transition-colors"
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-text text-white text-[0.9rem] font-semibold tracking-[0.1em] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-accent mt-4 disabled:opacity-70"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 text-center text-[0.85rem] text-text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-text font-medium underline uppercase tracking-wide bg-transparent border-none cursor-pointer"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
