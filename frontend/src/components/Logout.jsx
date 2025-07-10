import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

const Logout = () => {

  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.dispatchEvent(new Event('authStateChanged'));
  }


  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <button 
      onClick ={handleLogout} 
      className='flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ttransition'
      >
        <FaSignOutAlt className='mr-2' />
        Logout
      </button>
      <p className='mt-4 text-gray-600'>
        you are already signed in. Click above to logout</p>
    </div>
  )
}

export default Logout