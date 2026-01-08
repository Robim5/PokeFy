import React from 'react';
import { FaTimes } from 'react-icons/fa';

//componente modal reutilizável
const Modal = ({ isOpen, onClose, title, children }) => {
  // não renderiza se fechado
  if (!isOpen) return null;

  {/* overlay escuro */}
  return (
    <div style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '1rem'
    }} onClick={onClose}>
      {/* caixa modal, não fecha ao clicar dentro */}
      <div className="scale-in modal-content" style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          borderRadius: '12px',
          padding: 'clamp(1rem, 3vw, 2rem)',
          maxWidth: '500px',
          width: '95%',
          position: 'relative',
          border: '1px solid var(--border-color)',
          maxHeight: '85vh',
          overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        {/* botão fechar canto */}
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '0.75rem', 
            right: '0.75rem', 
            background: 'transparent', 
            color: 'var(--text-primary)',
            padding: '0.25rem'
          }}
        >
            <FaTimes size={18} />
        </button>
        {title && <h2 style={{ marginBottom: '1rem', marginTop: 0, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
