import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Registration.css';

//Mainly made this for the pure template of the website, it does not work with the API because you can't register any one to it
//you can only login with the username and password of existing users already built in with the API
function Registration() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


      const handleRegistration = () => {
        // Validate the input data (e.g., check for empty fields)
        if (!formData.username || !formData.password) {
          alert('Please fill out both username and password fields.');
          return;
        }
    
        // Redirect to the login page upon successful registration
        navigate('/login');
      };

  return (
    <div className='registrationStyle'>
      <h1>Registration</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button onClick={handleRegistration}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Registration;
