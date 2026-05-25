import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";

/**
 * Theme-aware page shell. Reads `theme.shell` from GameContext so each
 * theme can ship its own backdrop (solid vs gradient base, glow colors,
 * vignette darkness, grain) while the rest of the app's surfaces follow
 * the shared color tokens.
 */
export default function PageShell({ children, className = "" }) {
  const { theme } = useGame();
  const shell = theme.shell;

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-party-mint ${className}`}
    >
      {/* Base — solid or gradient depending on theme */}
      <div
        className="absolute inset-0"
        style={{
          background: shell.gradient || shell.base,
        }}
      />

      {/* Top focal glow — gently breathes */}
      <motion.div
        initial={false}
        animate={{ opacity: [0.18, 0.28, 0.18], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90vw",
          maxWidth: 900,
          height: 900,
          filter: "blur(120px)",
          background: `radial-gradient(circle at center, ${shell.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Counter glow at the bottom for balance */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120vw",
          height: 700,
          filter: "blur(140px)",
          opacity: 0.6,
          background: `radial-gradient(circle at center, ${shell.counterGlowColor} 0%, transparent 65%)`,
        }}
      />

      {/* Vignette — focuses the eye on the center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,${shell.vignetteAlpha}) 100%)`,
        }}
      />

      {/* Hairline top accent for header separation */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shell.topAccent} 50%, transparent 100%)`,
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: shell.grainOpacity,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 min-h-screen w-full">{children}</div>
    </div>
  );
}
