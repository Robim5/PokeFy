import React from 'react';

const Footer = ({ onAuthorsClick }) => {
  return (
    <footer style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--bg-secondary)',
        marginTop: 'auto'
    }}>
      <p style={{ margin: 0, cursor: 'pointer' }} onClick={onAuthorsClick}>
        Feito com amor por <span style={{ color: 'var(--accent-secondary)' }}>Robim</span> e <span style={{ color: 'var(--accent-secondary)' }}>Bruno</span>
      </p>
    </footer>
  );
};

export default Footer;
