import React from 'react'
import { useCart } from '../CartContext'
import { cartStyles } from '../assets/dummyStyles';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const CartPage = () => {

  const {cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();


  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(i => i.id === itemId);
    if(!item) return;

    const newQuantity = item.quantity + change;
    if(newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  }

  if(cart.length === 0) {
    return <div className={cartStyles.pageContainer}>
      <div className={cartStyles.maxContainer}>
      <Link to="/" className={cartStyles.continueShopping}>
      <FiArrowLeft className='mr-2 '/>
        Continue Shopping
      </Link>

      <div className={cartStyles.emptyCartContainer}>
        <div className={cartStyles.emptyCartIcon}>
          🛒
        </div>
        <h1 className={cartStyles.emptyCartHeading}>
          Your cart is empty
        </h1>
        <p className={cartStyles.emptyCartText}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to= '/items' className={cartStyles.emptyCartButton}>
          Browse Products
        </Link>
      </div>
      </div>
    </div>;
  }

  return (
    <div className={cartStyles.pageContainer}>
      <div className={cartStyles.maxContainerLarge}>
        <div className={cartStyles.headerContainer}>
          <h1 className={cartStyles.headerTitle}>
            Your Shopping Cart
          </h1>
        </div>
      </div>
    </div>
  )
}

export default CartPage