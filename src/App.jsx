import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import GamePage from "./pages/GamePage";
import SetupPage from "./pages/SetupPage";
import EventEditorPage from "./pages/EventEditorPage";
import SettingsPage from "./pages/SettingsPage";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/event/new" element={<EventEditorPage />} />
        <Route path="/event/:id/edit" element={<EventEditorPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
