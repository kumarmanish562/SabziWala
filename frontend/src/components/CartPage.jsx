import React from 'react'
import { useCart } from '../CartContext'
import { cartStyles } from '../assets/dummyStyles';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMinus, FiPlus, FiTrash, FiTrash2 } from 'react-icons/fi';

const CartPage = () => {

  const { cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();


  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  }

  if (cart.length === 0) {
    return <div className={cartStyles.pageContainer}>
      <div className={cartStyles.maxContainer}>
        <Link to="/" className={cartStyles.continueShopping}>
          <FiArrowLeft className='mr-2 ' />
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
          <Link to='/items' className={cartStyles.emptyCartButton}>
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
          <button onClick={clearCart} className={cartStyles.clearCartButton}>
            <FiTrash2 className='mr-2' />
            Clear Cart
          </button>
        </div>

        <div className={cartStyles.cartGrid}>
          <div className={cartStyles.cartItemsSection}>
            <div className={cartStyles.cartItemsGrid}>
              {cart.map((item) => (
                <div key={item.id} className={cartStyles.cartItemCard}>
                  <div className={cartStyles.cartItemImageContainer}>
                    <img src={item.image} alt={item.name} className={cartStyles.cartItemImage} />
                  </div>
                  <h3 className={cartStyles.cartItemName}>
                    {item.name}
                  </h3>
                  <p className={cartStyles.cartItemPrice}>
                    ₹{item.price.toFixed(2)}
                  </p>

                  {/* Add Control */}
                  <div className={cartStyles.cartItemQuantityContainer}>
                    <button onClick={() => handleQuantityChange(item.id, -1)} className={cartStyles.cartItemQuantityButton}>
                      <FiMinus />
                    </button>
                    <span className={cartStyles.cartItemQuantity}>
                      {item.quantity}
                    </span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className={cartStyles.cartItemQuantityButton}>
                      <FiPlus />
                    </button>

                  </div>

                  <button onClick={() => removeFromCart(item.id)} className={cartStyles.cartItemRemoveButton}>
                    <FiTrash2 className='mr-2' />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className={cartStyles.orderSummaryCard}>
              <h2 className={cartStyles.orderSummaryTitle}>
                Order Summary
              </h2>
              <div className=' space-y-4 text-sm sm:text-base'></div>
              <div className={cartStyles.orderSummaryRow}>
                <span className={cartStyles.orderSummaryLabel}>
                  SubTotal
                </span>
                <span className={cartStyles.orderSummaryValue}>
                  ₹{getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className={cartStyles.orderSummaryRow}>
                <span className={cartStyles.orderSummaryLabel}>
                  Shipping
                </span>
                <span className={cartStyles.orderSummaryValue}>
                  Free
                </span>
              </div>
              <div className={cartStyles.orderSummaryRow}>
                <span className={cartStyles.orderSummaryLabel}>
                  Taxes (5%)
                </span>
                <span className={cartStyles.orderSummaryValue}>
                  ₹{(getCartTotal() * 0.05).toFixed(2)}
                </span>
              </div>
              <div className={cartStyles.orderSummaryDivider}></div>

              <div className={cartStyles.orderSummaryTotalRow}>
                <span className={cartStyles.orderSummaryTotalLabel}>
                  Total
                </span>
                <span className={cartStyles.orderSummaryTotalValue}>
                  ₹{(getCartTotal() * 1.05).toFixed(2)}
                </span>
              </div>
              <button className={cartStyles.checkoutButton}>
                Proceed to Checkout
              </button>
              <div className={cartStyles.continueShoppingContainer}>
                <Link href="/" className={cartStyles.continueShopping}>
                <FiArrowLeft className='mr-1 ' />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage