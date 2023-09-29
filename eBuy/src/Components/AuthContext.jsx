// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(/* Initial cart data here */);


  // Check authentication status when the component mounts
  useEffect(() => {
 
    const userIsLoggedIn = checkAuthenticationStatus(); 
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  // Define the checkAuthenticationStatus function here
  const checkAuthenticationStatus = () => {
    
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
