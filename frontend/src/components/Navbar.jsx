import React, { useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { navbarStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png';
import { navItems } from '../assets/Dummy';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('authToken')));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.clear();
    window.dispatchEvent(new Event('authStateChanged'));
    navigate('/');
  };

  return (
    <nav
      className={`${navbarStyles.nav} ${
        scrolled ? navbarStyles.scrolledNav : navbarStyles.unscrolledNav
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
              className={`${navbarStyles.logoImage} ${
                scrolled ? 'h-10 w-10' : 'h-12 w-12'
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
                className={`${navbarStyles.navItem} ${
                  activeTab === item.path
                    ? navbarStyles.activeNavItem
                    : navbarStyles.inactiveNavItem
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`${navbarStyles.navIcon} ${
                      activeTab === item.path
                        ? navbarStyles.activeNavIcon
                        : navbarStyles.inactiveNavIcon
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  <div
                    className={`${navbarStyles.navIndicator} ${
                      activeTab === item.path
                        ? navbarStyles.activeNavIndicator
                        : navbarStyles.inactiveNavIndicator
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
