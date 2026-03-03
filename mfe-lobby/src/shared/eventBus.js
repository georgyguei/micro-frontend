// src/shared/eventBus.js
// Implémentation d'un système pub/sub (publish/subscribe).
//
// Ce module est déclaré en SINGLETON dans le shared de chaque webpack.config.js.
// → Une seule instance existe dans le navigateur, partagée entre tous les MFEs.
// → mfe-lobby émet, mfe-header reçoit — via le même objet en mémoire.

const listeners = {};

const eventBus = {
  /**
   * S'abonner à un événement.
   * @param {string} event - Nom de l'événement (ex: 'game:joined')
   * @param {Function} callback - Fonction appelée à chaque émission
   * @returns {Function} Fonction de désabonnement (cleanup React useEffect)
   */
  on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);

    return () => {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    };
  },

  /**
   * Émettre un événement.
   * @param {string} event - Nom de l'événement
   * @param {*} data - Données à transmettre aux abonnés
   */
  emit(event, data) {
    console.log(`[EventBus] ${event}`, data); // ← validation CP4
    (listeners[event] || []).forEach(cb => cb(data));
  },
};

export default eventBus;
