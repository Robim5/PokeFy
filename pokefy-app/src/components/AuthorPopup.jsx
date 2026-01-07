import React from 'react';
import Modal from './Modal';
import { FaPhone, FaGithub } from 'react-icons/fa';

const AuthorPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quem somos">
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Robim */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
              width: 100, height: 100, borderRadius: '50%', backgroundColor: '#333', margin: '0 auto 1rem',
              backgroundImage: 'url(https://ui-avatars.com/api/?name=Robim&background=random)', backgroundSize: 'cover'
          }}></div>
          <h3>Robim</h3>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <FaPhone /> 9xxxx-xxxx
          </p>
        </div>

        {/* Bruno */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
              width: 100, height: 100, borderRadius: '50%', backgroundColor: '#333', margin: '0 auto 1rem',
              backgroundImage: 'url(https://ui-avatars.com/api/?name=Bruno&background=random)', backgroundSize: 'cover'
          }}></div>
          <h3>Bruno</h3>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <FaPhone /> 9xxxx-xxxx
          </p>
        </div>

      </div>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', opacity: 0.8 }}>
        Desenvolvedores Frontend apaixonados por criar experiências incríveis.
      </p>
    </Modal>
  );
};

export default AuthorPopup;
