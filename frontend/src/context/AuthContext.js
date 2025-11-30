import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Verify token is still valid
        checkAuth();
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await API.get('/checkAuth');
      if (response.data.authenticated) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      // User is not authenticated
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      // Basic client-side validation
      if (!userData.username || !userData.email || !userData.password) {
        return {
          success: false,
          message: 'All fields are required'
        };
      }

      // Trim whitespace
      const trimmedData = {
        username: userData.username.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password
      };

      if (!trimmedData.username || !trimmedData.email || !trimmedData.password) {
        return {
          success: false,
          message: 'All fields are required'
        };
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedData.email)) {
        return {
          success: false,
          message: 'Please enter a valid email address'
        };
      }

      const response = await API.post('/signup', trimmedData);
      
      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { 
          success: true, 
          data: {
            token: response.data.token,
            user: response.data.user
          }
        };
      } else {
        return {
          success: false,
          message: 'Invalid response from server'
        };
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           'Signup failed. Please try again.';
        return {
          success: false,
          message: errorMessage
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          message: 'Unable to connect to server. Please check your connection.'
        };
      } else {
        // Something else happened
        return {
          success: false,
          message: error.message || 'An unexpected error occurred'
        };
      }
    }
  };

  const login = async (credentials) => {
    try {
      // Validate input
      if (!credentials.username || !credentials.password) {
        return {
          success: false,
          message: 'Username and password are required'
        };
      }

      const response = await API.post('/login', credentials);
      
      if (response.data && response.data.token && response.data.user) {
        // Store token and user in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Update user state
        setUser(response.data.user);
        
        return { 
          success: true, 
          data: {
            token: response.data.token,
            user: response.data.user
          }
        };
      } else {
        return {
          success: false,
          message: 'Invalid response from server'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           'Login failed. Please check your credentials.';
        return {
          success: false,
          message: errorMessage
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          message: 'Unable to connect to server. Please check your connection.'
        };
      } else {
        // Something else happened
        return {
          success: false,
          message: error.message || 'An unexpected error occurred'
        };
      }
    }
  };

  const logout = () => {
    // Clear localStorage and state synchronously
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    return { success: true };
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

