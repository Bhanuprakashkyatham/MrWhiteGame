export const CATEGORIES = [
  {
    key: "all",
    label: "All",
    emoji: "🎲",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    key: "food",
    label: "Food & Drink",
    emoji: "🍔",
    gradient: "from-orange-400 via-amber-400 to-yellow-300",
  },
  {
    key: "tech",
    label: "Tech",
    emoji: "💻",
    gradient: "from-cyan-400 via-blue-500 to-indigo-500",
  },
  {
    key: "nature",
    label: "Nature",
    emoji: "🌿",
    gradient: "from-emerald-400 via-green-500 to-teal-500",
  },
  {
    key: "entertainment",
    label: "Entertainment",
    emoji: "🎬",
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
  },
  {
    key: "household",
    label: "Household",
    emoji: "🛋️",
    gradient: "from-amber-500 via-orange-500 to-red-500",
  },
  {
    key: "clothing",
    label: "Clothing",
    emoji: "👕",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-400",
  },
  {
    key: "misc",
    label: "Surprise",
    emoji: "✨",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
];

const byKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export function getCategory(key) {
  return byKey[key] || CATEGORIES[0];
}
