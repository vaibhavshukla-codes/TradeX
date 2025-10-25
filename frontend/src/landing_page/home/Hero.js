import React from "react";
import { Link } from "react-router-dom";
import homeHero from "../../TradeXAssets/homeHero.png";

function Hero() {
  return (
    <div className="container p-3 p-md-5 mb-5">
      <div className="row text-center">
        <img
          src={homeHero}
          alt="Hero Image"
          className="mb-3 mb-md-5 img-fluid"
        />
        <h1 className="mt-3 mt-md-5 fs-2 fs-md-1">Invest in everything</h1>
        <p className="fs-6 fs-md-5">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/signup" className="text-decoration-none">
            <button className="btn btn-primary fs-6 fs-md-5 px-4 py-2 mb-5">
              Signup Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;