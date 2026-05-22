export const AVATARS = [
  { key: "detective", emoji: "🕵️", label: "Detective" },
  { key: "mask", emoji: "🎭", label: "Masked" },
  { key: "clown", emoji: "🤡", label: "Clown" },
  { key: "ninja", emoji: "🥷", label: "Ninja" },
  { key: "ghost", emoji: "👻", label: "Ghost" },
  { key: "fox", emoji: "🦊", label: "Fox" },
  { key: "wolf", emoji: "🐺", label: "Wolf" },
  { key: "raccoon", emoji: "🦝", label: "Raccoon" },
  { key: "tophat", emoji: "🎩", label: "Top Hat" },
  { key: "alien", emoji: "👽", label: "Alien" },
  { key: "villain", emoji: "🦹", label: "Villain" },
  { key: "wizard", emoji: "🧙", label: "Wizard" },
  { key: "robot", emoji: "🤖", label: "Robot" },
  { key: "cat", emoji: "🐱", label: "Cat" },
  { key: "penguin", emoji: "🐧", label: "Penguin" },
  { key: "crown", emoji: "👑", label: "Crown" },
];

const byKey = Object.fromEntries(AVATARS.map((a) => [a.key, a]));

export function getAvatar(key) {
  return byKey[key] || AVATARS[0];
}
