import React, { useEffect, useState } from "react";
import { getUniqueRandomPair } from "../utils/getUniqueWordPairs";

export default function CardSelection({ count }) {
  
  const [selectedWordPair, setSelectedWordPair] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [enteredName, setEnteredName] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showStartGame, setShowStartGame] = useState(false);


  /*phase 2 of game, voting phase*/
  const [gameStarted, setGameStarted] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);




  useEffect(() => {
    const wordPair = getUniqueRandomPair();
    setSelectedWordPair(wordPair);

    // 2. Create default cards
    const cards = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      playerName: "",
      word: wordPair.black,
      revealed: false,
      voted: false
    }));
    console.log(count);
    // 3. Assign Mr. White (one gets the white word)
    const whiteIndex = Math.floor(Math.random() * count);
    cards[whiteIndex].word = wordPair.white;

    setPlayerCards(cards);
  }, [count]);

    useEffect(() => {
        if (!gameStarted && playerCards.length > 0 && playerCards.every((card) => card.revealed)) {
            setShowStartGame(true);
        }
    }, [playerCards]);


  const handleCardAllocation = (card) =>{
    setShowModal(true);
    setActiveCard(card);
    setEnteredName(card.playerName)
  }

  const handleVote = (card) => {
    if (!selectedWordPair || gameOver) return;

    setVotedPlayer(card);
 };


  return (
    <>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
            {playerCards.map((card) => (
                <div
                key={card.id}
                className={`w-24 h-32 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold cursor-pointer ${
                card.revealed && !card.voted ? "bg-green-300 cursor-not-allowed" : "hover:bg-blue-100"
                }`}
                onClick={()=>{if (!card.revealed){handleCardAllocation(card);} 
                    else if (gameStarted) {
                        if(!card.voted){
                            handleVote(card); // voting phase
                        }
                        
                    }
                }}
                >
                {card.playerName === "" ? "?" : card.playerName}
                </div>
            ))}
        </div>
        {showModal && activeCard && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                <h2 className="text-xl font-bold mb-4">Your Word</h2>
                <p className="text-3xl mb-4">{activeCard.word}</p>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                    className="w-full border rounded p-2 mb-4"
                />

                <button
                    onClick={() => {
                        const updatedCards = playerCards.map((card) =>
                            card.id === activeCard.id ? { ...card, playerName: enteredName,revealed: true } : card
                        );
                        setPlayerCards(updatedCards);
                        setShowModal(false);
                        setActiveCard(null);
                        setEnteredName("");
                        setShowOverlay(true);
                        // Hide the overlay after 2 seconds
                        setTimeout(() => setShowOverlay(false), 500);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
                </div>
            </div>
        )}

        {showOverlay && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                <div className="bg-white p-4 rounded shadow-lg text-xl font-semibold">
                    Pass the device to the next player...
                </div>
            </div>
        )}

        {showStartGame && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold mb-4">All players are ready!</h2>
                <p className="mb-4">Click below to start the game.</p>
                <button
                    onClick={() => {
                    setShowStartGame(false); // or navigate to game phase
                    setGameStarted(true);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Start Game
                </button>
                </div>
            </div>
        )}

        {votedPlayer && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold mb-2">🔍 Voting Result</h2>
                <p className="text-xl mb-2">{votedPlayer.playerName}</p>
                <p className={`mb-4 font-semibold ${votedPlayer.word === selectedWordPair.white ? 'text-red-600' : 'text-green-700'}`}>
                    {votedPlayer.word === selectedWordPair.white ? "🎯 This player is Mr. White!" : "❌ Not Mr. White"}
                </p>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                    if (votedPlayer.word === selectedWordPair.white) {
                        setVotedPlayer(null);
                        setGameOver(true); // Trigger game end
                    } else {
                        setVotedPlayer(null); // Just close the popup
                        const updatedCards = playerCards.map((card)=>{
                            return card.id === votedPlayer.id ? {...card, voted:true}:card
                        })
                        setPlayerCards(updatedCards);
                    }
                    }}
                >
                    {votedPlayer.word === selectedWordPair.white ? "End Game" : "Close"}
                </button>
                </div>
            </div>
        )}


        {gameOver && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">🎉 Mr. White has been caught!</h2>
                <p className="mb-4">Game Over</p>
                {playerCards.map((card)=>{
                    return(
                        <>
                            {card.word === selectedWordPair.white
                            ? <p className="mb-2 text-red-600">{card.playerName} : {card.word}</p>
                            :
                            <p className="mb-2 text-zinc-950">{card.playerName} : {card.word}</p>
                            }
                            
                        </>
                    )
                })}
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                    window.location.reload(); // Or reset states to start new round
                    }}
                >
                    Play Again
                </button>
                </div>
            </div>
        )}


    </>
  );

  
}
