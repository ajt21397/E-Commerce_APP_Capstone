import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [savedUserId, setSavedUserId] = useState(''); // Define the savedUserId state variable

  useEffect(() => {
    // Check if there's a token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (response.data.token) {
        // Save the token to local storage
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        setLoginError(null);

        // Save the user ID to a state variable or context
        setSavedUserId(response.data.userId); // Assuming you have a state variable called savedUserId
        

      } else {
        setLoggedIn(false);
        setLoginError('Invalid username or password.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setLoggedIn(false);
      setLoginError('An error occurred while logging in.');
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      {loggedIn ? (
        <div>
          <p>Welcome, {username}! You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/register">Register</Link>

        </div>
      ) : (
        <div>
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
          {loginError && <p>{loginError}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
