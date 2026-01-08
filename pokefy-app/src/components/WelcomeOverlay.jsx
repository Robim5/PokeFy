import React from 'react';

const WelcomeOverlay = ({ onStart }) => {
  // overlay de welcome
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-primary)', transition: 'opacity 0.5s'
    }}>
      {/* overlay ecra inteiro */}
      <h1 className="fade-in" style={{ fontSize: '2.5rem', marginBottom: '2rem', padding: '0 1rem' }}>
        Pronto para encomendar as descobertas fofas e mignon??
      </h1>
      {/* btn começar */}
      <button 
        className="fade-in"
        onClick={onStart}
        style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
      >
        Ui, estou interessado!
      </button>
    </div>
  );
};

export default WelcomeOverlay;
