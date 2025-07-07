import React, { useState } from 'react'
import { itemsHomeStyles } from '../assets/dummyStyles'
import BannerHome from './BannerHome'

const ItemsHome = () => {

  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = (term) => {
    setSearchTerm(term)
  }
  return (
    <div className={itemsHomeStyles.page}>
      <BannerHome onSearch={handleSearch} />
    </div>
  )
}

export default ItemsHome