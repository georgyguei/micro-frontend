import React from 'react';
import Leaderboard from './components/Leaderboard';
import './App.css';

// Import des micro-frontends distants via Webpack Module Federation
const Header = React.lazy(() => import('header/Header'));
const Lobby = React.lazy(() => import('lobby/Lobby'));
const Catalog = React.lazy(() => import('catalog/Catalog'));

function App() {
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

      <React.Suspense fallback={<div style={{ padding: 20 }}>Chargement du Header...</div>}>
        <Header />
      </React.Suspense>

      <main className="main-content">
        <React.Suspense fallback={<div style={{ padding: 20 }}>Chargement du Lobby...</div>}>
          <Lobby />
        </React.Suspense>

        <Leaderboard />

        <React.Suspense fallback={<div style={{ padding: 20 }}>Chargement du Catalogue...</div>}>
          <Catalog />
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
