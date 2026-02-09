import React from "react";
import education from "../../TradeXAssets/education.svg";

function Education() {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
          <img src={education} className="img-fluid" style={{ maxWidth: "70%" }} alt="Education" />
        </div>
        <div className="col-12 col-lg-6 p-3">
          <h1 className="mb-3 fs-3 fs-md-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="/" className="d-block mb-3" style={{ textDecoration: "none" }}>
            Versity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-3 mt-md-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="/" style={{ textDecoration: "none" }}>
            TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;