// Casino-chip style — each category reads as a deep, rich tile against
// the dark elegant background. No bright pastels.
export const CATEGORIES = [
  {
    key: "all",
    label: "All",
    emoji: "🎲",
    gradient: "from-amber-700 via-amber-600 to-yellow-700",
  },
  {
    key: "food",
    label: "Food & Drink",
    emoji: "🍔",
    gradient: "from-orange-800 via-amber-700 to-yellow-800",
  },
  {
    key: "tech",
    label: "Tech",
    emoji: "💻",
    gradient: "from-slate-700 via-slate-600 to-cyan-800",
  },
  {
    key: "nature",
    label: "Nature",
    emoji: "🌿",
    gradient: "from-emerald-800 via-emerald-700 to-teal-800",
  },
  {
    key: "entertainment",
    label: "Entertainment",
    emoji: "🎬",
    gradient: "from-indigo-900 via-purple-800 to-fuchsia-900",
  },
  {
    key: "household",
    label: "Household",
    emoji: "🛋️",
    gradient: "from-stone-700 via-amber-800 to-red-900",
  },
  {
    key: "clothing",
    label: "Clothing",
    emoji: "👕",
    gradient: "from-rose-900 via-pink-800 to-fuchsia-900",
  },
  {
    key: "misc",
    label: "Surprise",
    emoji: "✨",
    gradient: "from-violet-900 via-indigo-800 to-blue-900",
  },
];

const byKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export function getCategory(key) {
  return byKey[key] || CATEGORIES[0];
}
