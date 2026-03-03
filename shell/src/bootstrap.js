// bootstrap.js — Point d'entrée asynchrone (OBLIGATOIRE avec Module Federation)
//
// Pourquoi ce fichier existe :
// Module Federation charge des modules partagés (React, react-dom) de façon
// asynchrone au démarrage. Si index.js importe React directement et exécute
// du code synchrone, Webpack n'a pas encore résolu quelle version de React
// utiliser (locale ou partagée par un remote).
//
// La solution : index.js fait `import('./bootstrap')` ce qui crée un "chunk"
// asynchrone. Webpack peut alors résoudre toutes les dépendances partagées
// AVANT d'exécuter le code applicatif.
//
// Sans ce pattern → erreur : "Shared module is not available for eager consumption"

import('./index');
