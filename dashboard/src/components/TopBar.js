import React, { useState, useEffect, useRef } from "react";
import { FRONTEND_URL } from "../config/api.config";
import Menu from "./Menu";

const TopBar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = `${FRONTEND_URL}/login`;
  };

  const userInitials = user ? (user.username || user.email || 'U').substring(0, 2).toUpperCase() : 'ZU';
  const username = user ? (user.username || user.email || 'USERID') : 'USERID';

  return (
    <div className="topbar-container" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '10px 20px',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#fff'
    }}>
      {/* Zerodha Logo at Top Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <span style={{ fontSize: "24px", fontWeight: "bold", color: "#387ed1" }}>
          ZERODHA
        </span>
        
        {/* Indices */}
        <div className="indices-container" style={{ display: 'flex', gap: '20px' }}>
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{100.2} </p>
            <p className="percent"> </p>
          </div>
          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>
        </div>
      </div>

      {/* Center Navigation Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Menu />
      </div>

      {/* Profile Icon at Top Right */}
      <div ref={dropdownRef} style={{ position: "relative" }}>
          <div 
            onClick={handleProfileClick} 
            style={{ 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <div 
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#387ed1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              {userInitials}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                {username}
              </span>
            </div>
          </div>
          
          {isProfileDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px 0",
              minWidth: "180px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "4px" }}>
                  {username}
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {user?.email || ''}
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "#387ed1",
                  color: "white",
                  border: "none",
                  borderRadius: "0 0 8px 8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                  marginTop: "4px"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#2d6fb8"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#387ed1"}
              >
                Logout
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default TopBar;