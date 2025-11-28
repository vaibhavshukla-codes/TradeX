import React from "react";

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "rgb(250, 250, 250)", 
      width: "100%", 
      marginTop: "auto",
      paddingTop: "3rem",
      paddingBottom: "1rem"
    }}>
      <div className="container border-top pt-4">
        <div className="row mt-3 mt-md-5 mb-4">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#387ed1" }}>ZERODHA</span>
            <p className="mt-3" style={{ fontSize: "14px", color: "#666" }}>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <p className="fw-bold mb-3" style={{ fontSize: "14px" }}>Company</p>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>About</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Products</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Pricing</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Referral programme</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Careers</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Zerodha.tech</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Press & media</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Zerodha cares (CSR)</a>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mb-4">
            <p className="fw-bold mb-3" style={{ fontSize: "14px" }}>Support</p>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Contact</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Support portal</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Z-Connect blog</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>List of charges</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Downloads & resources</a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <p className="fw-bold mb-3" style={{ fontSize: "14px" }}>Account</p>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Open an account</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Fund transfer</a>
            <a href="#" className="d-block mb-2" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>60 day challenge</a>
          </div>
        </div>
        <div className="mt-3 mt-md-5 text-muted pb-3" style={{ fontSize: "12px", lineHeight: "1.6", color: "#666" }}>
          <p style={{ marginBottom: "12px" }}>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p style={{ marginBottom: "12px" }}>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p style={{ marginBottom: "12px" }}>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p style={{ marginBottom: "0" }}>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;