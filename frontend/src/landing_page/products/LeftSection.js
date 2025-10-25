import React from "react";
import googlePlayBadge from "../../TradeXAssets/googlePlayBadge.svg";
import appstoreBadge from "../../TradeXAssets/appstoreBadge.svg";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
          <img src={imageURL} className="img-fluid" alt={productName} />
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-5 mt-0 mt-md-5">
          <h1 className="fs-3 fs-md-2">{productName}</h1>
          <p>{productDesription}</p>
          <div className="mb-3">
            <a href={tryDemo} className="me-3 me-md-5">Try Demo</a>
            <a href={learnMore}>Learn More</a>
          </div>
          <div className="mt-3 d-flex flex-wrap gap-3">
            <a href={googlePlay}>
              <img src={googlePlayBadge} className="img-fluid" style={{maxWidth: "150px"}} alt="Get it on Google Play" />
            </a>
            <a href={appStore}>
              <img
                src={appstoreBadge}
                className="img-fluid"
                style={{maxWidth: "150px"}}
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;