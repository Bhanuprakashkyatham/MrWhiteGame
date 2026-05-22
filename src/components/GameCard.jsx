import React from "react";
import { motion } from "framer-motion";
import { getAvatar } from "../data/avatars";

export default function GameCard({
  player,
  flipped,
  revealed,
  voted,
  dimmed,
  onClick,
  index = 0,
}) {
  const avatar = getAvatar(player.avatar);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -8 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 220 }}
      className="perspective"
      onClick={onClick}
    >
      <motion.div
        whileHover={!dimmed ? { scale: 1.05, y: -4 } : {}}
        whileTap={!dimmed ? { scale: 0.97 } : {}}
        className={`relative w-28 h-40 md:w-32 md:h-44 cursor-pointer preserve-3d transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        } ${dimmed ? "opacity-50" : ""}`}
      >
        {/* Front face — hidden card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-party-pink via-party-purple to-party-deep border-2 border-white/30 shadow-xl flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_8px,rgba(255,255,255,0.05)_8px,rgba(255,255,255,0.05)_16px)]" />
          <div className="relative text-4xl mb-2 drop-shadow-md">
            {avatar.emoji}
          </div>
          <div className="relative px-2 text-white font-semibold text-sm truncate max-w-[90%] text-center">
            {player.name}
          </div>
          {revealed && !voted && (
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-300/60" />
          )}
          {voted && (
            <div className="absolute top-2 right-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
              voted
            </div>
          )}
        </div>

        {/* Back face — placeholder if flipping shows something (unused in current flow; reserved) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white text-party-deep flex items-center justify-center shadow-xl">
          <span className="text-2xl">?</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
