import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

// cenas do carrinho
const Cart = ({ isOpen, onClose }) => {
	//estado do carrinho
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total, clearCart } = useCart();

  // não renderizar se fechado
  if (!isOpen) return null;

  // fundo escuro e posição fixa
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end'
    }}>
      {/* carrinho à direita */}
      <div className="fade-in" style={{
        width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-primary)',
        height: '100%', display: 'flex', flexDirection: 'column',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.2)'
      }}>
        {/* título e fechar */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Seu Carrinho</h2>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-primary)', padding: 0 }}><FaTimes size={24} /></button> {/* fecha o painel */}
        </div>

        {/* lista de artigos*/}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7 }}>O carrinho está vazio.</div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.type}`} style={{
                display: 'flex', gap: '1rem', marginBottom: '1rem',
                backgroundColor: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '8px'
              }}>
                <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: '4px', backgroundColor: '#fff' }} /> {/* imagem do produto */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{item.title}</h4> {/* título do produto */}
                  {/* preço e quantidade */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-secondary)' }}>€ {item.price.toFixed(2)}</span> {/* preço do artigo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.type, -1)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><FaMinus /></button> {/* diminuir quantidade */}
                      <span>{item.quantity}</span> {/* quantidade atual */}
                      <button onClick={() => updateQuantity(item.id, item.type, 1)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}><FaPlus /></button> {/* aumentar quantidade */}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id, item.type)} style={{ alignSelf: 'start', background: 'transparent', color: 'var(--error)', padding: '0.2rem' }}>
                    <FaTrash />
                </button> {/* remover item */}
              </div>
            ))
          )}
        </div>

        {/* resumo e final */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal</span>
              <span>€ {subtotal.toFixed(2)}</span> {/* subtotal */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Portes {shipping === 0 && '(Grátis)'}</span>
              <span>€ {shipping.toFixed(2)}</span> {/* portes */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem' }}>
              <span>Total</span>
              <span>€ {total.toFixed(2)}</span> {/* total */}
            </div>
            <button style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} onClick={() => alert('Checkout not implemented')}>
              Finalizar Compra
            </button> {/* checkout */}
            <button onClick={clearCart} style={{ width: '100%', marginTop: '0.5rem', background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)' }}>
                Limpar Carrinho
            </button> {/* limpa o carrinho */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
