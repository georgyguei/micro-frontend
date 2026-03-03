import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';

// Mode développement en isolation.
// Ce fichier n'est PAS utilisé quand le Shell charge ce remote.
// Il sert uniquement à l'équipe Header pour tester le composant seul
// sur http://localhost:3001 sans avoir besoin du Shell.
const root = createRoot(document.getElementById('root'));
root.render(<Header notifications={0} />);
