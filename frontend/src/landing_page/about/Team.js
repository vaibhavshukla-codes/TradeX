import React from "react";
import nithinKamath from "../../TradeXAssets/nithinKamath.jpg";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-3 mt-md-5 border-top">
        <h1 className="text-center fs-3 fs-md-2">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-12 col-lg-6 p-3 text-center mb-4 mb-lg-0">
          <img
            src={nithinKamath}
            className="img-fluid"
            style={{ borderRadius: "100%", maxWidth: "250px" }}
            alt="Nithin Kamath"
          />
          <h4 className="mt-3 mt-md-5">Nithin Kamath</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-12 col-lg-6 p-3">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="/">Homepage</a> / <a href="/">TradingQnA</a> /{" "}
            <a href="/">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;