import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const EVENTS_KEY = "mw_events";
const ACTIVE_EVENT_KEY = "mw_active_event_id";
const CATEGORY_KEY = "mw_selected_category";

const GameContext = createContext(null);

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function GameProvider({ children }) {
  const [events, setEvents] = useState(() => safeRead(EVENTS_KEY, []));
  const [activeEventId, setActiveEventIdState] = useState(() =>
    safeRead(ACTIVE_EVENT_KEY, null)
  );
  const [selectedCategory, setSelectedCategoryState] = useState(() =>
    safeRead(CATEGORY_KEY, "all")
  );

  useEffect(() => safeWrite(EVENTS_KEY, events), [events]);
  useEffect(() => safeWrite(ACTIVE_EVENT_KEY, activeEventId), [activeEventId]);
  useEffect(() => safeWrite(CATEGORY_KEY, selectedCategory), [selectedCategory]);

  const createEvent = ({ name, players }) => {
    const newEvent = {
      id: uid(),
      name: name.trim() || "Untitled Event",
      players: players.map((p) => ({
        id: p.id || uid(),
        name: p.name.trim() || "Player",
        avatar: p.avatar,
      })),
      createdAt: Date.now(),
      lastPlayedAt: null,
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, patch) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              ...patch,
              players: patch.players
                ? patch.players.map((p) => ({
                    id: p.id || uid(),
                    name: (p.name || "").trim() || "Player",
                    avatar: p.avatar,
                  }))
                : e.players,
            }
          : e
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setActiveEventIdState((cur) => (cur === id ? null : cur));
  };

  const duplicateEvent = (id) => {
    const src = events.find((e) => e.id === id);
    if (!src) return null;
    const copy = {
      ...src,
      id: uid(),
      name: `${src.name} (copy)`,
      players: src.players.map((p) => ({ ...p, id: uid() })),
      createdAt: Date.now(),
      lastPlayedAt: null,
    };
    setEvents((prev) => [...prev, copy]);
    return copy;
  };

  const setActiveEvent = (id) => setActiveEventIdState(id);
  const setSelectedCategory = (key) => setSelectedCategoryState(key);

  const touchEventPlayed = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, lastPlayedAt: Date.now() } : e))
    );
  };

  const activeEvent = useMemo(
    () => events.find((e) => e.id === activeEventId) || null,
    [events, activeEventId]
  );

  const value = {
    events,
    activeEvent,
    activeEventId,
    selectedCategory,
    createEvent,
    updateEvent,
    deleteEvent,
    duplicateEvent,
    setActiveEvent,
    setSelectedCategory,
    touchEventPlayed,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}
