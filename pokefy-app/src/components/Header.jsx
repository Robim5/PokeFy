import React from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMoon, FaSun, FaInfo } from 'react-icons/fa';

// barra fixa top
const Header = ({ onInfoClick, onCartClick }) => {
  // usar tema
  const { theme, toggleTheme } = useTheme();
  // usar idioma
  const { language, setLanguage, t } = useLanguage();
  // usar carrinho
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // contar itens

  return (
    // barra topo fixa
    <header style={{
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
        gap: '0.5rem'
    }}>
      {/* logo home */}
      <div className="logo" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'var(--accent-secondary)' }}>PokeFy</Link>
      </div>

      <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1.5rem)', alignItems: 'center' }}>
        
        {/* seletor lingua */}
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <button 
            onClick={() => setLanguage('pt')} 
            style={{ 
              fontWeight: language === 'pt' ? 'bold' : 'normal',
              color: language === 'pt' ? 'var(--accent-secondary)' : 'var(--text-primary)',
              background: 'transparent', border: 'none', cursor: 'pointer', 
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              padding: '0.3rem'
            }}
          >
            PT
          </button>
          <button 
            onClick={() => setLanguage('fr')} 
            style={{ 
              fontWeight: language === 'fr' ? 'bold' : 'normal',
              color: language === 'fr' ? 'var(--accent-secondary)' : 'var(--text-primary)',
              background: 'transparent', border: 'none', cursor: 'pointer', 
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              padding: '0.3rem'
            }}
          >
            FR
          </button>
        </div>

        {/* botão info */}
        <button 
          onClick={onInfoClick} 
          style={{ 
            borderRadius: '50%', 
            width: 'clamp(32px, 8vw, 40px)', 
            height: 'clamp(32px, 8vw, 40px)', 
            padding: 0, 
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} 
          aria-label={t('aboutProject')}
        >
          {/* bot info */}!
        </button>

        {/* toggle tema */}
        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'transparent', 
            color: 'var(--text-primary)', 
            fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
            padding: '0.3rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        {/* abrir carrinho */}
        <button 
          onClick={onCartClick} 
          style={{ 
              position: 'relative', 
              background: 'transparent', 
              color: 'var(--text-primary)', 
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
              padding: '0.3rem',
              border: 'none',
              display: 'flex',
              alignItems: 'center'
          }}>
          <FaShoppingCart />
          {/* badge itens */}
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: -5, right: -5,
              backgroundColor: 'var(--accent-secondary)', color: '#fff',
              borderRadius: '50%', fontSize: '0.7rem', 
              width: '18px', height: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
