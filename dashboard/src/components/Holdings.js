import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { VerticalGraph } from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        const res = await API.get('/allHoldings');
        setAllHoldings(res.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching holdings:', error);
        setError('Failed to load holdings');
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Session expired. Please login again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((stock) => stock?.name || 'Unknown');

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock?.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  if (loading) {
    return (
      <>
        <h3 className="title">Holdings</h3>
        <p>Loading...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3 className="title">Holdings</h3>
        <p style={{ color: 'red' }}>{error}</p>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {allHoldings.length === 0 ? (
        <p>No holdings found.</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                if (!stock || !stock.name) return null;
                const curValue = (stock.price || 0) * (stock.qty || 0);
                const avgCost = (stock.avg || 0) * (stock.qty || 0);
                const isProfit = curValue - avgCost >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty || 0}</td>
                    <td>{(stock.avg || 0).toFixed(2)}</td>
                    <td>{(stock.price || 0).toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - avgCost).toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net || '0%'}</td>
                    <td className={dayClass}>{stock.day || '0%'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;


