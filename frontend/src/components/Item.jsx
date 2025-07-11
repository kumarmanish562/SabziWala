import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext';
import { itemsPageStyles} from '../assets/dummyStyles'
import { FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';




//Product card
const ProductCard = ({ item }) => {
  const{cart, addToCart, removeFromCart, updateQuantity } = useCart();
  // Get Current Qty of the Product
  const cartItem = cart.find(cartItem => cartItem._id === item._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  //Add to Cart Handler
  const handleAddToCart = () => {
    addToCart(item);
  };


  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(item);
    } else {
      updateQuantity(item.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
   <div className={itemsPageStyles.productCard}>
      <div className={itemsPageStyles.imageContainer}>
        <img src={item.image} alt={item.name} className={itemsPageStyles.productImage} />
        </div>

        <div className={itemsPageStyles.cardContent}>
          <div className={itemsPageStyles.titleContainer}>
            <h3 className={itemsPageStyles.productTitle}>
              {item.name}
            </h3>
            <span className={itemsPageStyles.organicTag}>
              Organic
              </span>
          </div>
          <p className={itemsPageStyles.productDescription}>
            {item.description || `Fresh organic ${item.name.toLowerCase()} sourced locally.`}
          </p>
          <div className={itemsPageStyles.priceContainer}>
            <span className={itemsPageStyles.currentPricePrice}>
              ₹{item.price.toFixed(2)}
            </span>
            <span className={itemsPageStyles.oldPrice}>
              ₹{(item.price * 1.15).toFixed(2)}
            </span>
            </div>

            <div className=' mt-3 '>
              {quantity > 0 ? (
                <div className={itemsPageStyles.quantityControls}>
                  <button  onClick={handleDecrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonLeft}`} >
                    <FiMinus />
                  </button>
                  <span className={itemsPageStyles.quantityValue}>{quantity}</span>
                  <button  onClick={handleIncrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonRight}`} >
                    <FiPlus />
                  </button>
                </div>
              ) : (
                <button onClick={handleAddToCart} className={itemsPageStyles.addButton}>
                 <span>Add to Cart</span>
                 <span className={itemsPageStyles.addButtonArrow}>
                  →
                 </span>
                </button>
              )}
            </div>
        </div>
      </div>
  );
};

const Item = () => {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  
  //Search query from url 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search') 
   if (query) {
      setSearchTerm(query);
    }
  }, [location]);

  //Enhance search functionality
  const itemsMatchSearch = (item, term) => {
    if (!term) return true; // If no search term, show all items

    const cleanTerm = term.toLowerCase().trim();
    const searchWords = cleanTerm.split(/\s+/);

    return searchWords.every(word => item.name.toLowerCase().includes(word));
  };

  return (
    <div className={itemsPageStyles.page}>
      <div className={itemsPageStyles.container}>
        <header className={itemsPageStyles.header}>
          <Link to="/" className={itemsPageStyles.backLink}>
            <FiArrowLeft className='mr-2' />
            <span>Back </span>
          </Link>
          <h1 className={itemsPageStyles.mainTitle}>
            <span className={itemsPageStyles.titleSpan}>ORGANIC</span> PANTRY
          </h1>

          <p className={itemsPageStyles.subtitle}>
            Premium quality groceries sourced from local organic farms.
          </p>

          <div className={itemsPageStyles.titleDivider}>
            <div className={itemsPageStyles.dividerLine} />
          </div>
        </header>

        {/* Search Bar */}
        <div className={itemsPageStyles.searchContainer}>
          <form onSubmit={(e) => { 
            e.preventDefault()
          if (searchTerm.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
          }
        }} className={itemsPageStyles.searchForm}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fruits, vegetables, and more..."
              className={itemsPageStyles.searchInput}
            />
          </form>
         </div>
      </div>
    </div>
  )
}

export default Item