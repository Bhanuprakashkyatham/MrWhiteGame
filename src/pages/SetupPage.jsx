import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/ui/PageShell";
import Button from "../components/ui/Button";
import CategoryPicker from "../components/CategoryPicker";
import { useGame } from "../context/GameContext";
import { getAvatar } from "../data/avatars";
import { getCategory } from "../data/categories";

export default function SetupPage() {
  const navigate = useNavigate();
  const {
    events,
    activeEventId,
    setActiveEvent,
    selectedCategory,
    setSelectedCategory,
  } = useGame();

  const [step, setStep] = useState("event"); // 'event' | 'category'

  useEffect(() => {
    if (events.length === 0) {
      navigate("/event/new", { replace: true });
    }
  }, [events.length, navigate]);

  const pickEvent = (id) => {
    setActiveEvent(id);
    setStep("category");
  };

  const pickCategory = (key) => {
    setSelectedCategory(key);
    navigate("/game");
  };

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-5 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => (step === "category" ? setStep("event") : navigate("/"))}
            className="text-white/80 hover:text-white text-sm font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-md">
            {step === "event" ? "Choose a Roster" : "Pick a Category"}
          </h1>
          <button
            onClick={() => navigate("/settings")}
            className="text-white/80 hover:text-white text-xl"
            title="Settings"
          >
            ⚙️
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === "event" && (
            <motion.div
              key="event"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev, i) => {
                  const isActive = ev.id === activeEventId;
                  return (
                    <motion.button
                      key={ev.id}
                      onClick={() => pickEvent(ev.id)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className={`text-left rounded-3xl p-5 bg-white/10 backdrop-blur-md border-2 ${
                        isActive
                          ? "border-party-yellow shadow-xl shadow-party-yellow/30"
                          : "border-white/20 hover:border-white/40"
                      } transition`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-extrabold text-white drop-shadow">
                          {ev.name}
                        </h3>
                        <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          {ev.players.length} players
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ev.players.slice(0, 8).map((p) => (
                          <div
                            key={p.id}
                            className="flex flex-col items-center w-14"
                            title={p.name}
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-party-pink to-party-orange flex items-center justify-center text-lg shadow">
                              {getAvatar(p.avatar).emoji}
                            </div>
                            <span className="text-[11px] text-white/90 font-medium mt-1 max-w-full truncate">
                              {p.name}
                            </span>
                          </div>
                        ))}
                        {ev.players.length > 8 && (
                          <div className="flex flex-col items-center w-14">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/80 font-semibold">
                              +{ev.players.length - 8}
                            </div>
                            <span className="text-[11px] text-white/60 mt-1">more</span>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}

                {/* + New roster card */}
                <motion.button
                  onClick={() => navigate("/event/new")}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: events.length * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-left rounded-3xl p-5 border-2 border-dashed border-white/40 bg-white/5 hover:bg-white/10 transition flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="text-4xl mb-2">➕</div>
                  <div className="text-white font-bold">New Roster</div>
                  <div className="text-white/60 text-xs mt-1">
                    Save players for next time
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "category" && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <p className="text-white/70 text-center mb-5">
                Roster: <span className="text-white font-semibold">
                  {events.find((e) => e.id === activeEventId)?.name}
                </span>{" "}
                · Last picked:{" "}
                <span className="text-white font-semibold">
                  {getCategory(selectedCategory).label}
                </span>
              </p>
              <CategoryPicker
                value={selectedCategory}
                onSelect={pickCategory}
              />
              <div className="text-center text-white/50 text-sm mt-6">
                Tap a category to start the game.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
