import React from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/categories";

export default function CategoryPicker({ value, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {CATEGORIES.map((c, i) => {
        const active = value === c.key;
        return (
          <motion.button
            key={c.key}
            type="button"
            onClick={() => onSelect(c.key)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 220 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className={`relative overflow-hidden rounded-3xl p-4 text-left shadow-xl bg-gradient-to-br ${c.gradient} ${
              active ? "ring-4 ring-white" : ""
            }`}
          >
            <div className="text-4xl drop-shadow-md mb-2">{c.emoji}</div>
            <div className="text-white font-bold text-lg drop-shadow-sm">
              {c.label}
            </div>
            <div className="absolute -right-4 -bottom-6 text-7xl opacity-20">
              {c.emoji}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
