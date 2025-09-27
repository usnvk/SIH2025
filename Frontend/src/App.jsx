// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import Signup from './components/Signup';
import DietPlanGenerator from "./components/dietchartfront/DietPlanGenerator";
import './auth.css';

// Home component with navigation links
const Home = () => (
  <div className="home-container">
    <h1>Welcome to NutriScan</h1>
    <div className="auth-links">
      <Link to="/login" className="auth-button">Login</Link>
      <Link to="/signup" className="auth-button">Sign Up</Link>
    </div>
  </div>
);

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
    min-height: 100vh;
  }
  
  a {
    color: #4d79ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 20px;
  }
  
  .auth-links {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }
  
  .auth-button {
    background: #4d79ff;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
      background: #3a5bd9;
      text-decoration: none;
    }
  }
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Public route component (for login/signup when already authenticated)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />
          
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div>Dashboard (Protected)</div>
            </ProtectedRoute>
          } />
          
          <Route path="/diet" element={
            <ProtectedRoute>
              <DietPlanGenerator />
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>Go to Home</Link>
            </div>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
