// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const popupMessages = [
  "Someone knows a different word...",
  "Are you the imposter?",
  "Trust no one.",
  "Find the odd one out.",
  "One player is Mr. White!",
];

export default function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * popupMessages.length);
      setPopupText(popupMessages[random]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }, 5000); // show popup every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-black to-gray-900 text-white flex flex-col justify-center items-center">
      {/* Background floating animation */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white opacity-10 rounded-full absolute animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <h1 className="z-10 text-5xl md:text-6xl font-extrabold mb-4 tracking-wide drop-shadow-xl animate-pulse">
        🎭 Mr. White
      </h1>

      <p className="z-10 text-lg md:text-xl text-gray-300 mb-10 text-center max-w-md">
        One word is different... Can you find the imposter?
      </p>

      <button
        onClick={() => navigate("/game")}
        className="z-10 bg-white text-black text-xl font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        Play Game
      </button>

      {/* Floating popups */}
      {showPopup && (
        <div className="absolute top-10 right-10 bg-white text-black text-sm font-semibold px-4 py-2 rounded shadow-lg animate-fadeInOut z-20">
          {popupText}
        </div>
      )}
    </div>
  );
}
