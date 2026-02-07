import React, { useState, useContext } from "react";

import API from "../api/axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    if (!uid || !uid.trim()) {
      alert(`Please select a stock to ${mode === "SELL" ? "sell" : "buy"}`);
      return;
    }

    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!qty || qty <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (!price || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setLoading(true);
    API.post('/newOrder', {
      name: String(uid).trim(),
      qty: qty,
      price: price,
      mode: mode,
    })
    .then(() => {
      alert(`${mode === "SELL" ? "Sell" : "Buy"} order placed successfully!`);
      closeBuyWindow();
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      alert(errorMessage);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Session expired. Please login again.');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="containerClass" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value) || 1)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value) || 0)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} disabled={loading}>
            {loading ? 'Placing Order...' : (mode === "SELL" ? "Sell" : "Buy")}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
