import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-3 p-md-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-3 mt-md-5 fs-3 fs-md-2">Open a TradeX account</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/signup">
            <button className="btn btn-primary fs-6 fs-md-5 px-4 py-2 mb-5">
              Sign up Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;