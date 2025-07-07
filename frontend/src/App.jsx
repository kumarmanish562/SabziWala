import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { CartProvider } from './CartContext'

const App = () => {
  return (
   <CartProvider>
     <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
   </CartProvider>
  )
}

export default App