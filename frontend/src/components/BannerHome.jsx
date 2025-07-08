import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bannerStyles } from '../assets/dummyStyles'
import { FiSearch, FiTruck } from 'react-icons/fi'
import { features } from '../assets/Dummy'
import BannerFood from '../assets/FoodBanner.png'


const BannerHome = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTerm = searchTerm.trim()
    if (trimmedTerm) {
      if (onSearch) {
        const searchWords = trimmedTerm.toLowerCase().split(/\s+/)
        onSearch(searchWords.join(' '))
      }
      else {
        // If onSearch is not provided, navigate to search page
        navigate(`/items?query=${encodeURIComponent(trimmedTerm)}`)
      }
      setSearchTerm('') // Clear the input after search
    }
  }

  return (
    <div className='relative overflow-hidden pt-16'>
      {/* Background Gradient */}
      <div className={bannerStyles.backgroundGradient} >
      </div>
      {/* Decorative circles */}
      <div className="hidden sm:block absolute top-6 left-6 w-20 h-20 rounded-full bg-teal-100 opacity-30"></div>
      <div className="hidden md:block absolute bottom-12 right-28 w-32 h-32 rounded-full bg-seafoam-200 opacity-30"></div>
      <div className="hidden lg:block absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-mint-200 opacity-30"></div>

      <div className='relative z-10 mt-8 sm:mt-10 lg:mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16'>
        <div className=' grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 items-center'>

          {/* Left Content */}
          <div className='text-center md:text-left'>
            <div className={bannerStyles.tag}>
              <span className='flex items-center text-sm sm:text-base'>
                <FiTruck className=' mr-2' /> Free delivery on orders over ₹500
              </span>
            </div>

            <h1 className={bannerStyles.heading}>
              Fresh{' '}
              <span className={bannerStyles.headingItalic}>
                Groceries
              </span>
              <br />
              Delivered to Your Door
            </h1>
            <p className={bannerStyles.paragraph}>
              Discover the freshest produce, top-quality meats, and pantry essentials
              delivered within 30 minutes.
            </p>
            <form onSubmit={handleSubmit} className={bannerStyles.form}>
              <input type="text" value={searchTerm} onChange={handleSearch}
                placeholder='Search for fruits, vegetables, and more....'
                className={bannerStyles.input} />

              <button type="submit" className={bannerStyles.searchButton}>
                <FiSearch className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
            </form>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
              {features.map((f, i) => (
                <div key={i} className={bannerStyles.featureItem}>
                  <div className='text-teal-600 mb-1'>{f.icon}</div>
                  <span className={bannerStyles.featureText}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className='relative flex justify-content-center'>
            <div className={bannerStyles.imageContainer}>
              <div className={bannerStyles.imageInner}>
                <img src={BannerFood} alt="Banner" className='object-cover w-full h-full' />
              </div>
            </div>
            <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 rounded-full bg-mint-200 opacity-20"></div>
            <div className="hidden md:block absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-teal-100 opacity-20"></div>
            <div className="hidden lg:block absolute top-1/4 -left-6 w-20 h-20 rounded-full bg-seafoam-100 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerHome