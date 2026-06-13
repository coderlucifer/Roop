"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconMessageCircle,
  IconBrandMessenger,
  IconX
} from "@tabler/icons-react";

export default function RightSidebar({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* RIGHT PANEL */}
          <motion.div
            className="fixed top-0 right-0 h-screen w-[18rem] bg-white text-[#111] font-sans z-[200] p-12 flex flex-col shadow-[-4px_0_20px_rgba(0,0,0,0.1)] overflow-y-auto overflow-x-hidden scrollbar-thin dark:bg-[#121212] dark:text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-8">
              <IconX size={26} className="cursor-pointer transition-transform duration-200 hover:scale-110 text-black dark:text-white" onClick={() => setOpen(false)} />
            </div>

            {/* TITLE */}
            <h2 className="text-[1.6rem] font-semibold mb-4">Call Us</h2>

            {/* DESCRIPTION */}
            <p className="text-[0.95rem] leading-[1.5rem] text-[#444] dark:text-gray-300 mb-8 max-w-[300px]">
              Wherever you are, Roop Client Advisors will be delighted to assist you.
            </p>

            {/* CONTACT LIST */}
            <div className="flex flex-col gap-[1.4rem] mb-10">
              <div className="flex items-center gap-4 text-base cursor-pointer">
                <IconPhone size={22} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-4 text-base cursor-pointer">
                <IconMail size={22} />
                <span>Send an Email</span>
              </div>

              <div className="flex items-center gap-4 text-base cursor-pointer">
                <IconBrandWhatsapp size={22} />
                <span>WhatsApp</span>
              </div>

              <div className="flex items-center gap-4 text-base cursor-pointer">
                <IconMessageCircle size={22} />
                <span>Apple Message</span>
              </div>

              <div className="flex items-center gap-4 text-base cursor-pointer">
                <IconBrandMessenger size={22} />
                <span>Facebook Messenger</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-px bg-[#ddd] dark:bg-white/15 my-8"></div>

            {/* NEED HELP SECTION */}
            <h3 className="text-[1.1rem] font-semibold mb-5">Need Help?</h3>

            <div className="flex flex-col gap-4">
              <a className="text-[0.95rem] cursor-pointer hover:underline">FAQ</a>
              <a className="text-[0.95rem] cursor-pointer hover:underline">CARE SERVICE</a>
              <a className="text-[0.95rem] cursor-pointer hover:underline">RETURNS</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
