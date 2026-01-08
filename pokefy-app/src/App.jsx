import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeOverlay from './components/WelcomeOverlay';
import Cart from './components/Cart';
import InfoPopup from './components/InfoPopup';
import AuthorPopup from './components/AuthorPopup';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  // estados para controlo overlays
  const [started, setStarted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  
  // referência para o áudio de fundo
  const audioRef = useRef(null);

  // tocar música quando o utilizador iniciar o site
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [started]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
          {/* música de fundo em loop */}
          <audio ref={audioRef} loop>
            <source src="/assets/musica/Hip Shop.mp3" type="audio/mpeg" />
          </audio>
          
          {/* overlay inicial com btn iniciar */}
          {!started && <WelcomeOverlay onStart={() => setStarted(true)} />}
          
          {/* mostrar app so depois iniciar */}
          <div style={{ display: started ? 'flex' : 'none', flexDirection: 'column', minHeight: '100vh' }}>
            {/* header com butoes info e carrinho */}
            <Header 
              onInfoClick={() => setIsInfoOpen(true)} 
              onCartClick={() => setIsCartOpen(true)} 
            />
            
            {/* rotas principais */}
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </main>

            {/* footer com btn autores */}
            <Footer onAuthorsClick={() => setIsAuthorOpen(true)} />
            
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> {/* popup carrinho */}
            <InfoPopup isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} /> {/* popup info */}
            <AuthorPopup isOpen={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} /> {/* popup autores */}
          </div>

          <ToastContainer position="bottom-right" theme="colored" /> {/* toast canto inferior direito */}
        </Router>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
