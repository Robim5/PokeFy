import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPokemonProducts } from '../utils/pokemonData';
import { useCart } from '../context/CartContext';
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'pokemon';
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let found = null;
      if (type === 'pokemon') {
        const all = await getPokemonProducts();
        found = all.find(p => p.id === id);
      } else {
        // buscar produto comum especifico, usa id da fake store API
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            found = {
                id: data.id,
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                rating: data.rating,
                type: 'common'
            };
        } catch (e) {
            console.error(e);
        }
      }
      setProduct(found);
      setLoading(false);
    };
    load();
  }, [id, type]);

  if (loading) return <div className="container text-center" style={{ marginTop: '4rem' }}>A Carregar</div>;
  if (!product) return <div className="container text-center" style={{ marginTop: '4rem' }}>Produto nao foi encontrado</div>;

  const handleAdd = () => {
    addToCart(product, qty);
  };

  return (
    <div className="container fade-in" style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
      
      {/* imagem produto */}
      <div style={{ flex: '1 1 400px', backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
      </div>

      {/* detalhes produto */}
      <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{product.title}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>€ {product.price.toFixed(2)}</span>
           {product.rating && (
             <div style={{ display: 'flex', alignItems: 'center', color: 'var(--warning)' }}>
               <FaStar /> <span style={{ marginLeft: '0.5rem', color: 'var(--text-primary)' }}>{product.rating.rate} de 5 {product.rating.count} reviews</span>
             </div>
           )}
        </div>

        <p style={{ lineHeight: 1.6, opacity: 0.9, fontSize: '1.1rem' }}>
          {product.description}
        </p>

        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
           <div style={{ marginBottom: '1rem' }}>
             <strong>Disponibilidade</strong> <span style={{ color: 'var(--success)' }}>Em Stock Simulado</span>
           </div>
           
           <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <strong>Quantidade</strong>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '8px' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '0.2rem 0.6rem' }}><FaMinus /></button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: '0.2rem 0.6rem' }}><FaPlus /></button>
             </div>
           </div>

           <button 
             onClick={handleAdd}
             style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}
           >
             Adicionar ao Carrinho
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
