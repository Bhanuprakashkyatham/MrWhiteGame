import React from "react";
import { motion } from "framer-motion";

// Mesh gradient blobs — large, blurred, slowly drifting circles that
// paint a sunset sky behind the content. Each blob has its own loop so
// the background feels alive without becoming busy.
const BLOBS = [
  {
    color: "#fda4af", // peach
    size: 620,
    initial: { top: "-12%", left: "-10%" },
    drift: { x: [0, 40, 0], y: [0, 30, 0] },
    duration: 14,
    opacity: 0.55,
  },
  {
    color: "#ec4899", // hot coral
    size: 720,
    initial: { top: "18%", right: "-14%" },
    drift: { x: [0, -50, 0], y: [0, 40, 0] },
    duration: 16,
    opacity: 0.5,
  },
  {
    color: "#f97316", // vivid orange
    size: 700,
    initial: { bottom: "-18%", left: "-8%" },
    drift: { x: [0, 60, 0], y: [0, -30, 0] },
    duration: 18,
    opacity: 0.6,
  },
  {
    color: "#fbbf24", // gold
    size: 540,
    initial: { bottom: "-10%", right: "-6%" },
    drift: { x: [0, -40, 0], y: [0, -50, 0] },
    duration: 20,
    opacity: 0.45,
  },
  {
    color: "#9f1239", // ruby (mid-depth accent)
    size: 480,
    initial: { top: "32%", left: "30%" },
    drift: { x: [0, 30, -20, 0], y: [0, -25, 20, 0] },
    duration: 22,
    opacity: 0.35,
  },
];

export default function PageShell({ children, className = "" }) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-white ${className}`}
    >
      {/* Base linear sunset gradient (deep indigo → ruby → coral → amber → gold) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a1147 0%, #4c1d52 28%, #9f1239 52%, #ec4899 72%, #f97316 88%, #fbbf24 100%)",
        }}
      />

      {/* Animated mesh-gradient blobs for painted depth */}
      <div className="absolute inset-0 pointer-events-none">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              x: blob.drift.x,
              y: blob.drift.y,
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
            className="absolute rounded-full"
            style={{
              ...blob.initial,
              width: blob.size,
              height: blob.size,
              filter: "blur(80px)",
              opacity: blob.opacity,
              background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 70%)`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Subtle film-grain noise via CSS gradient (gives texture) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Top fade for header legibility */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,17,71,0.45) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen w-full">{children}</div>
    </div>
  );
}
