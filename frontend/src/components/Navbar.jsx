import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiUser, FiX } from 'react-icons/fi';
import { navbarStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png';
import { navItems } from '../assets/Dummy';
import { useCart } from '../CartContext';
import { FaOpencart } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const prevCartCountRef = useRef(cartCount);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('authToken'))
  );

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    setActiveTab(location.pathname);
    setIsOpen(false);
  }, [location.pathname]);

  //scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Bounce the cart item whemn add to cart an item
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setCartBounce(true);
      const timer = setTimeout(() => {
        setCartBounce(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  //Listen for auth state changes
  useEffect(() => {
    const handler = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('authToken')));
    };
    window.addEventListener('authStateChanged', handler);
    return () => {
      window.removeEventListener('authStateChanged', handler);
    };
  }, []);

  //Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  //define logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.clear();
    window.dispatchEvent(new Event('authStateChanged'));
    navigate('/');
  };

  return (
    <nav
      className={`${navbarStyles.nav} ${scrolled ? navbarStyles.scrolledNav : navbarStyles.unscrolledNav
        }`}
    >
      <div className={navbarStyles.borderGradient} />

      {/* Floating particles */}
      <div className={navbarStyles.particlesContainer}>
        <div
          className={`${navbarStyles.particle} w-24 h-24 bg-emerald-500/5 -top-12 left-1/4 ${navbarStyles.floatAnimation}`}
        />
        <div
          className={`${navbarStyles.particle} w-32 h-32 bg-green-500/5 -bottom-16 left-2/3 ${navbarStyles.floatSlowAnimation}`}
        />
        <div
          className={`${navbarStyles.particle} w-16 h-16 bg-teal-500/5 -top-8 left-3/4 ${navbarStyles.floatSlowerAnimation}`}
        />
      </div>

      {/* Main Container */}
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* Logo */}
          <Link to="/" className={navbarStyles.logoLink} aria-label="Home">
            <img
              src={logo}
              alt="SabziWala Logo"
              className={`${navbarStyles.logoImage} ${scrolled ? 'h-10 w-10' : 'h-12 w-12'
                }`}
            />
            <span className={navbarStyles.logoText}>SabziWala</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${navbarStyles.navItem} ${activeTab === item.path
                    ? navbarStyles.activeNavItem
                    : navbarStyles.inactiveNavItem
                  }`}
              >
                <div className="flex items-center">
                  <span
                    className={`${navbarStyles.navIcon} ${activeTab === item.path
                        ? navbarStyles.activeNavIcon
                        : navbarStyles.inactiveNavIcon
                      }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  <div
                    className={`${navbarStyles.navIndicator} ${activeTab === item.path
                        ? navbarStyles.activeIndicator
                        : navbarStyles.inactiveIndicator
                      }`}
                  ></div>
                </div>
              </Link>
            ))}
          </div>

          {/* User/Login Button */}
          <div className={navbarStyles.iconsContainer}>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={navbarStyles.loginLink}
                aria-label="Logout"
              >
                <FiUser className={navbarStyles.loginIcon} />
                <span className="ml-1 text-white">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={navbarStyles.loginLink}
                aria-label="Login"
              >
                <FiUser className={navbarStyles.loginIcon} />
                <span className="ml-1 text-white">Login</span>
              </Link>
            )}
            <Link to='/cart' className={navbarStyles.cartLink} aria-label="Cart">
              <FaOpencart className={`${navbarStyles.cartIcon} ${cartBounce ? 'animate-bounce' : ''}`} />
              {cartCount > 0 && (
                <span className={navbarStyles.cartBadge}>{cartCount}</span>
              )}
            </Link>

            <button onClick={() => setIsOpen(!isOpen)}
              className={navbarStyles.hamburgerButton}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}>
              {isOpen ? (
                <FiX className='h-6 w-6 text-white' />
              ) : (
                <FiMenu className='h-6 w-6 text-white' />
              )
              }
            </button>
          </div>
        </div>
        {/*  Mobile Menu Overlay */}
        <div className={`${navbarStyles.mobileOverlay} ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} 
          fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300`}
          onClick={() => setIsOpen(false)}>
          <div className={`${navbarStyles.mobilePanel} ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            fixed right-0 top-0 bottom-0 z-50 w-4/5 max-w-sm`}
            onClick={(e) => e.stopPropagation()}
            ref={mobileMenuRef}>
            <div className={navbarStyles.mobileHeader}>
              <div className={navbarStyles.mobileLogo}>
                <div className={navbarStyles.mobileLogo}>
                  <img src={logo} alt="SabziWala Logo" className={navbarStyles.mobileLogoImage} />
                  <span className={navbarStyles.mobileLogoText}>SabziWala</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                className={navbarStyles.closeButton}
                aria-label="Close Menu">
                <FiX className='h-6 w-6 text-white' />
              </button>
            </div>

            <div className={navbarStyles.mobileItemsContainer}>
              {navItems.map((item, idx) => (
                <Link key={item.name} to={item.path} className={navbarStyles.mobileItem} style={{
                  transitionDelay: isOpen ? `${idx * 100}ms` : `0ms`, opacity: isOpen ? 1 : 0, transform: `translateX(${isOpen ? 0 : '20px'})`,
                }}
                  onClick={() => {
                    setIsOpen(false)
                  }}>
                  <span className={navbarStyles.mobileItemIcon}>{item.icon}</span>
                  <span className={navbarStyles.mobileItemText}>{item.name}</span>
                </Link>
              ))}

              <div className={navbarStyles.mobileButtons}>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={navbarStyles.loginButton}
                    aria-label="Logout"
                  >
                    <FiUser className={navbarStyles.loginButtonIcon} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className={navbarStyles.loginButton}
                    aria-label="Login"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser className={navbarStyles.loginButtonIcon} />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{navbarStyles.customCSS}</style>
    </nav>
  );
};

export default Navbar;
