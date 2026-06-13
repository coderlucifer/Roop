import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
             className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-0 left-0 h-screen w-[18rem] bg-white z-[200] p-6 flex flex-col shadow-[4px_0_20px_rgba(0,0,0,0.1)] overflow-y-auto overflow-x-hidden scrollbar-thin dark:bg-[#121212] dark:text-white"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex justify-end mb-4">
              <IconX
                className="cursor-pointer transition-transform duration-200 hover:scale-110 text-black dark:text-white"
                size={28}
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Sidebar Links */}
            <div className="mt-6 flex flex-col gap-5">
              <Link to="/" className="text-[1.1rem] text-[#222] font-medium no-underline transition-all duration-200 hover:text-black hover:translate-x-1 dark:text-[#e7e7e7] dark:hover:text-white" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/shop?category=Men" className="text-[1.1rem] text-[#222] font-medium no-underline transition-all duration-200 hover:text-black hover:translate-x-1 dark:text-[#e7e7e7] dark:hover:text-white" onClick={() => setOpen(false)}>Men</Link>
              <Link to="/shop?category=Women" className="text-[1.1rem] text-[#222] font-medium no-underline transition-all duration-200 hover:text-black hover:translate-x-1 dark:text-[#e7e7e7] dark:hover:text-white" onClick={() => setOpen(false)}>Women</Link>
              <Link to="/shop?category=Accessories" className="text-[1.1rem] text-[#222] font-medium no-underline transition-all duration-200 hover:text-black hover:translate-x-1 dark:text-[#e7e7e7] dark:hover:text-white" onClick={() => setOpen(false)}>Accessories</Link>
              <Link to="/account" className="text-[1.1rem] text-[#222] font-medium no-underline transition-all duration-200 hover:text-black hover:translate-x-1 dark:text-[#e7e7e7] dark:hover:text-white" onClick={() => setOpen(false)}>Account</Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
