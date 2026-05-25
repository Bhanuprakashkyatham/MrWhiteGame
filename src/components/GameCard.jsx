import React from "react";
import { motion } from "framer-motion";
import { getAvatar } from "../data/avatars";

/**
 * Plays two visual roles:
 *  - `unclaimed`: anonymous mystery card showing `?` + seat number. Used
 *    during the initial deal so players pick at random.
 *  - claimed: shows the player's avatar + name. Used after a player
 *    picks themselves from the roster, and during the voting phase.
 */
export default function GameCard({
  player,
  unclaimed = false,
  seat,
  voted,
  dimmed,
  onClick,
  index = 0,
}) {
  const avatar = unclaimed ? null : getAvatar(player?.avatar);

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
        className={`relative w-28 h-40 md:w-32 md:h-44 cursor-pointer rounded-2xl border border-party-pink/40 shadow-xl shadow-black/60 overflow-hidden bg-gradient-to-br from-party-purple via-party-deep to-black transition-transform duration-300 ${
          dimmed ? "opacity-50" : ""
        }`}
      >
        {/* Champagne gloss highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.18),transparent_60%)]" />
        {/* Faint diagonal weave for texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_8px,rgba(212,175,55,0.04)_8px,rgba(212,175,55,0.04)_16px)]" />
        {/* Inner gold hairline */}
        <div className="absolute inset-2 rounded-xl border border-party-pink/15 pointer-events-none" />

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {unclaimed ? (
            <>
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl md:text-7xl font-black text-party-pink drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                ?
              </motion.div>
              <div className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-party-mint/40 font-semibold">
                #{seat}
              </div>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2 drop-shadow-lg">
                {avatar?.emoji}
              </div>
              <div className="px-2 text-party-mint font-semibold text-sm truncate max-w-[90%] text-center">
                {player?.name}
              </div>
              {!voted && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-party-pink shadow-lg shadow-party-pink/60" />
              )}
              {voted && (
                <div className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-party-pink/20 text-party-pink border border-party-pink/40 px-2 py-0.5 rounded-full">
                  voted
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
