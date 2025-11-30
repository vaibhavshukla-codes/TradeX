import axios from 'axios';
import { API_BASE_URL, FRONTEND_URL } from '../config/api.config';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login - use FRONTEND_URL if set, otherwise relative URL
      window.location.href = FRONTEND_URL ? `${FRONTEND_URL}/login` : '/login';
    }
    return Promise.reject(error);
  }
);

export default API;

