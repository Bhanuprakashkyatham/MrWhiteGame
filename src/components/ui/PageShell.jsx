import React from "react";
import { motion } from "framer-motion";

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 40 + Math.random() * 120,
  delay: Math.random() * 4,
  hue: ["#ff4ecd", "#8b5cf6", "#ff8a3d", "#ffd23f", "#5eead4"][i % 5],
}));

export default function PageShell({ children, className = "" }) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-party-deep via-party-purple to-party-pink text-white ${className}`}
    >
      {/* Floating party bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {BUBBLES.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: 0, opacity: 0.0 }}
            animate={{
              y: [0, -24, 0],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{
              duration: 6 + (b.id % 4),
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full blur-2xl"
            style={{
              top: `${b.top}%`,
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              background: b.hue,
            }}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.5)_100%)]" />

      <div className="relative z-10 min-h-screen w-full">{children}</div>
    </div>
  );
}
