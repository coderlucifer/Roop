import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center pt-32 px-6">
      <div className="bg-white p-8 sm:p-12 shadow-sm border border-border w-full max-w-[600px]">
        <h1 className="text-[1.8rem] font-serif font-medium mb-8 uppercase tracking-wider text-center">My Account</h1>
        
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <p className="text-[0.75rem] text-text-secondary uppercase tracking-widest mb-1">Name</p>
            <p className="text-[1.1rem] font-medium">{user.firstName} {user.lastName}</p>
          </div>
          
          <div className="border-b border-border pb-4">
            <p className="text-[0.75rem] text-text-secondary uppercase tracking-widest mb-1">Email</p>
            <p className="text-[1.1rem] font-medium">{user.email}</p>
          </div>

          {/* Dummy Orders Section for Phase 4 */}
          <div className="border-b border-border pb-4">
            <p className="text-[0.75rem] text-text-secondary uppercase tracking-widest mb-3">Recent Orders</p>
            <p className="text-[0.95rem] text-text-muted italic">You have no recent orders.</p>
          </div>

          <button 
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full h-12 bg-transparent text-text border border-text text-[0.85rem] font-semibold tracking-[0.1em] uppercase cursor-pointer transition-all duration-300 hover:bg-text hover:text-white mt-8"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
