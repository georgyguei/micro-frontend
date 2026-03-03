// src/shared/eventBus.js
// Implémentation d'un système pub/sub (publish/subscribe).
//
// Ce module est déclaré en SINGLETON dans le shared de chaque webpack.config.js.
// → Une seule instance existe dans le navigateur, partagée entre tous les MFEs.
// → mfe-lobby émet, mfe-header reçoit — via le même objet en mémoire.

const listeners = {};

const eventBus = {
  on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
    return () => {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    };
  },

  emit(event, data) {
    console.log(`[EventBus] ${event}`, data);
    (listeners[event] || []).forEach(cb => cb(data));
  },
};

export default eventBus;
