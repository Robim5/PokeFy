import React from 'react';
import Modal from './Modal';
import { FaGraduationCap } from 'react-icons/fa';

/** popup chique dos autores */
const AuthorPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quem somos">
      <div style={{ display: 'flex', gap: 'clamp(1rem, 4vw, 2rem)', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* robim */}
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div 
            className="author-photo"
            style={{ 
              width: 'clamp(80px, 20vw, 120px)', 
              height: 'clamp(80px, 20vw, 120px)', 
              borderRadius: '50%', 
              backgroundColor: '#333', 
              margin: '0 auto 0.75rem',
              backgroundImage: 'url(/assets/autores/robim.jpeg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              border: '3px solid var(--accent-secondary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}></div>
          <h3 style={{ marginBottom: '0.25rem', color: 'var(--accent-secondary)', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>Robim</h3>
          <p style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.4rem', 
            margin: '0.25rem 0',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            opacity: 0.9
          }}>
            <FaGraduationCap /> a046919
          </p>
        </div>

        {/* bruno */}
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div 
            className="author-photo"
            style={{ 
              width: 'clamp(80px, 20vw, 120px)', 
              height: 'clamp(80px, 20vw, 120px)', 
              borderRadius: '50%', 
              backgroundColor: '#333', 
              margin: '0 auto 0.75rem',
              backgroundImage: 'url(/assets/autores/bruno.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              border: '3px solid var(--accent-secondary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}></div>
          <h3 style={{ marginBottom: '0.25rem', color: 'var(--accent-secondary)', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>Bruno</h3>
          <p style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.4rem', 
            margin: '0.25rem 0',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            opacity: 0.9
          }}>
            <FaGraduationCap /> a047413
          </p>
        </div>

      </div>
      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.25rem', 
        opacity: 0.8, 
        fontStyle: 'italic',
        fontSize: 'clamp(0.85rem, 2vw, 1rem)'
      }}>
        The Best of Ismai.
      </p>
    </Modal>
  );
};

export default AuthorPopup;
