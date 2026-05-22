import wordPairs from "../data/wordPairs";

const STORAGE_KEY = "mw_used_indices";
const LEGACY_KEY = "usedWordIndices";

function readUsedMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) || {};
  } catch {
    // ignore
  }
  return {};
}

function writeUsedMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function getUniqueRandomPair(category = "all") {
  // Migrate legacy key once.
  if (localStorage.getItem(LEGACY_KEY)) {
    localStorage.removeItem(LEGACY_KEY);
  }

  const pool = wordPairs
    .map((pair, idx) => ({ pair, idx }))
    .filter(({ pair }) =>
      category === "all" ? true : pair.category === category
    );

  if (pool.length === 0) {
    // Safety fallback — return any pair if a bad category slipped in.
    const idx = Math.floor(Math.random() * wordPairs.length);
    return wordPairs[idx];
  }

  const map = readUsedMap();
  const usedSet = new Set(map[category] || []);

  // If every pair in this category is used, reset that category.
  if (usedSet.size >= pool.length) {
    usedSet.clear();
  }

  const available = pool.filter(({ idx }) => !usedSet.has(idx));
  const pick = available[Math.floor(Math.random() * available.length)];

  usedSet.add(pick.idx);
  map[category] = [...usedSet];
  writeUsedMap(map);

  return pick.pair;
}
