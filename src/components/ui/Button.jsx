import React from "react";
import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-party-pink via-party-purple to-party-orange text-white shadow-lg shadow-party-purple/40 hover:shadow-party-pink/50",
  secondary:
    "bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/25",
  ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/10",
  danger:
    "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/40",
  success:
    "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/40",
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
