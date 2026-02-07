import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { positions as samplePositions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const res = await API.get('/allPositions');
        const fetched = res.data || [];
        const useSample =
          process.env.NODE_ENV !== 'production' && fetched.length === 0;
        setAllPositions(useSample ? samplePositions : fetched);
        setError(null);
      } catch (error) {
        console.error('Error fetching positions:', error);
        setError('Failed to load positions');
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Session expired. Please login again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  if (loading) {
    return (
      <>
        <h3 className="title">Positions</h3>
        <p>Loading...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3 className="title">Positions</h3>
        <p style={{ color: 'red' }}>{error}</p>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {allPositions.length === 0 ? (
        <p>No positions found.</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                if (!stock || !stock.name) return null;
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const avgCost = (stock.avg || 0) * (stock.qty || 0);
                const isProfit = curValue - avgCost >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || index}>
                    <td>{stock.product || 'N/A'}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty || 0}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - avgCost).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day || '0%'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
