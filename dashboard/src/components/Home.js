import React, { useEffect } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  useEffect(() => {
    bootstrapAuthFromQuery();
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

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
