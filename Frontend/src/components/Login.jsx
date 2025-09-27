import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../auth.css';
import axios from 'axios';

const UserLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      setError('');
      setIsLoading(true);
  
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password
        }, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log("Login successful:", res.data);
        // Store user data in localStorage if needed
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        
        // Redirect to home or dashboard
        navigate("/");
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setError(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to NutriScan</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                autoComplete="username email"
                required
                aria-required="true"
                inputMode="email"
              />
            </div>
            
            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                autoComplete="current-password" 
                required
                aria-required="true"
                minLength="8"
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
              
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserLogin;