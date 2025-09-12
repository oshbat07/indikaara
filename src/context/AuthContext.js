import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Set base URL for axios from environment variable
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://backend-wei5.onrender.com';

const SECONDS_TO_MILLISECONDS = 1000;

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
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * SECONDS_TO_MILLISECONDS > Date.now()) {
          // Try to get stored user profile data first
          const storedUserProfile = localStorage.getItem('userProfile');
          if (storedUserProfile) {
            const userProfile = JSON.parse(storedUserProfile);
            // Combine stored profile with current token info
            setUser({
              ...userProfile,
              token: token,
              id: decoded.id || userProfile.googleId,
              iat: decoded.iat,
              exp: decoded.exp
            });
          } else {
            // Fallback to JWT payload if no stored profile
            setUser(decoded);
          }
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const googleLogin = async (googleToken, userProfile = null) => {
    try {
      const requestData = { token: googleToken };
      if (userProfile) {
        requestData.userProfile = userProfile;
      }

      const response = await axios.post('/api/auth/google', requestData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);

      // If we have user profile data, use it instead of just the JWT payload
      if (userProfile) {
        // Store the full Google user profile with the token info
        const userData = {
          ...userProfile,
          token: token,
          // Add JWT payload info for completeness
          id: jwtDecode(token).id || userProfile.googleId,
          iat: jwtDecode(token).iat,
          exp: jwtDecode(token).exp
        };
        setUser(userData);
        // Store user profile in localStorage for persistence
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      } else {
        // Fallback to JWT payload if no profile data
        const decoded = jwtDecode(token);
        setUser(decoded);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Google login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    googleLogin,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
