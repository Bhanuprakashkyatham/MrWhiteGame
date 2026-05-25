import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getUniqueRandomPair } from "../utils/getUniqueWordPairs";
import { getCategory } from "../data/categories";
import { getAvatar } from "../data/avatars";
import PageShell from "./ui/PageShell";
import Button from "./ui/Button";
import GameCard from "./GameCard";
import { useGame } from "../context/GameContext";

export default function CardSelection({ event, category }) {
  const navigate = useNavigate();
  const { touchEventPlayed } = useGame();

  const [selectedWordPair, setSelectedWordPair] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [stage, setStage] = useState("claim"); // 'claim' | 'reveal'
  const [showOverlay, setShowOverlay] = useState(false);
  const [showStartGame, setShowStartGame] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [roundKey, setRoundKey] = useState(0);

  // (Re)deal the round — cards are dealt anonymously. Players will
  // claim their seat by picking themselves from the roster.
  useEffect(() => {
    const wordPair = getUniqueRandomPair(category);
    setSelectedWordPair(wordPair);

    const cards = Array.from({ length: event.players.length }, (_, i) => ({
      seat: i + 1,
      word: wordPair.black.word,
      wordEmoji: wordPair.black.emoji,
      wordDesc: wordPair.black.desc,
      role: "civilian",
      claimedBy: null,
      voted: false,
    }));

    const whiteIndex = Math.floor(Math.random() * cards.length);
    cards[whiteIndex].word = wordPair.white.word;
    cards[whiteIndex].wordEmoji = wordPair.white.emoji;
    cards[whiteIndex].wordDesc = wordPair.white.desc;
    cards[whiteIndex].role = "mrwhite";

    setPlayerCards(cards);
    setActiveCard(null);
    setStage("claim");
    setShowOverlay(false);
    setShowStartGame(false);
    setGameStarted(false);
    setVotedPlayer(null);
    setGameOver(false);
  }, [event, category, roundKey]);

  useEffect(() => {
    // Wait until the last player has dismissed their reveal modal
    // before prompting "Start Voting" — otherwise it pops on top of
    // the final reveal.
    if (
      !gameStarted &&
      !activeCard &&
      playerCards.length > 0 &&
      playerCards.every((c) => c.claimedBy)
    ) {
      setShowStartGame(true);
    }
  }, [playerCards, gameStarted, activeCard]);

  const getPlayerById = (id) =>
    event.players.find((p) => p.id === id) || null;

  const availablePlayers = (() => {
    const claimedIds = new Set(
      playerCards.filter((c) => c.claimedBy).map((c) => c.claimedBy)
    );
    return event.players.filter((p) => !claimedIds.has(p.id));
  })();

  const handleCardTap = (card) => {
    if (!card.claimedBy && !gameStarted) {
      setActiveCard(card);
      setStage("claim");
      return;
    }
    if (gameStarted && card.claimedBy && !card.voted && !gameOver) {
      setVotedPlayer(card);
    }
  };

  const handleClaim = (playerId) => {
    if (!activeCard) return;
    setPlayerCards((prev) =>
      prev.map((c) =>
        c.seat === activeCard.seat ? { ...c, claimedBy: playerId } : c
      )
    );
    setActiveCard((prev) => (prev ? { ...prev, claimedBy: playerId } : prev));
    setStage("reveal");
  };

  const confirmReveal = () => {
    setActiveCard(null);
    setStage("claim");
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 900);
  };

  const cancelClaim = () => {
    setActiveCard(null);
    setStage("claim");
  };

  const playAgain = () => {
    touchEventPlayed(event.id);
    setRoundKey((k) => k + 1);
  };

  const exitToSetup = () => {
    touchEventPlayed(event.id);
    navigate("/setup");
  };

  const categoryInfo = getCategory(category);
  const claimedCount = playerCards.filter((c) => c.claimedBy).length;
  const totalPlayers = playerCards.length;

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={exitToSetup}
            className="text-white/80 hover:text-white text-sm font-semibold"
          >
            ← Exit
          </button>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5">
            <span className="text-lg">{categoryInfo.emoji}</span>
            <span className="text-sm font-semibold">{categoryInfo.label}</span>
          </div>

          <div className="text-xs text-white/70">
            {gameStarted ? "Voting" : `${claimedCount}/${totalPlayers}`}
          </div>
        </div>

        {/* Phase label */}
        <div className="text-center mb-5">
          <motion.h2
            key={gameStarted ? "vote" : "reveal"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-extrabold drop-shadow-md"
          >
            {gameStarted
              ? "🗳️ Who is Mr. White?"
              : "🤫 Pick a mystery card"}
          </motion.h2>
          <p className="text-white/70 text-sm mt-1">
            {gameStarted
              ? "Discuss, then tap a player to accuse."
              : "Tap any card, then choose yourself from the roster."}
          </p>
        </div>

        {/* Card grid */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {playerCards.map((card, idx) => {
            const claimedPlayer = card.claimedBy
              ? getPlayerById(card.claimedBy)
              : null;
            return (
              <GameCard
                key={card.seat}
                unclaimed={!card.claimedBy}
                player={claimedPlayer}
                seat={card.seat}
                voted={card.voted}
                dimmed={
                  (gameStarted && card.voted) || gameOver
                }
                index={idx}
                onClick={() => handleCardTap(card)}
              />
            );
          })}
        </div>
      </div>

      {/* Claim + Reveal modal (two stages) */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              key={stage}
              initial={{ scale: 0.7, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black rounded-3xl shadow-2xl shadow-black/60 text-party-mint text-center w-full max-w-md p-6 border border-party-pink/40"
            >
              {stage === "claim" && (
                <>
                  <div className="text-3xl mb-1">🎭</div>
                  <div className="text-sm uppercase tracking-widest text-party-mint/70 mb-1">
                    Card #{activeCard.seat}
                  </div>
                  <h2 className="text-2xl font-black mb-1">Who are you?</h2>
                  <p className="text-xs text-party-mint/60 mb-5">
                    Tap your icon to claim this seat.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-5 max-h-72 overflow-y-auto px-1">
                    {availablePlayers.map((p, i) => {
                      const av = getAvatar(p.avatar);
                      return (
                        <motion.button
                          key={p.id}
                          type="button"
                          onClick={() => handleClaim(p.id)}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, type: "spring", stiffness: 280 }}
                          whileHover={{ scale: 1.06, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-party-pink/60 hover:bg-white/[0.08] transition"
                        >
                          <div className="text-3xl drop-shadow">{av.emoji}</div>
                          <div className="text-xs font-semibold text-party-mint truncate max-w-full">
                            {p.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <Button variant="ghost" onClick={cancelClaim}>
                    Cancel
                  </Button>
                </>
              )}

              {stage === "reveal" && activeCard.claimedBy && (
                <>
                  <div className="text-3xl mb-1">
                    {getAvatar(getPlayerById(activeCard.claimedBy)?.avatar).emoji}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-party-mint/70 mb-1">
                    {getPlayerById(activeCard.claimedBy)?.name}
                  </div>
                  <div className="text-xs text-party-mint/60 mb-4">
                    Your secret word
                  </div>

                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.12, type: "spring", stiffness: 260 }}
                    className="text-6xl md:text-7xl mb-2 drop-shadow-lg"
                  >
                    {activeCard.wordEmoji}
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
                    className="text-3xl md:text-4xl font-black mb-2 drop-shadow-lg bg-gradient-to-r from-party-yellow to-party-mint bg-clip-text text-transparent"
                  >
                    {activeCard.word}
                  </motion.div>

                  {activeCard.wordDesc && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 }}
                      className="text-sm text-party-mint/80 italic mb-5 px-2"
                    >
                      {activeCard.wordDesc}
                    </motion.p>
                  )}

                  <p className="text-xs text-party-mint/60 mb-4 italic">
                    Remember it. Don't say it out loud.
                  </p>

                  <Button size="lg" onClick={confirmReveal}>
                    Got it
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pass device overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="text-center"
            >
              <div className="text-6xl mb-3 animate-bounce">🤝</div>
              <div className="text-2xl font-black text-white drop-shadow-xl">
                Pass to the next player
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start game modal */}
      <AnimatePresence>
        {showStartGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black rounded-3xl p-7 text-center max-w-sm w-full text-party-mint border border-party-pink/30 shadow-2xl shadow-black/60"
            >
              <div className="text-5xl mb-3">🎬</div>
              <h2 className="text-2xl font-black mb-2">All set!</h2>
              <p className="text-white/80 mb-6">
                Everyone's peeked their word. Time to talk it out.
              </p>
              <Button
                size="lg"
                variant="success"
                onClick={() => {
                  setShowStartGame(false);
                  setGameStarted(true);
                }}
              >
                Start Voting
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vote result modal */}
      <AnimatePresence>
        {votedPlayer && selectedWordPair && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black rounded-3xl p-6 text-center max-w-sm w-full text-party-mint border border-party-pink/30 shadow-2xl shadow-black/60"
            >
              <div className="text-5xl mb-2">
                {getAvatar(getPlayerById(votedPlayer.claimedBy)?.avatar).emoji}
              </div>
              <div className="text-lg font-bold mb-1">
                {getPlayerById(votedPlayer.claimedBy)?.name}
              </div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
                className={`text-2xl font-black my-4 ${
                  votedPlayer.role === "mrwhite"
                    ? "text-party-yellow"
                    : "text-party-mint"
                }`}
              >
                {votedPlayer.role === "mrwhite"
                  ? "🎯 Mr. White!"
                  : "❌ Not Mr. White"}
              </motion.div>

              <Button
                size="lg"
                variant={
                  votedPlayer.role === "mrwhite"
                    ? "danger"
                    : "secondary"
                }
                onClick={() => {
                  if (votedPlayer.role === "mrwhite") {
                    setVotedPlayer(null);
                    setGameOver(true);
                  } else {
                    const targetSeat = votedPlayer.seat;
                    setVotedPlayer(null);
                    setPlayerCards((prev) =>
                      prev.map((c) =>
                        c.seat === targetSeat ? { ...c, voted: true } : c
                      )
                    );
                  }
                }}
              >
                {votedPlayer.role === "mrwhite"
                  ? "End Game"
                  : "Continue"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game over modal */}
      <AnimatePresence>
        {gameOver && selectedWordPair && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220 }}
              className="bg-gradient-to-br from-party-purple via-party-deep to-black rounded-3xl p-6 text-center max-w-md w-full text-party-mint border border-party-pink/30 shadow-2xl shadow-black/60"
            >
              <div className="text-5xl mb-2 animate-wiggle inline-block">
                🎉
              </div>
              <h2 className="text-2xl font-black mb-1">
                Mr. White was caught!
              </h2>
              <p className="text-white/70 text-sm mb-5">
                Words this round
              </p>
              <div className="space-y-2 max-h-72 overflow-y-auto mb-5 px-1">
                {playerCards.map((c) => {
                  const isWhite = c.role === "mrwhite";
                  const player = getPlayerById(c.claimedBy);
                  return (
                    <div
                      key={c.seat}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                        isWhite
                          ? "bg-rose-500/30 border border-rose-300/50"
                          : "bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xl">
                          {player ? getAvatar(player.avatar).emoji : "❓"}
                        </span>
                        <span className="font-semibold truncate">
                          {player?.name || `Seat #${c.seat}`}
                        </span>
                        {isWhite && (
                          <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full shrink-0">
                            Mr. White
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 font-bold shrink-0">
                        <span className="text-lg">{c.wordEmoji}</span>
                        <span>{c.word}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="secondary" onClick={exitToSetup}>
                  Exit
                </Button>
                <Button onClick={playAgain}>Play Again</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
