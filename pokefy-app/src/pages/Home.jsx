import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import CategoryCarousel from '../components/CategoryCarousel';
import { getPokemonProducts } from '../utils/pokemonData';
import { fetchCommonProducts } from '../utils/api';
import { FaSearch, FaSort } from 'react-icons/fa';

// categorias disponiveis poke
const POKEMON_CATEGORIES = ['games', 'dlc', 'plush', 'socks', 'tops', 'bottom'];

// pagina principal avec carrosseis e por categoria 
const Home = () => {
  const { t } = useLanguage(); // ter tradutor
  const [activeTab, setActiveTab] = useState('common'); // inicia em comuns
  const [pokemonItems, setPokemonItems] = useState([]); // itens poke
  const [commonItems, setCommonItems] = useState([]); // itens comuns
  const [loading, setLoading] = useState(true); // estado carregando

  // estados dos filtros
  const [searchTerm, setSearchTerm] = useState(''); // termo de busca
  const [sortOrder, setSortOrder] = useState('az'); // ordenacao

  // carrega dados ao montar
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // buscar ambos em paralelo para ser mais rapido
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

  // filtra e ordena produtos
  const filterAndSort = useCallback((items) => {
    // primeiro filtrar pelo termo de pesquisa
    let result = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // depois ordenar conforme selecionado
    result.sort((a, b) => {
      if (sortOrder === 'az') return a.title.localeCompare(b.title);
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

    return result;
  }, [searchTerm, sortOrder]);

  // memoriza resultados filtrados
  const filteredPokemon = useMemo(() => filterAndSort(pokemonItems), [pokemonItems, filterAndSort]);
  const filteredCommon = useMemo(() => filterAndSort(commonItems), [commonItems, filterAndSort]);

  // agrupa comuns por categoria
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
      
      {/* secao hero */}
      <section 
        className="hero-section"
        style={{ 
          marginBottom: 'clamp(1.5rem, 4vw, 3rem)', 
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)', 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--accent-primary) 100%)', 
          borderRadius: '12px', 
          color: '#fff', 
          textAlign: 'center',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
      }}>
        {/* circulos fundo para nao parecer feio */}
        <div style={{
            position: 'absolute', top: -50, left: -50, width: 120, height: 120, 
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }}></div>
        <div style={{
            position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, 
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
        }}></div>

        <h1 style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 3rem)', 
          marginBottom: '0.75rem', 
          color: '#fff', 
          position: 'relative', 
          zIndex: 1 
        }}>
            {activeTab === 'pokemon' ? t('heroTitlePokemon') : t('heroTitleCommon')}
        </h1>
        <p style={{ 
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', 
          maxWidth: '600px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 1,
          opacity: 0.95
        }}>
          {activeTab === 'pokemon' 
            ? t('heroDescPokemon')
            : t('heroDescCommon')
          }
        </p>
      </section>

      {/* tabs e filtros */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
        
        {/* tabs poke e comum*/}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="tab-button"
            onClick={() => setActiveTab('pokemon')}
            style={{ 
              backgroundColor: activeTab === 'pokemon' ? 'var(--accent-secondary)' : 'transparent',
              border: activeTab === 'pokemon' ? '2px solid var(--accent-secondary)' : '2px solid var(--border-color)',
              color: activeTab === 'pokemon' ? '#fff' : 'var(--text-secondary)',
              fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
              fontWeight: 'bold',
              borderRadius: '30px',
              padding: 'clamp(0.5rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 2.5rem)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: activeTab === 'pokemon' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {t('tabPokemon')}
          </button>
          <button 
            className="tab-button"
             onClick={() => setActiveTab('common')}
             style={{ 
               backgroundColor: activeTab === 'common' ? 'var(--accent-secondary)' : 'transparent',
               border: activeTab === 'common' ? '2px solid var(--accent-secondary)' : '2px solid var(--border-color)',
               color: activeTab === 'common' ? '#fff' : 'var(--text-secondary)',
               fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
               fontWeight: 'bold',
               borderRadius: '30px',
               padding: 'clamp(0.5rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 2.5rem)',
               cursor: 'pointer',
               transition: 'all 0.3s',
               boxShadow: activeTab === 'common' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
             }}
          >
            {t('tabCommon')}
          </button>
        </div>

        {/* barra filtro */}
        <div 
          className="filters-bar"
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: 'clamp(0.75rem, 2vw, 1.5rem)', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          {/* rechercher */}
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '1000px' }}>
            <FaSearch style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)'
            }} />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ 
                width: '95%', 
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.5rem, 1.5vw, 0.75rem) 2.5rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--text-primary)',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
                outline: 'none', 
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* dropdown commande */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'nowrap' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--text-secondary)', 
              whiteSpace: 'nowrap',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)'
            }}>
                <FaSort /> <span className="hide-mobile">{t('filterLabel')}</span>
            </div>
            <select 
              value={sortOrder} 
              onChange={e => setSortOrder(e.target.value)}
              style={{ 
                padding: 'clamp(0.4rem, 1vw, 0.75rem) clamp(0.5rem, 1.5vw, 1rem)', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--text-primary)',
                cursor: 'pointer', 
                outline: 'none', 
                fontSize: 'clamp(0.8rem, 2vw, 0.95rem)'
              }}
            >
              <option value="az">{t('sortAz')}</option>
              <option value="price-asc">{t('sortPriceAsc')}</option>
              <option value="price-desc">{t('sortPriceDesc')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* contenu principal */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1rem', opacity: 0.7 }}>
            <div className="spinner"></div> {t('loading')}
        </div>
      ) : (
        <>
          {/* tab poke */}
          {activeTab === 'pokemon' && (
            <div className="fade-in">
              {POKEMON_CATEGORIES.map(cat => {
                const products = filteredPokemon.filter(p => p.category === cat);
                if (products.length === 0) return null;
                return <CategoryCarousel key={cat} title={t(cat)} products={products} />;
              })}
              {filteredPokemon.length === 0 && (
                <p className="text-center" style={{ padding: '2rem' }}>{t('noProductsCategory')}</p>
              )}
            </div>
          )}

          {/* tab comuns */}
          {activeTab === 'common' && (
             <div className="fade-in">
                {Object.keys(commonCategories).length > 0 ? (
                  Object.keys(commonCategories).map(cat => (
                    <CategoryCarousel key={cat} title={t(cat)} products={commonCategories[cat]} />
                  ))
                ) : (
                  <p className="text-center" style={{ padding: '2rem' }}>{t('noProducts')}</p>
                )}
             </div>
          )}
        </>
      )}

    </div>
  );
};

export default Home;
