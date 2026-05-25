import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/ui/PageShell";
import Button from "../components/ui/Button";
import ThemePicker from "../components/ThemePicker";

const popupMessages = [
  "Someone knows a different word...",
  "Are you the imposter?",
  "Trust no one.",
  "Find the odd one out.",
  "One player is Mr. White!",
  "Bluff like your life depends on it.",
  "The clues are in the words.",
];

export default function Home() {
  const navigate = useNavigate();
  const [popupText, setPopupText] = useState(null);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * popupMessages.length);
      setPopupText(popupMessages[random]);
      setTimeout(() => setPopupText(null), 2400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageShell>
      {/* Top-left quick theme toggle */}
      <motion.button
        onClick={() => setThemeOpen(true)}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260 }}
        className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl z-20 shadow-lg"
        title="Change theme"
        aria-label="Change theme"
      >
        🎨
      </motion.button>

      {/* Top-right settings gear */}
      <motion.button
        onClick={() => navigate("/settings")}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260 }}
        className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl z-20 shadow-lg"
        title="Settings"
        aria-label="Settings"
      >
        ⚙️
      </motion.button>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="mb-2"
        >
          <span className="text-6xl md:text-7xl drop-shadow-2xl inline-block animate-bounce-slow">
            🎭
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
          className="text-5xl md:text-7xl font-black mb-3 tracking-tight drop-shadow-2xl bg-gradient-to-r from-party-yellow via-party-pink to-party-orange bg-clip-text text-transparent"
        >
          Mr. White
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base md:text-lg text-white/85 mb-10 max-w-md font-medium"
        >
          One word is different. Bluff, accuse, and unmask the imposter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
          className="flex flex-col gap-3 items-center"
        >
          <Button size="lg" onClick={() => navigate("/setup")}>
            🎉 Play
          </Button>
          <button
            onClick={() => navigate("/settings")}
            className="text-white/70 hover:text-white text-sm font-semibold mt-2"
          >
            Manage rosters →
          </button>
        </motion.div>

        {/* Floating taunt popups */}
        <AnimatePresence>
          {popupText && (
            <motion.div
              key={popupText}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/90 text-party-deep text-sm font-bold px-4 py-2 rounded-full shadow-xl z-20"
            >
              {popupText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme picker modal */}
      <AnimatePresence>
        {themeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setThemeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black rounded-3xl p-5 md:p-6 max-w-lg w-full text-party-mint border border-party-pink/30 shadow-2xl shadow-black/60 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-extrabold">🎨 Pick a theme</h3>
                <button
                  onClick={() => setThemeOpen(false)}
                  className="text-party-mint/60 hover:text-party-mint text-sm px-2 py-1"
                >
                  Close
                </button>
              </div>
              <p className="text-sm text-party-mint/70 mb-4">
                Changes apply instantly to the whole app.
              </p>
              <ThemePicker />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
