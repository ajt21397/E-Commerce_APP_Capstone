// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(/* Initial cart data here */);


  // Check authentication status when the component mounts
  useEffect(() => {
    // Check the user's authentication status here and set isLoggedIn accordingly
    const userIsLoggedIn = checkAuthenticationStatus(); // Implement this function
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  // Define the checkAuthenticationStatus function here
  const checkAuthenticationStatus = () => {
    // Implement your authentication logic here
    // For example, you can check if a user is logged in using a token in localStorage
    const token = localStorage.getItem('token');
    return !!token; // Return true if a token exists, otherwise return false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
