import React, { useState, useEffect } from "react";
import API from "../api/axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/allOrders');
      setAllOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setAllOrders([]);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
              if (!order || !order.name) return null;
              let orderDate = 'N/A';
              try {
                if (order.createdAt) {
                  orderDate = new Date(order.createdAt).toLocaleString();
                }
              } catch (e) {
                console.error('Error parsing date:', e);
              }
              return (
                <tr key={order._id || index}>
                  <td>{order.name || 'N/A'}</td>
                  <td>{order.qty || 0}</td>
                  <td>₹{(parseFloat(order.price) || 0).toFixed(2)}</td>
                  <td className={order.mode === "BUY" ? "profit" : "loss"}>
                    {order.mode || 'N/A'}
                  </td>
                  <td>{orderDate}</td>
                  <td>Completed</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;