import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

/**
 * CategoryCarousel Component
 * 
 * Improvements:
 * - Better arrow visibility (High Contrast).
 * - Arrows moved further out (-45px).
 * - Smooth scroll by card width.
 */
const CategoryCarousel = ({ title, products }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to toggle arrow visibility/state
  const checkScroll = () => {
    if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 5); // tolerance of 5px
        // Allow some float tolerance
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const firstCard = containerRef.current.firstElementChild;
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 250;
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

  if (!products || products.length === 0) return null;

  return (
    <div style={{ marginBottom: '3rem', position: 'relative', padding: '0 10px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            borderLeft: '5px solid var(--accent-secondary)', 
            paddingLeft: '1rem',
            margin: 0
        }}>
            {title.toUpperCase()}
        </h3>
        <span style={{ marginLeft: '1rem', fontSize: '0.9rem', opacity: 0.6 }}>({products.length} itens)</span>
      </div>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          style={{ 
            position: 'absolute', 
            left: '-45px', // Moved further out
            zIndex: 10, 
            opacity: canScrollLeft ? 1 : 0,
            pointerEvents: canScrollLeft ? 'auto' : 'none',
            cursor: 'pointer',
            width: '50px', 
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)', // Dark background for contrast
            color: '#fff', // White icon
            border: '2px solid var(--accent-primary)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.5rem', // Larger icon
            transition: 'all 0.3s',
            transform: canScrollLeft ? 'scale(1)' : 'scale(0.8)'
          }}
          aria-label="Scroll Left"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaChevronLeft />
        </button>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '1rem 0.5rem', // padding for card shadow
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {products.map(product => (
            <div key={product.id} style={{ flex: '0 0 auto', width: '250px' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          style={{ 
            position: 'absolute', 
            right: '-45px', // Moved further out
            zIndex: 10,
            opacity: canScrollRight ? 1 : 0,
            pointerEvents: canScrollRight ? 'auto' : 'none',
            cursor: 'pointer',
            width: '50px', 
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            color: '#fff',
            border: '2px solid var(--accent-primary)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s',
            transform: canScrollRight ? 'scale(1)' : 'scale(0.8)'
          }}
          aria-label="Scroll Right"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
