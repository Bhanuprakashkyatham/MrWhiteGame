import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardSelection from "../components/CardSelection";
import { useGame } from "../context/GameContext";

export default function GamePage() {
  const navigate = useNavigate();
  const { activeEvent, selectedCategory } = useGame();

  useEffect(() => {
    if (!activeEvent) {
      navigate("/setup", { replace: true });
    }
  }, [activeEvent, navigate]);

  if (!activeEvent) return null;

  return (
    <CardSelection
      event={activeEvent}
      category={selectedCategory || "all"}
    />
  );
}
