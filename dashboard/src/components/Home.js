import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { FRONTEND_URL } from "../config/api.config";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapAuthFromQuery();
    checkAuth();
  }, []);

  const bootstrapAuthFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get('token');
    const userFromQuery = params.get('user');

    if (tokenFromQuery) {
      localStorage.setItem('token', tokenFromQuery);

      if (userFromQuery) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userFromQuery));
          localStorage.setItem('user', JSON.stringify(parsedUser));
        } catch (error) {
          console.warn('Unable to parse user from query params:', error);
        }
      }

      params.delete('token');
      params.delete('user');

      const newQuery = params.toString();
      const newUrl = `${window.location.origin}${window.location.pathname}${newQuery ? `?${newQuery}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = `${FRONTEND_URL}/login`;
        return;
      }

      const response = await API.get('/checkAuth');
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = `${FRONTEND_URL}/login`;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = `${FRONTEND_URL}/login`;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;