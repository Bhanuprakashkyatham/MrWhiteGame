import React from "react";
import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "bg-gradient-to-b from-[#e6c466] via-party-pink to-[#a8841f] text-party-deep shadow-lg shadow-amber-900/40 hover:shadow-amber-500/30 ring-1 ring-amber-300/30",
  secondary:
    "bg-white/[0.06] text-party-mint border border-white/15 backdrop-blur-md hover:bg-white/[0.1] hover:border-white/25",
  ghost:
    "bg-transparent text-party-mint/70 hover:text-party-mint hover:bg-white/[0.05]",
  danger:
    "bg-gradient-to-b from-rose-600 to-rose-800 text-white shadow-lg shadow-rose-900/40 ring-1 ring-rose-400/30",
  success:
    "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-300/30",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm rounded-full",
  md: "px-5 py-2.5 text-base rounded-full",
  lg: "px-8 py-3.5 text-lg rounded-full font-bold",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...rest
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      className={`${SIZES[size]} ${VARIANTS[variant]} font-semibold tracking-wide transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
