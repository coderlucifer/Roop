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
import "./sidebar.css";

export default function RightSidebar({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="sidebar-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* RIGHT PANEL */}
          <motion.div
            className="sidebar-container right-sidebar lv-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {/* CLOSE BUTTON */}
            <div className="lv-close">
              <IconX size={26} onClick={() => setOpen(false)} />
            </div>

            {/* TITLE */}
            <h2 className="lv-title">Call Us</h2>

            {/* DESCRIPTION */}
            <p className="lv-desc">
              Wherever you are, Roop Client Advisors will be delighted to assist you.
            </p>

            {/* CONTACT LIST */}
            <div className="lv-list">
              <div className="lv-item">
                <IconPhone size={22} />
                <span>+91 98765 43210</span>
              </div>

              <div className="lv-item">
                <IconMail size={22} />
                <span>Send an Email</span>
              </div>

              <div className="lv-item">
                <IconBrandWhatsapp size={22} />
                <span>WhatsApp</span>
              </div>

              <div className="lv-item">
                <IconMessageCircle size={22} />
                <span>Apple Message</span>
              </div>

              <div className="lv-item">
                <IconBrandMessenger size={22} />
                <span>Facebook Messenger</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="lv-divider"></div>

            {/* NEED HELP SECTION */}
            <h3 className="lv-subtitle">Need Help?</h3>

            <div className="lv-help-list">
              <a className="lv-help-item">FAQ</a>
              <a className="lv-help-item">CARE SERVICE</a>
              <a className="lv-help-item">RETURNS</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
