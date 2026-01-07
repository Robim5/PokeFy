import React from 'react';
import Modal from './Modal';

const InfoPopup = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sobre o Projeto">
      <p>Bem-vindo ao <strong>PokeFy</strong>!</p>
      <p>Um e-commerce híbrido que junta o melhor do mundo Pokémon com produtos do dia a dia.</p>
      <p>Explore a nossa coleção exclusiva de jogos, peluches e roupa temática, ou navegue pela nossa secção comum.</p>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
        <strong>Destaques:</strong>
        <ul style={{ paddingLeft: '1.2rem' }}>
            <li>Tema Claro/Escuro</li>
            <li>Carrinho Persistente</li>
            <li>API Externa + Mock Data</li>
        </ul>
      </div>
    </Modal>
  );
};

export default InfoPopup;
