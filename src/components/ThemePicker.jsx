import React from "react";
import { motion } from "framer-motion";
import { THEMES } from "../data/themes";
import { useGame } from "../context/GameContext";

export default function ThemePicker({ onSelect }) {
  const { themeKey, setTheme } = useGame();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {THEMES.map((t, i) => {
        const active = t.key === themeKey;
        return (
          <motion.button
            key={t.key}
            type="button"
            onClick={() => {
              setTheme(t.key);
              onSelect?.(t.key);
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 240 }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative text-left rounded-2xl p-4 border transition ${
              active
                ? "border-party-pink/70 bg-white/[0.06]"
                : "border-white/10 hover:border-white/25 bg-white/[0.03]"
            }`}
          >
            {/* Swatch preview */}
            <div
              className="h-16 rounded-xl mb-3 overflow-hidden shadow-inner relative"
              style={{
                background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[1]} 55%, ${t.swatch[2]} 100%)`,
              }}
            >
              {/* Mock content silhouette */}
              <div className="absolute inset-0 flex items-center gap-1.5 px-3">
                <span
                  className="w-7 h-7 rounded-md"
                  style={{ background: t.swatch[2], opacity: 0.85 }}
                />
                <span
                  className="w-7 h-7 rounded-md"
                  style={{ background: t.swatch[1], opacity: 0.9 }}
                />
                <span
                  className="w-7 h-7 rounded-md"
                  style={{ background: t.swatch[2], opacity: 0.7 }}
                />
                <span className="ml-auto w-12 h-2.5 rounded-full bg-white/30" />
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-bold text-party-mint truncate">
                  {t.label}
                </div>
                <div className="text-xs text-party-mint/60 mt-0.5">
                  {t.mood}
                </div>
              </div>
              {active && (
                <span className="shrink-0 text-[10px] uppercase tracking-wider bg-party-pink/20 text-party-pink border border-party-pink/40 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
