import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/ui/PageShell";
import Button from "../components/ui/Button";
import AvatarPicker from "../components/AvatarPicker";
import { AVATARS } from "../data/avatars";
import { useGame } from "../context/GameContext";

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 12;

function makePlayer(i) {
  return {
    id: `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    avatar: AVATARS[i % AVATARS.length].key,
  };
}

export default function EventEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { events, createEvent, updateEvent } = useGame();

  const existing = useMemo(
    () => (id ? events.find((e) => e.id === id) : null),
    [id, events]
  );

  const [eventName, setEventName] = useState(existing?.name || "");
  const [players, setPlayers] = useState(
    existing?.players?.length
      ? existing.players.map((p) => ({ ...p }))
      : Array.from({ length: 3 }, (_, i) => makePlayer(i))
  );
  const [openAvatarFor, setOpenAvatarFor] = useState(null);

  useEffect(() => {
    if (id && !existing) {
      // edit target missing — bounce back
      navigate("/settings", { replace: true });
    }
  }, [id, existing, navigate]);

  const updatePlayer = (pid, patch) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, ...patch } : p))
    );
  };

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return;
    setPlayers((prev) => [...prev, makePlayer(prev.length)]);
  };

  const removePlayer = (pid) => {
    if (players.length <= MIN_PLAYERS) return;
    setPlayers((prev) => prev.filter((p) => p.id !== pid));
  };

  const canSave =
    eventName.trim().length > 0 &&
    players.length >= MIN_PLAYERS &&
    players.every((p) => p.name.trim().length > 0);

  const handleSave = () => {
    if (!canSave) return;
    if (existing) {
      updateEvent(existing.id, { name: eventName, players });
    } else {
      createEvent({ name: eventName, players });
    }
    navigate(existing ? "/settings" : "/setup");
  };

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-5 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white text-sm font-semibold flex items-center gap-1"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-md">
            {existing ? "Edit Roster" : "New Roster"}
          </h1>
          <div className="w-12" />
        </div>

        {/* Event name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white/80 mb-2 ml-1">
            Roster Name
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g. Friday Crew, Set of 6"
            className="w-full px-4 py-3 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:border-white/60 focus:bg-white/20 transition"
          />
        </div>

        {/* Players list */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white/90">
            Players ({players.length})
          </h2>
          <Button
            size="sm"
            variant="secondary"
            onClick={addPlayer}
            disabled={players.length >= MAX_PLAYERS}
          >
            + Add Player
          </Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {players.map((p, idx) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 flex items-center gap-3"
              >
                <button
                  onClick={() =>
                    setOpenAvatarFor(openAvatarFor === p.id ? null : p.id)
                  }
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-party-pink to-party-orange flex items-center justify-center text-2xl shrink-0 shadow-md hover:scale-105 transition"
                  title="Change avatar"
                >
                  {AVATARS.find((a) => a.key === p.avatar)?.emoji || "❓"}
                </button>

                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePlayer(p.id, { name: e.target.value })}
                  placeholder={`Player ${idx + 1}`}
                  className="flex-1 px-3 py-2 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none"
                />

                <button
                  onClick={() => removePlayer(p.id)}
                  disabled={players.length <= MIN_PLAYERS}
                  className="w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-rose-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                  title="Remove player"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Inline avatar picker drawer */}
          <AnimatePresence>
            {openAvatarFor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white/80">
                      Pick an avatar
                    </span>
                    <button
                      onClick={() => setOpenAvatarFor(null)}
                      className="text-white/60 hover:text-white text-sm"
                    >
                      Done
                    </button>
                  </div>
                  <AvatarPicker
                    value={
                      players.find((p) => p.id === openAvatarFor)?.avatar
                    }
                    onChange={(key) => {
                      updatePlayer(openAvatarFor, { avatar: key });
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Save bar */}
        <div className="mt-10 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave} size="lg">
            {existing ? "Save Changes" : "Create Roster"}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
