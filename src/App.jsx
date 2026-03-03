import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Lobby from './components/Lobby';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState(0);

  const handleJoinGame = (gameName) => {
    setNotifications(prev => prev + 1);
    alert(`Vous avez rejoint : ${gameName}`);
  };

  return (
    <div className="app">
      {/* ── Bannière CP2 : preuve que le Shell Module Federation est actif ── */}
      <div style={{
        background: '#10b981',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.05em',
      }}>
        ✅ Shell opérationnel — Module Federation actif
      </div>

      <Navbar notifications={notifications} />
      <main className="main-content">
        <Lobby onJoinGame={handleJoinGame} />
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
