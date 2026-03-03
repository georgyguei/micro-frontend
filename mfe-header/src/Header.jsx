import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Header.css';

// Ce composant est la "surface publique" de mfe-header.
// Il est exposé via webpack.config.js → exposes: { './Header': './src/Header.jsx' }
// Le Shell l'importe ainsi :
//   const Header = React.lazy(() => import('header/Header'));
function Header() {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // eventBus.on() retourne directement la fonction de désabonnement.
    // React appelle ce retour automatiquement quand le composant est démonté.
    // Sans ce cleanup → memory leak + double-écoute en React StrictMode.
    const unsubscribe = eventBus.on('game:joined', () => {
      // Forme fonctionnelle : évite les stale closures.
      // Si on écrivait setNotifications(notifications + 1), la valeur
      // de 'notifications' serait figée à 0 (valeur au moment de l'abonnement).
      setNotifications(n => n + 1);
    });

    return unsubscribe; // cleanup React
  }, []); // [] = s'abonne une seule fois au montage du composant

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">PixelArena</span>
      </div>

      <div className="navbar-menu">
        <button className="button">Lobby</button>
        <button className="button">Scores</button>
      </div>

      <div className="navbar-user">
        <span className="username">Joueur_42</span>
        <button className="button notification-btn">
          🔔
          {notifications > 0 && (
            <span className="badge">{notifications}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;

