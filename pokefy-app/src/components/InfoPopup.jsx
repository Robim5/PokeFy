// popup info do projeto
import React from 'react';
import Modal from './Modal';

//popup de info do projeto
const InfoPopup = ({ isOpen, onClose }) => {
  // estilos reutilizáveis
  const sectionStyle = {
    marginTop: '1rem',
    padding: 'clamp(0.75rem, 3vw, 1rem)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    lineHeight: '1.6'
  };

  const emojiStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    marginRight: '0.5rem'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sobre o Projeto">
      
      {/* introdução */}
      <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: '1.7' }}>
        Bem-vindo ao Lindo Maravilhoso <strong style={{ color: 'var(--accent-secondary)' }}>PokeFy</strong>! 💫
      </p>
      
      {/* história pokémon */}
      <div style={sectionStyle}>
        <p style={{ marginBottom: '0.75rem' }}>
          <span style={emojiStyle}>🎮</span>
          <strong>Uma tradição</strong>
        </p>
        <p style={{ opacity: 0.9, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
          Durante a disciplina, todos os nossos projetos tiveram algo em comum: 
          <em>Pokémon</em>. Então, com isso, tornou-se uma tradição nossa, tem que ter Pokémon no projeto. 
          Então, neste ultimo Projeto seria impossível nao fazer sem pokemon. 
          Mesmo que o foco principal seja a parte comum do e-commerce, 
          Nós fazemos as coisas com gosto e carinho (mais quando é pokemon)! 💛
        </p>
      </div>

      {/* sobre pokefy */}
      <div style={sectionStyle}>
        <p style={{ marginBottom: '0.75rem' }}>
          <span style={emojiStyle}>🛒</span>
          <strong>O que é o Pokefy?</strong>
        </p>
        <p style={{ opacity: 0.9, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
          É um e-commerce híbrido que junta o melhor do mundo Pokémon com produtos, como roupa, jogos e peluches, 
          mas também a componente séria que a disciplina exige. 
          E porque? Porque dá para ser profissional e divertido ao mesmo tempo! ❤️‍🔥
        </p>
      </div>

      {/* porquê francês */}
      <div style={sectionStyle}>
        <p style={{ marginBottom: '0.75rem' }}>
          <span style={emojiStyle}>🇫🇷</span>
          <strong>Porquê o francês?</strong>
        </p>
        <p style={{ opacity: 0.9, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
          Somos meninos sonhadores, e um dos nossos sonhos é ir para França um dia. 
          então pensámos: "porque não começar já a praticar?".
          Assim, o site ter francês como segunda língua é um pequeno passo 
          em direção a esse sonho (talvez), nunca se sabe onde a vida nos leva! 🌟
        </p>
      </div>

      {/* destaques técnicos */}
      <div style={{ ...sectionStyle, marginTop: '1.25rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>
          <span style={emojiStyle}>⚡</span>
          <strong>Destaques técnicos:</strong>
        </p>
        <ul style={{ 
          paddingLeft: '1.5rem', 
          opacity: 0.9, 
          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
          lineHeight: '1.8'
        }}>
          <li>Tema claro/escuro para os olhos</li>
          <li>Carrinho persistente que não se esquece de nada</li>
          <li>Api externa + dados locais bem organizados</li>
          <li>Responsivo para usar em qualquer lado</li>
          <li>Feito com React, Vite e Café</li>
          <li>Música de fundo boa </li>
        </ul>
      </div>

      {/* mensagem final */}
      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem', 
        fontStyle: 'italic', 
        opacity: 0.8,
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
      }}>
        Agradecemos a Professora por visitar o site! Esperamos que tenha gostado tanto de explorar como nós gostámos de criar. 
      </p>

    </Modal>
  );
};

export default InfoPopup;
