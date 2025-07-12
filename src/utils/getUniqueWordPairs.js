import wordPairs from "../data/wordPairs";

let usedIndices = new Set(JSON.parse(localStorage.getItem("usedWordIndices") || "[]"));

export function getUniqueRandomPair() {
  if (usedIndices.size >= wordPairs.length) {
    usedIndices.clear();
  }

  let index;
  do {
    index = Math.floor(Math.random() * wordPairs.length);
  } while (usedIndices.has(index));

  usedIndices.add(index);
  localStorage.setItem("usedWordIndices", JSON.stringify([...usedIndices]));
  return wordPairs[index];
}
