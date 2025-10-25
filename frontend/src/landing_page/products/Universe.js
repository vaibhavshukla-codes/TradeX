import React from "react";
import smallcaseLogo from "../../TradeXAssets/smallcaseLogo.png";
import streakLogo from "../../TradeXAssets/streakLogo.png";
import sensibullLogo from "../../TradeXAssets/sensibullLogo.svg";
import zerodhaFundhouse from "../../TradeXAssets/zerodhaFundhouse.png";
import goldenpiLogo from "../../TradeXAssets/goldenpiLogo.png";
import dittoLogo from "../../TradeXAssets/dittoLogo.png";

function Universe() {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row text-center">
        <h1 className="fs-3 fs-md-2">The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={smallcaseLogo} className="img-fluid" alt="Smallcase" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Thematic investment platform</p>
        </div>
        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={streakLogo} className="img-fluid" alt="Streak" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Algo & strategy platform</p>
        </div>
        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={sensibullLogo} className="img-fluid" alt="Sensibull" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Options trading platform</p>
        </div>
        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={zerodhaFundhouse} className="img-fluid" alt="Zerodha Fundhouse" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Asset management</p>
        </div>
        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={goldenpiLogo} className="img-fluid" alt="Goldenpi" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Bonds trading platform</p>
        </div>
        <div className="col-6 col-md-4 p-3 mt-3 mt-md-5">
          <img src={dittoLogo} className="img-fluid" alt="Ditto" style={{ maxWidth: "150px" }} />
          <p className="text-small text-muted mt-2">Insurance advisory</p>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary fs-6 fs-md-5 px-4 py-2 mb-5">
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;