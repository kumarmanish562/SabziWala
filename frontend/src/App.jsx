import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { CartProvider } from './CartContext'


const ScrollToTop = () => {
  const { pathname } = useLocation;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  );

  useEffect(() => {
   const handler = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('authToken')));
    }
    window.addEventListener('authStateChanged', handler);

    return () => {
      window.removeEventListener('authStateChanged', handler);
    };
  }, []);

  return (
   <CartProvider>
    <ScrollToTop />
     <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
   </CartProvider>
  )
}

export default App