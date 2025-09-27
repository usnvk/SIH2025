import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(e.target);
    // e.target is the form element. We can access its child input elements by their 'name' attribute.

    // Access the form values by their 'name' attribute
    const Name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        // Use the correct, consistent variable names
        Name,
        email,
        password
      }, { withCredentials:true});


      console.log("Backend response:", res.data);
      // You can add a success message or redirect here
      alert("Registration successful!");
      navigate("/");

    } catch (error) {
      console.error("Registration failed:", error);
      // You can display an error message here
      alert("Registration failed. Please try again.");
    }
    console.log(res.data);
    
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">User Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              autoComplete="name" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              autoComplete="username email" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              autoComplete="new-password" 
              minLength="8"
              required 
            />
            <small className="password-hint">Use 8 or more characters with a mix of letters, numbers & symbols</small>
          </div>
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          {/* <p>Are you a food partner? <Link to="/partner/register" className="auth-link">Register here</Link></p> */}
        </div>
      </div>
    </div>
  );
};

export default UserRegister;