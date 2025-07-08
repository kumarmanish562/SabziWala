import React, { useEffect, useState } from 'react'
import { itemsHomeStyles } from '../assets/dummyStyles'
import BannerHome from './BannerHome'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { categories } from '../assets/dummyData'
import { FaThList } from 'react-icons/fa'

const ItemsHome = () => {
  const [activeCategory, setActiveCategory] = useState(() => {
    return localStorage.getItem('activeCategory') || 'All'
  })

  useEffect(() => {
    localStorage.setItem('activeCategory', activeCategory)
  }, [activeCategory])

  const navigate = useNavigate()
  const { cart } = useCart()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  //Create sidebar categories
  const sidebarCategories = [
    {
      name: 'All Items',
      icon: <FaThList className='text-lg' />,
      value: 'All',
    },
    ...categories
  ]
  return (
    <div className={itemsHomeStyles.page}>
      <BannerHome onSearch={handleSearch} />

      <div className='flex flex-col lg:flex-row flex-1'>
        <aside className={itemsHomeStyles.sidebar}>
          <div className={itemsHomeStyles.sidebarHeader}>
            <h1
              style={{
                fontFamily: 'PlayFair Display , serif',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              className={itemsHomeStyles.sidebarTitle}>
              FreshCart
            </h1>
            <div className={itemsHomeStyles.sidebarDivider} />
            </div>

            <div className={itemsHomeStyles.categoryList}>
              <ul className= ' space-y-3'>
                {sidebarCategories.map((category) => (
                  <li
                    key={category.name}>
                    <button onClick={() => {
                      setActiveCategory(category.value || category.name)
                      setSearchTerm('')
                    }}
                      className={`${itemsHomeStyles.categoryItem} ${activeCategory === (category.value || category.name) && !searchTerm ? itemsHomeStyles.activeCategory :
                        itemsHomeStyles.inactiveCategory}`}>
                      <div className={itemsHomeStyles.categoryIcon}>
                        {category.icon}
                      </div>
                      <span className={itemsHomeStyles.categoryName}>
                        {category.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
          </div>
        </aside>

       
      </div>
    </div>
  )
}

export default ItemsHome