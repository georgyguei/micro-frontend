// bootstrap.js — Point d'entrée asynchrone (OBLIGATOIRE avec Module Federation)
//
// Module Federation résout les modules partagés (react, react-dom) de façon
// asynchrone. Si index.js importait React directement et exécutait du code
// synchrone, Webpack n'aurait pas encore déterminé quelle version utiliser
// (celle de ce remote, ou celle déjà chargée par le Shell).
//
// Solution : ce fichier fait un import() dynamique vers index.js.
// Cela crée une frontière de chunk asynchrone — Webpack peut négocier
// toutes les dépendances partagées AVANT d'exécuter le code applicatif.
//
// Sans ce pattern → erreur runtime :
// "Shared module is not available for eager consumption"

import('./index');
