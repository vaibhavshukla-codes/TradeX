import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: "5px" }}>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/"
            onClick={() => handleMenuClick(0)}
          >
            <p className={selectedMenu === 0 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Dashboard
            </p>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/orders"
            onClick={() => handleMenuClick(1)}
          >
            <p className={selectedMenu === 1 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Orders
            </p>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/holdings"
            onClick={() => handleMenuClick(2)}
          >
            <p className={selectedMenu === 2 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Holdings
            </p>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/positions"
            onClick={() => handleMenuClick(3)}
          >
            <p className={selectedMenu === 3 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Positions
            </p>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/funds"
            onClick={() => handleMenuClick(4)}
          >
            <p className={selectedMenu === 4 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Funds
            </p>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to="/apps"
            onClick={() => handleMenuClick(5)}
          >
            <p className={selectedMenu === 5 ? activeMenuClass : menuClass} style={{ 
              margin: 0, 
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Apps
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
