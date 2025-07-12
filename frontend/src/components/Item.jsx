import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext';
import { itemsPageStyles } from '../assets/dummyStyles'
import { FiPlus, FiMinus, FiArrowLeft, FiSearch, FiChevronUp, FiChevronDown, FiServer } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { groceryData } from '../assets/dummyDataItem';





//Product card
const ProductCard = ({ item }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
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
              <button onClick={handleDecrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonLeft}`} >
                <FiMinus />
              </button>
              <span className={itemsPageStyles.quantityValue}>{quantity}</span>
              <button onClick={handleIncrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonRight}`} >
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

  //Filter items based on search term
  const filteredData = searchTerm
    ? groceryData.map(category => ({
      ...category,
      items: category.items.filter(item => itemsMatchSearch(item, searchTerm))
    })).filter(category => category.items.length > 0)
    : groceryData;

  //clear search term
  const clearSearch = () => {
    setSearchTerm('');
    navigate('/items');
  };

  //toogle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  //Toggle all categories
  const toggleAllCategories = () => {
    if (allExpanded) {
      setExpandedCategories({});
    } else {
      const expand = {};
      groceryData.forEach(category => {
        expand[category.id] = true;
      });
      setExpandedCategories(expand);
    }
    setAllExpanded(!allExpanded);
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

            <button type="submit" className={itemsPageStyles.searchButton}>
              <FiSearch className='h-5 w-5' />
            </button>

          </form>
        </div>

        <div className='flex justify-center mb-10'>
          <button onClick={toggleAllCategories} className={itemsPageStyles.expandButton}>
            <span className='mr-2 font-medium'>
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </span>
            {allExpanded ? <FiMinus className='text-lg' /> : <FiPlus className='text-lg' />}
          </button>
        </div>

        {filteredData.length > 0 ? (
          filteredData.map(category => {
            const isExpanded = expandedCategories[category.id] || allExpanded;
            const visibleItems = isExpanded ? category.items : category.items.slice(0, 4);
            const hasMoreItems = category.items.length > 4;

            return (
              <section key={category.id} className={itemsPageStyles.categorySection}>
                <div className={itemsPageStyles.categoryHeader}>
                  <div className={itemsPageStyles.categoryIcon}></div>
                  <h2 className={itemsPageStyles.categoryTitle}>{category.name}</h2>
                  <div className={itemsPageStyles.categoryDivider}></div>
                </div>

                <div className={itemsPageStyles.productsGrid}>
                  {visibleItems.map(item => (
                    <ProductCard key={item._id} item={item} />
                  ))}
                </div>

                {hasMoreItems && (
                  <div className='mr-8 flex justify-center'>
                    <button onClick={() => toggleCategory(category.id)} className={itemsPageStyles.showMoreButton}>
                      <span className='mr-2 font-medium'>
                        {isExpanded ? `Show Less ${category.name}` : `Show More ${category.name} (${category.items.length - 4} + )`}
                      </span>
                      {isExpanded ? <FiChevronUp className='text-lg' /> : <FiChevronDown className='text-lg' />}
                    </button>
                  </div>
                )}
              </section>
            )
          })
        ) : (
          <div className={itemsPageStyles.noProductsContainer}>
            <div className={itemsPageStyles.noProductsIcon}>
              <div className={itemsPageStyles.noProductsIcon}>
                <FiSearch className='mx-auto h-16 w-16' />
              </div>

              <h3 className={itemsPageStyles.noProductsTitle}>
                No Products Found
              </h3>
              <p className={itemsPageStyles.noProductsText}>
                We couldn't find any products matching your search term. "{searchTerm}"
              </p>

              <button onClick={clearSearch} className={itemsPageStyles.clearSearchButton}>
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Item