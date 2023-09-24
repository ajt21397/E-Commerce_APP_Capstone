import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Registration.css';


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
    
        // Perform registration logic here (e.g., send data to a server)
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
