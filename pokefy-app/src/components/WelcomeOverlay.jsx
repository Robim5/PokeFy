import React from 'react';

const WelcomeOverlay = ({ onStart }) => {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-primary)', transition: 'opacity 0.5s'
    }}>
      <h1 className="fade-in" style={{ fontSize: '2.5rem', marginBottom: '2rem', padding: '0 1rem' }}>
        Pronto para encomendar as descobertas "FIXES" e "MENOS FIXES"??
      </h1>
      <button 
        className="fade-in"
        onClick={onStart}
        style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
      >
        Começar
      </button>
    </div>
  );
};

export default WelcomeOverlay;
