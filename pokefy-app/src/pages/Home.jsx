import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CategoryCarousel from '../components/CategoryCarousel';
import { getPokemonProducts } from '../utils/pokemonData';
import { fetchCommonProducts } from '../utils/api';
import { FaSearch, FaSort } from 'react-icons/fa';

const POKEMON_CATEGORIES = ['games', 'dlc', 'plush', 'socks', 'tops', 'bottom'];

const Home = () => {
  const [activeTab, setActiveTab] = useState('pokemon');
  const [pokemonItems, setPokemonItems] = useState([]);
  const [commonItems, setCommonItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('az'); // az, price-asc, price-desc

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [pokeData, comData] = await Promise.all([
        getPokemonProducts(),
        fetchCommonProducts()
      ]);
      setPokemonItems(pokeData);
      setCommonItems(comData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filterAndSort = useCallback((items) => {
    let result = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortOrder === 'az') return a.title.localeCompare(b.title);
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

    return result;
  }, [searchTerm, sortOrder]);

  const filteredPokemon = useMemo(() => filterAndSort(pokemonItems), [pokemonItems, filterAndSort]);
  const filteredCommon = useMemo(() => filterAndSort(commonItems), [commonItems, filterAndSort]);

  // Group common items by category
  const commonCategories = useMemo(() => {
    const categories = {};
    filteredCommon.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    return categories;
  }, [filteredCommon]);

  return (
    <div className="container fade-in">
      
      {/* Landing / Hero Section */}
      <section style={{ 
          marginBottom: '3rem', padding: '3rem 2rem', 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--accent-primary) 100%)', 
          borderRadius: '16px', color: '#fff', textAlign: 'center',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
            position: 'absolute', top: -50, left: -50, width: 150, height: 150, 
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }}></div>
        <div style={{
            position: 'absolute', bottom: -30, right: -30, width: 200, height: 200, 
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }}></div>

        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff', position: 'relative', zIndex: 1 }}>
            {activeTab === 'pokemon' ? 'Mundo Pokémon' : 'Loja Geral'}
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {activeTab === 'pokemon' 
            ? 'Captura os melhores jogos, peluches e roupa temática!'
            : 'As melhores ofertas em eletrónica, moda e joalharia.'
          }
        </p>
      </section>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        
        {/* Tabs - Centered and Rounded Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setActiveTab('pokemon')}
            style={{ 
              backgroundColor: activeTab === 'pokemon' ? 'var(--accent-secondary)' : 'transparent',
              border: activeTab === 'pokemon' ? '2px solid var(--accent-secondary)' : '2px solid var(--border-color)',
              color: activeTab === 'pokemon' ? '#fff' : 'var(--text-secondary)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '30px', // Pills
              padding: '0.8rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: activeTab === 'pokemon' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Parte Pokémon
          </button>
          <button 
             onClick={() => setActiveTab('common')}
             style={{ 
               backgroundColor: activeTab === 'common' ? 'var(--accent-secondary)' : 'transparent',
               border: activeTab === 'common' ? '2px solid var(--accent-secondary)' : '2px solid var(--border-color)',
               color: activeTab === 'common' ? '#fff' : 'var(--text-secondary)',
               fontSize: '1.1rem',
               fontWeight: 'bold',
               borderRadius: '30px', // Pills
               padding: '0.8rem 2.5rem',
               cursor: 'pointer',
               transition: 'all 0.3s',
               boxShadow: activeTab === 'common' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
             }}
          >
            Parte Comum
          </button>
        </div>

        {/* Filters Bar */}
        <div style={{ 
            display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', 
            padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Pesquisar produto..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', padding: '0.8rem 0.8rem 0.8rem 3rem', 
                borderRadius: '8px', border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                fontSize: '1rem', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <FaSort /> <span className="hide-mobile">Ordenar por:</span>
            </div>
            <select 
              value={sortOrder} 
              onChange={e => setSortOrder(e.target.value)}
              style={{ 
                padding: '0.8rem', borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)',
                cursor: 'pointer', outline: 'none'
              }}
            >
              <option value="az">Nome (A-Z)</option>
              <option value="price-asc">Preço (Menor)</option>
              <option value="price-desc">Preço (Maior)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.2rem', opacity: 0.7 }}>
            <div className="spinner"></div> Carregando produtos...
        </div>
      ) : (
        <>
          {activeTab === 'pokemon' && (
            <div className="fade-in">
              {POKEMON_CATEGORIES.map(cat => {
                const products = filteredPokemon.filter(p => p.category === cat);
                if (products.length === 0) return null;
                return <CategoryCarousel key={cat} title={cat} products={products} />;
              })}
              {filteredPokemon.length === 0 && <p className="text-center" style={{ padding: '2rem' }}>Nenhum produto encontrado nesta categoria.</p>}
            </div>
          )}

          {activeTab === 'common' && (
             <div className="fade-in">
                {Object.keys(commonCategories).length > 0 ? (
                  Object.keys(commonCategories).map(cat => (
                    <CategoryCarousel key={cat} title={cat} products={commonCategories[cat]} />
                  ))
                ) : (
                  <p className="text-center" style={{ padding: '2rem' }}>Nenhum produto encontrado.</p>
                )}
             </div>
          )}
        </>
      )}

    </div>
  );
};

export default Home;
