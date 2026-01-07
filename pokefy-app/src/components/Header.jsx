import React from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMoon, FaSun, FaInfo } from 'react-icons/fa';

const Header = ({ onInfoClick, onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{
        padding: '1rem 2rem',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'var(--accent-secondary)' }}>PokeFy</Link>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button onClick={onInfoClick} style={{ borderRadius: '50%', width: 40, height: 40, padding: 0, fontSize: '1.2rem' }} aria-label="About Project">
          !
        </button>

        <button onClick={toggleTheme} style={{ background: 'transparent', color: 'var(--text-primary)', fontSize: '1.2rem', padding: '0.5rem' }}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        <button 
          onClick={onCartClick} 
          style={{ 
              position: 'relative', 
              background: 'transparent', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem', 
              padding: '0.5rem',
              border: 'none'
          }}>
          <FaShoppingCart />
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: -5, right: -5,
              backgroundColor: 'var(--accent-secondary)', color: '#fff',
              borderRadius: '50%', fontSize: '0.8rem', width: '20px', height: '20px',
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
