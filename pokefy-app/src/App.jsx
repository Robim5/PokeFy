import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
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
  const [started, setStarted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          {!started && <WelcomeOverlay onStart={() => setStarted(true)} />}
          
          <div style={{ display: started ? 'flex' : 'none', flexDirection: 'column', minHeight: '100vh' }}>
            <Header 
              onInfoClick={() => setIsInfoOpen(true)} 
              onCartClick={() => setIsCartOpen(true)} 
            />
            
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </main>

            <Footer onAuthorsClick={() => setIsAuthorOpen(true)} />
            
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <InfoPopup isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
            <AuthorPopup isOpen={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} />
          </div>

          <ToastContainer position="bottom-right" theme="colored" />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
