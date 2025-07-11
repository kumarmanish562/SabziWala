import React, { useEffect } from 'react'
import { loginStyles } from '../assets/dummyStyles'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCheck, FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import Logout from './Logout'

const Login = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('authToken'))
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();

useEffect(() => {
   const handler = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('authToken')));
    }
    window.addEventListener('authStateChanged', handler);
    return () => {
      window.removeEventListener('authStateChanged', handler);
    };
  }, []);

  if (isAuthenticated) {
    return <Logout />
  }

  //Form handler  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.remember) {
      setError('You must agree to the terms and conditions');
      return;
    } 


    //Generate Token and store user Data
    const token = 'mock_token';
    const userData = {
      email: formData.email, // Fixed variable name
      token,
      timestamp: new Date().toISOString(),

    };

    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));

    setError('');
    setShowToast(true);

      window.dispatchEvent(new Event('authStateChanged'));

    setTimeout(() => {
      navigate('/');
    }, 2000); // Added duration for setTimeout
  }

  return (
    <div className= {loginStyles.page}>
      <Link to='/' className={loginStyles.backLink}>
      <FaArrowLeft className= 'mr-2' />
        Back to Home
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className={loginStyles.toast}>
          <FaCheck className='mr-2' />
          Login Successful
        </div>
      )}

      {/* Login Card  */}
      <div className={loginStyles.loginCard}>
        <div  className={loginStyles.logoContainer}>
          <div className={loginStyles.logoOuter}>
            <div className={loginStyles.logoInner}>
              <FaUser className={loginStyles.logoIcon} />
            </div>
          </div>
        </div>
        <h2 className={loginStyles.title}>Welcome Back</h2>

        <form onSubmit={handleSubmit} className={loginStyles.form}>
          {/* Email */}
        
            <div className={loginStyles.inputContainer}>
              <FaUser className={loginStyles.inputIcon} />
              <input type='email' name='email' value={formData.email} 
              onChange={handleChange} placeholder='Email Address..'
              required className={loginStyles.input} />
          </div>

          {/* Password */}
          <div className={loginStyles.inputContainer}>
            <FaLock className={loginStyles.inputIcon} />
            <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password}
              onChange={handleChange} placeholder='Password..'
              required className={loginStyles.passwordInput} />
            <button type='button' onClick={() => setShowPassword((v) => !v)} className={loginStyles.toggleButton}
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember Me */}
          <div className={loginStyles.rememberContainer}>
            <label className={loginStyles.rememberLabel}>
              <input
                type='checkbox'
                name='remember'
                checked={formData.remember}
                onChange={handleChange}
                className={loginStyles.rememberCheckbox}
                required
              />
              Remember Me
            </label>
            <Link to ='#' className={loginStyles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && <p className={loginStyles.error}>{error}</p>}
          <button type='submit' className={loginStyles.submitButton}>
            Sign In 
            </button>
        
        </form>

        <p className={loginStyles.signupText}>
          Don't have an account? 
          <Link to='/signup' className={loginStyles.signupLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;