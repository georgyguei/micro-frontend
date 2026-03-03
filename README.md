# PixelArena - Checkpoint 1 : Le Bug du Lobby

## Contexte

Bienvenue chez **PixelArena** ! Vous venez d'etre embauche comme developpeur frontend.

Le developpeur precedent a quitte l'entreprise precipitamment. Son code... disons qu'il a ses particularites.

Votre manager vous demande une modification "simple" :

> "Change la couleur du bouton JOIN dans le Lobby. Le bleu ne va pas avec notre nouvelle charte graphique. Mets-le en **vert** (#10b981). Ca devrait prendre 5 minutes."
∏
## Installation

```bash
npm install
npm start
```

L'application demarre sur http://localhost:3000

## Votre Mission

### Objectif
Changer la couleur du bouton "JOIN" dans le Lobby de **bleu** (#3b82f6) vers **vert** (#10b981).

### Fichier a modifier
`src/components/Lobby.css`

### Ce que vous devez faire
1. Ouvrir `src/components/Lobby.css`
2. Trouver la classe `.button`
3. Changer `background: #3b82f6` en `background: #10b981`
4. Sauvegarder

### Resultat attendu
Seul le bouton "JOIN" du Lobby devrait devenir vert.

---

## Validation du Checkpoint

Apres avoir fait la modification, repondez a ces questions :

1. Le bouton "JOIN" est-il devenu vert ?
2. Les autres boutons ont-ils change de couleur aussi ?
3. Si oui, pourquoi selon vous ?

---

## Structure du projet

```
pixelarena-checkpoint1/
├── src/
│   ├── index.js
│   ├── App.jsx
│   ├── App.css
│   └── components/
│       ├── Navbar.jsx
│       ├── Navbar.css      <- Equipe Navbar
│       ├── Lobby.jsx
│       ├── Lobby.css       <- Equipe Lobby (MODIFIER ICI)
│       ├── Leaderboard.jsx
│       └── Leaderboard.css <- Equipe Leaderboard
├── public/
│   └── index.html
├── package.json
└── webpack.config.js
```

---

# CP2 — Le Shell

Télécharge le zip depuis le dossier partagé Teams et extrais-le.

```bash
npm install
npm start
```

---

## Mission

Ouvrir `webpack.config.js` et compléter les 3 TODOs :

**TODO 1 — Nommer le Shell**
```js
name: 'shell',
```

**TODO 2 — Préparer les remotes**
```js
remotes: {},
```

**TODO 3 — Partager React**
```js
shared: {
  react: { singleton: true, requiredVersion: '^18.2.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
},
```

---

## Validation

- `npm start` démarre sans erreur
- http://localhost:3000 affiche "Shell opérationnel"
- Push sur `checkpoint2-[nom-equipe]`

---

## Mission

### mfe-header/webpack.config.js — 4 TODOs

```js
name: 'mfeHeader',
filename: 'remoteEntry.js',
exposes: { './Navbar': './src/components/Navbar' },
shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
```

### shell/webpack.config.js — 1 TODO

```js
remotes: {
  mfeHeader: 'mfeHeader@http://localhost:3001/remoteEntry.js',
},
```

---

## Validation

- http://localhost:3000 affiche le Header chargé depuis le port 3001
- Push ta branche

---

# CP4 — La Babel

Télécharge le zip **checkpoint4** depuis Teams.

```bash
T1 : cd mfe-header && npm install && npm start   # 3001
T2 : cd mfe-lobby  && npm install && npm start   # 3002
T3 : cd shell      && npm install && npm start   # 3000
```

---

## Mission

Lobby et Header doivent communiquer via l'Event Bus (`shared/eventBus.js`).

**`mfe-lobby/src/components/Lobby.jsx`**
→ Quand on rejoint une partie, notifie l'eventBus

**`mfe-header/src/components/Navbar.jsx`**
→ Écoute l'événement et incrémente le badge
→ Hint : `eventBus.on()` retourne une fonction — utilise-la pour le cleanup React

---

## Validation

- Cliquer "Rejoindre" → badge notifications +1 dans le Header
- Console : `[EventBus] game:joined { ... }`

---

📤 Push ta branche

---

# CP5 — Le Catalogue

Télécharge le zip **checkpoint5** depuis Teams.

```bash
T1 : cd mfe-catalog && npm install && npm start  # 3003
T2 : cd mfe-header  && npm install && npm start  # 3001
T3 : cd mfe-lobby   && npm install && npm start  # 3002
T4 : cd shell       && npm install && npm start  # 3000
```

---

## Mission

Créer `mfe-catalog` de A à Z et le brancher sur le Shell.

**`mfe-catalog/webpack.config.js`**
→ 4 TODOs : configurer Module Federation (name, filename, exposes, shared)

**`mfe-catalog/src/components/Catalog.jsx`**
→ Notifier l'eventBus quand l'utilisateur ajoute un produit

**`shell/webpack.config.js`**
→ Déclarer `mfe-catalog` comme remote (port 3003)

**`shell/src/App.jsx`**
→ Importer et afficher le Catalog

---

## Validation

- `localhost:3000` → 6 produits s'affichent dans la Boutique
- Console : `[EventBus] cart:add { id, name, price }` au clic sur "Ajouter"

---

📤 Push ta branche

---

# CP6 — Le Panier

Télécharge le zip **checkpoint6** depuis Teams.

```bash
T1 : cd mfe-header  && npm install && npm start  # 3001
T2 : cd mfe-lobby   && npm install && npm start  # 3002
T3 : cd mfe-catalog && npm install && npm start  # 3003
T4 : cd mfe-cart    && npm install && npm start  # 3004
T5 : cd shell       && npm install && npm start  # 3000
```

---

## Mission

`mfe-cart/src/components/Cart.jsx` — 2 useEffects à compléter.

**useEffect 1 — écoute**
→ Abonne-toi à `cart:add` et ajoute chaque produit reçu au state `items`

**useEffect 2 — émission**
→ Quand `items` change, notifie l'eventBus que le panier a changé
→ L'événement doit contenir le nombre d'articles et le total

---

## Validation

- Cliquer "Ajouter" dans Catalog → item apparaît dans Cart
- Console : `[EventBus] cart:updated` visible à chaque ajout
- Push ta branche

---

# CP7 — L'Assemblage Final

Télécharge le zip depuis le dossier partagé Teams et extrais-le.

```bash
T1 : cd mfe-header  && npm install && npm start   # 3001
T2 : cd mfe-lobby   && npm install && npm start   # 3002
T3 : cd mfe-catalog && npm install && npm start   # 3003
T4 : cd mfe-cart    && npm install && npm start   # 3004
T5 : cd shell       && npm install && npm start   # 3000
```

---

## Mission

`mfe-header/src/components/Navbar.jsx` — 1 `useEffect`, 3 TODOs :

**TODO 1** — s'abonner à `game:joined` et incrémenter le badge notifications

**TODO 2** — s'abonner à `cart:updated` et mettre à jour le badge panier avec le `count`

**TODO 3** — retourner le cleanup des 2 abonnements

---

## Validation

- Rejoindre une partie → badge 🔔 +1
- Ajouter au panier → badge 🛒 +1
- Vider le panier → badge 🛒 = 0
- Push ta branche

---

Bonne chance !
