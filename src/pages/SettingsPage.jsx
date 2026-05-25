import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/ui/PageShell";
import Button from "../components/ui/Button";
import ThemePicker from "../components/ThemePicker";
import { useGame } from "../context/GameContext";
import { getAvatar } from "../data/avatars";

function formatDate(ts) {
  if (!ts) return "never";
  try {
    return new Date(ts).toLocaleDateString();
  } catch {
    return "—";
  }
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { events, deleteEvent, duplicateEvent } = useGame();
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-5 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-white/80 hover:text-white text-sm font-semibold"
          >
            ← Home
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-md">
            Settings
          </h1>
          <div className="w-12" />
        </div>

        {/* Theme picker */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 md:p-6 mb-6">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-lg font-bold">Theme</h2>
            <span className="text-xs text-party-mint/60">
              Pick the vibe for your session
            </span>
          </div>
          <p className="text-sm text-party-mint/70 mb-4">
            Each theme reskins the whole app instantly. Try them out.
          </p>
          <ThemePicker />
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Your Rosters</h2>
            <Button size="sm" onClick={() => navigate("/event/new")}>
              + New
            </Button>
          </div>

          {events.length === 0 && (
            <div className="text-white/70 text-center py-8">
              No rosters yet. Tap{" "}
              <span className="font-bold text-white">+ New</span> to create one.
            </div>
          )}

          <ul className="space-y-3">
            <AnimatePresence>
              {events.map((ev) => (
                <motion.li
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  className="bg-white/10 border border-white/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-white text-lg truncate">
                        {ev.name}
                      </h3>
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                        {ev.players.length}p
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {ev.players.slice(0, 10).map((p) => (
                        <div
                          key={p.id}
                          className="flex flex-col items-center w-14"
                          title={p.name}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-lg">
                            {getAvatar(p.avatar).emoji}
                          </div>
                          <span className="text-[11px] text-white/90 font-medium mt-0.5 max-w-full truncate">
                            {p.name}
                          </span>
                        </div>
                      ))}
                      {ev.players.length > 10 && (
                        <div className="flex flex-col items-center w-14">
                          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/80 font-semibold">
                            +{ev.players.length - 10}
                          </div>
                          <span className="text-[11px] text-white/60 mt-0.5">more</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      Last played: {formatDate(ev.lastPlayedAt)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/event/${ev.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicateEvent(ev.id)}
                    >
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setConfirmDelete(ev)}
                    >
                      Delete
                    </Button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black text-party-mint rounded-3xl p-6 max-w-sm w-full border border-party-pink/30 shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-extrabold mb-2">Delete roster?</h3>
              <p className="text-white/80 mb-5">
                <span className="font-semibold">{confirmDelete.name}</span> will
                be removed. This can't be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteEvent(confirmDelete.id);
                    setConfirmDelete(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
