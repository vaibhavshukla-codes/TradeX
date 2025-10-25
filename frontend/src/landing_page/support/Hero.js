import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-3 p-md-5" id="supportWrapper">
        <h4 className="fs-5 fs-md-4">Support Portal</h4>
        <a href="#">Track Tickets</a>
      </div>
      <div className="row p-3 p-md-5 mx-1 mx-md-3">
        <div className="col-12 col-lg-6 p-3 mb-4 mb-lg-0">
          <h1 className="fs-4 fs-md-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input 
            className="form-control my-3" 
            placeholder="Eg. how do I activate F&O" 
          />
          <div className="d-flex flex-column flex-md-row gap-2 flex-wrap">
            <a href="#" className="me-3">Track account opening</a>
            <a href="#" className="me-3">Track segment activation</a>
            <a href="#" className="me-3">Intraday margins</a>
            <a href="#">Kite user manual</a>
          </div>
        </div>
        <div className="col-12 col-lg-6 p-3">
          <h1 className="fs-4 fs-md-3">Featured</h1>
          <ol>
            <li>
              <a href="#">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="#">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;