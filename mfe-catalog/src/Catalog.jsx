import React from 'react';
import eventBus from 'shared/eventBus';
import './Catalog.css';

const products = [
  { id: 1, name: 'Skin Légendaire', price: 999, icon: '🐉' },
  { id: 2, name: 'Épée en Bois', price: 50, icon: '🗡️' },
  { id: 3, name: 'Potion de Soin', price: 100, icon: '🧪' },
  { id: 4, name: 'Armure en Fer', price: 500, icon: '🛡️' },
  { id: 5, name: 'Monture: Loup', price: 2000, icon: '🐺' },
  { id: 6, name: 'Pass VIP', price: 1500, icon: '⭐' },
];

function Catalog() {
  const handleAddToCart = (product) => {
    eventBus.emit('cart:add', { id: product.id, name: product.name, price: product.price });
  };

  return (
    <section className="catalog">
      <h2 className="catalog-title">Boutique</h2>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-icon">{product.icon}</div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price} 💰</p>
            <button
              className="button buy-btn"
              onClick={() => handleAddToCart(product)}
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalog;
