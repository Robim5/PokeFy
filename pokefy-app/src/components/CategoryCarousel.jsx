import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

const CategoryCarousel = ({ title, products }) => {
  // referencia container scroll
  const containerRef = useRef(null);
  // pode ir esquerda
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  // pode ir direita
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // é mobile??
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // atualizar setas visibilidade
  const checkScroll = () => {
    if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 5); // tolerância de 5px
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // resize e atualiza
  useEffect(() => {
    checkScroll();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      checkScroll();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  // scroll um card
  const scroll = (direction) => {
    if (containerRef.current) {
      const firstCard = containerRef.current.firstElementChild;
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 250; // largura card
      const gap = 16; 
      const scrollAmount = cardWidth + gap;

      const currentScroll = containerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      setTimeout(checkScroll, 400); 
    }
  };

  // sem produtos não mostra
  if (!products || products.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: 'clamp(1.5rem, 4vw, 3rem)', 
      position: 'relative', 
      padding: isMobile ? '0' : '0 10px' 
    }}>
      
      {/* mostrar título */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ 
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', 
            fontWeight: 'bold', 
            borderLeft: '4px solid var(--accent-secondary)', 
            paddingLeft: '0.75rem',
            margin: 0
        }}>
            {title.toUpperCase()}
        </h3>
        {/* mostrar contagem */}
        <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', opacity: 0.6 }}>
          ({products.length} {products.length === 1 ? 'item' : 'itens'})
        </span>
      </div>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

        {/* esconde em mobile */}  
        {/* ir esquerda */}
        {!isMobile && (
          <button 
            onClick={() => scroll('left')}
            className="carousel-arrow"
            style={{ 
              position: 'absolute', 
              left: '-20px',
              zIndex: 10, 
              opacity: canScrollLeft ? 1 : 0.3,
              pointerEvents: canScrollLeft ? 'auto' : 'none',
              cursor: canScrollLeft ? 'pointer' : 'default',
              width: '50px', 
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
              color: '#fff',
              border: '2px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: canScrollLeft ? 'scale(1)' : 'scale(0.8)'
            }}
            aria-label="Scroll Left"
            onMouseEnter={(e) => { if(canScrollLeft) e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaChevronLeft style={{ fontSize: '1.2rem', marginRight: '2px' }} />
          </button>
        )}

        {/* scroll horizontal */}
        <div 
          ref={containerRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '1rem 0.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          className="hide-scrollbar carousel-container"
        >
          {products.map(product => (
            <div 
              key={product.id} 
              style={{ 
                flex: '0 0 auto', 
                width: isMobile ? 'clamp(160px, 45vw, 200px)' : '250px',
                scrollSnapAlign: isMobile ? 'start' : 'none'
              }}
            >
              {/* mostrar card */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* esconde em mobile */}
        {/* ir direita */}
        {!isMobile && (
          <button 
            onClick={() => scroll('right')}
            className="carousel-arrow"
            style={{ 
              position: 'absolute', 
              right: '-20px',
              zIndex: 100,
              opacity: canScrollRight ? 1 : 0.3,
              pointerEvents: canScrollRight ? 'auto' : 'none',
              cursor: canScrollRight ? 'pointer' : 'default',
              width: '50px', 
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
              color: '#fff',
              border: '2px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: canScrollRight ? 'scale(1)' : 'scale(0.8)'
            }}
            aria-label="Scroll Right"
            onMouseEnter={(e) => { if(canScrollRight) e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaChevronRight style={{ fontSize: '1.2rem', marginLeft: '2px' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;
