import React from "react";
import ecosystem from "../../TradeXAssets/ecosystem.png";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-2 p-md-5">
        <div className="col-12 col-lg-6 p-3 p-md-5">
          <h1 className="fs-3 fs-md-2 mb-4 mb-md-5">Trust with confidence</h1>
          <h2 className="fs-5 fs-md-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-5 fs-md-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-5 fs-md-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-5 fs-md-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-5">
          <img src={ecosystem} className="img-fluid mb-4" alt="Ecosystem" />
          <div className="text-center">
            <a href="#" className="d-block d-md-inline mx-0 mx-md-5 mb-3 mb-md-0" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="#" className="d-block d-md-inline" style={{ textDecoration: "none" }}>
              Try Kite demo{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;