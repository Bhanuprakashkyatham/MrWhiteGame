import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-purple-500 to-blue-600 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-6">🎭 Mr. White Game</h1>
      <p className="mb-8 text-lg">A game of mystery, bluff, and deduction!</p>
      <button
        onClick={() => navigate("/game")}
        className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
      >
        Start Game
      </button>
    </div>
  );
}
