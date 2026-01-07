import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '1rem'
    }} onClick={onClose}>
      <div className="scale-in" style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          border: '1px solid var(--border-color)',
          maxHeight: '90vh',
          overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--text-primary)' }}>
            <FaTimes size={20} />
        </button>
        {title && <h2 style={{ marginBottom: '1rem', marginTop: 0 }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
