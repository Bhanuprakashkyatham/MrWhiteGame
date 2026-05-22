import React from "react";
import { motion } from "framer-motion";
import { AVATARS } from "../data/avatars";

export default function AvatarPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {AVATARS.map((a) => {
        const active = a.key === value;
        return (
          <motion.button
            key={a.key}
            type="button"
            onClick={() => onChange(a.key)}
            whileHover={{ scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.9 }}
            className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
              active
                ? "bg-gradient-to-br from-party-pink to-party-orange shadow-lg shadow-party-pink/50 ring-2 ring-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
            aria-label={a.label}
            title={a.label}
          >
            <span className="drop-shadow-sm">{a.emoji}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
