import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// card produto
const ProductCard = ({ product }) => {
  // usar carrinho
  const { addToCart } = useCart();

  // add carrinho sem navegar
  const handleAddToCart = (e) => {
    e.preventDefault(); // previne seguir link
    addToCart(product);
  };

  return (
    // link detalhe
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
        {/* imagem produto */}
        <div style={{ 
          height: 'clamp(120px, 25vw, 200px)', 
          padding: '0.75rem', 
          backgroundColor: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <img 
            src={product.image} 
            alt={product.title} 
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }} 
          /> {/* fallback imagem */}
        </div>
        
        {/* info produto */}
        <div style={{ padding: 'clamp(0.5rem, 2vw, 1rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* título 2 linhas */}
          <h4 style={{ 
            margin: '0 0 0.5rem', 
            flex: 1, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)'
          }}>
            {product.title}
          </h4>
          
          {/* preço e add carrinho */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ 
              fontWeight: 'bold', 
              color: 'var(--accent-secondary)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)'
            }}>
              € {product.price.toFixed(2)}
            </span>
            <button 
              onClick={handleAddToCart}
              style={{ 
                padding: '0.4rem', 
                borderRadius: '50%', 
                width: 'clamp(28px, 8vw, 35px)', 
                height: 'clamp(28px, 8vw, 35px)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 'clamp(0.7rem, 2vw, 1rem)'
              }}
              title="Adicionar ao Carrinho"
            >
              <FaCartPlus />
            </button> {/* add carrinho */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
