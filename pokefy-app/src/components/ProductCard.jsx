import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}?type=${product.type || 'pokemon'}`} style={{ color: 'inherit', display: 'block', height: '100%' }}>
      <div className="product-card" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ height: '200px', padding: '1rem', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
          />
        </div>
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.title}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--accent-secondary)' }}>€ {product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              style={{ padding: '0.5rem', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Adicionar ao Carrinho"
            >
              <FaCartPlus />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
