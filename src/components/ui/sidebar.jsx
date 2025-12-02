"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import "./sidebar.css";


export default function Sidebar({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
             className="sidebar-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="sidebar-container"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex justify-end">
              <IconX
                className="cursor-pointer text-black dark:text-white"
                size={28}
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Sidebar Links */}
            <div className="mt-6 flex flex-col gap-4">
              <a href="/" className="text-lg font-medium">Home</a>
              <a href="/men" className="text-lg font-medium">Men</a>
              <a href="/women" className="text-lg font-medium">Women</a>
              <a href="/accessories" className="text-lg font-medium">Accessories</a>
              <a href="/account" className="text-lg font-medium">Account</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
