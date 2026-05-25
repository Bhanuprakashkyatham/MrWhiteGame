/**
 * Each theme defines:
 *   - colors: overrides for the six --color-party-* CSS variables.
 *     These propagate through every existing `bg-party-*`, `text-party-*`,
 *     `border-party-*` etc. class without code changes.
 *   - shell: visual config consumed by PageShell (base gradient, focal glow,
 *     counter glow, vignette darkness, grain opacity). Lets each theme have
 *     a distinct backdrop without hardcoding.
 *   - swatch: 3 colors used to render the theme picker preview card.
 */

export const THEMES = [
  {
    key: "midnight",
    label: "Midnight & Champagne",
    mood: "Calm · Focused · Lounge",
    colors: {
      "party-pink": "#d4af37",
      "party-purple": "#1f2937",
      "party-orange": "#b8741a",
      "party-yellow": "#e4c068",
      "party-mint": "#e8e6e1",
      "party-deep": "#0b0e1a",
    },
    shell: {
      base: "#0b0e1a",
      gradient: null,
      glowColor: "rgba(212,175,55,0.7)",
      counterGlowColor: "rgba(31,41,55,0.9)",
      vignetteAlpha: 0.55,
      grainOpacity: 0.05,
      topAccent: "rgba(212,175,55,0.35)",
    },
    swatch: ["#0b0e1a", "#1f2937", "#d4af37"],
  },
  {
    key: "sunset",
    label: "Sunset Glow",
    mood: "Warm · Playful · Party",
    colors: {
      "party-pink": "#ec4899",
      "party-purple": "#be185d",
      "party-orange": "#f97316",
      "party-yellow": "#fbbf24",
      "party-mint": "#fde68a",
      "party-deep": "#1a1147",
    },
    shell: {
      base: "#1a1147",
      gradient:
        "linear-gradient(180deg, #1a1147 0%, #4c1d52 28%, #9f1239 52%, #ec4899 72%, #f97316 88%, #fbbf24 100%)",
      glowColor: "rgba(253,164,175,0.55)",
      counterGlowColor: "rgba(249,115,22,0.45)",
      vignetteAlpha: 0.35,
      grainOpacity: 0.07,
      topAccent: "rgba(251,191,36,0.35)",
    },
    swatch: ["#1a1147", "#ec4899", "#fbbf24"],
  },
  {
    key: "aurora",
    label: "Aurora Mint",
    mood: "Fresh · Cool · Modern",
    colors: {
      "party-pink": "#06b6d4",
      "party-purple": "#155e75",
      "party-orange": "#10b981",
      "party-yellow": "#5eead4",
      "party-mint": "#ecfeff",
      "party-deep": "#0c0a2e",
    },
    shell: {
      base: "#0c0a2e",
      gradient:
        "linear-gradient(180deg, #0c0a2e 0%, #134e4a 55%, #064e3b 100%)",
      glowColor: "rgba(94,234,212,0.45)",
      counterGlowColor: "rgba(16,185,129,0.35)",
      vignetteAlpha: 0.5,
      grainOpacity: 0.06,
      topAccent: "rgba(94,234,212,0.4)",
    },
    swatch: ["#0c0a2e", "#06b6d4", "#5eead4"],
  },
  {
    key: "crimson",
    label: "Crimson Velvet",
    mood: "Dramatic · Mystery · Theatre",
    colors: {
      "party-pink": "#fcd34d",
      "party-purple": "#7f1d1d",
      "party-orange": "#b91c1c",
      "party-yellow": "#fde68a",
      "party-mint": "#fee2e2",
      "party-deep": "#0c0204",
    },
    shell: {
      base: "#0c0204",
      gradient: null,
      glowColor: "rgba(252,211,77,0.4)",
      counterGlowColor: "rgba(127,29,29,0.6)",
      vignetteAlpha: 0.65,
      grainOpacity: 0.08,
      topAccent: "rgba(252,211,77,0.35)",
    },
    swatch: ["#0c0204", "#7f1d1d", "#fcd34d"],
  },
  {
    key: "synthwave",
    label: "Synthwave Neon",
    mood: "Bold · Arcade · Retro",
    colors: {
      "party-pink": "#ff006e",
      "party-purple": "#3a0ca3",
      "party-orange": "#fb5607",
      "party-yellow": "#ffbe0b",
      "party-mint": "#caf0f8",
      "party-deep": "#05010f",
    },
    shell: {
      base: "#05010f",
      gradient:
        "linear-gradient(180deg, #05010f 0%, #1d0e44 45%, #3a0ca3 100%)",
      glowColor: "rgba(255,0,110,0.5)",
      counterGlowColor: "rgba(6,255,165,0.35)",
      vignetteAlpha: 0.55,
      grainOpacity: 0.1,
      topAccent: "rgba(255,0,110,0.5)",
    },
    swatch: ["#05010f", "#ff006e", "#06ffa5"],
  },
];

export const DEFAULT_THEME_KEY = "midnight";

const byKey = Object.fromEntries(THEMES.map((t) => [t.key, t]));

export function getTheme(key) {
  return byKey[key] || byKey[DEFAULT_THEME_KEY];
}
