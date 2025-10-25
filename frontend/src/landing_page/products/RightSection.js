import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row">
        <div className="col-12 col-lg-6 p-3 p-md-5 mt-0 mt-md-5 order-2 order-lg-1">
          <h1 className="fs-3 fs-md-2">{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-12 col-lg-6 text-center order-1 order-lg-2 mb-4 mb-lg-0">
          <img src={imageURL} className="img-fluid" alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;