import React from "react";

function CreateTicket() {
  const categories = [
    {
      title: "Account Opening",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account Opening",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1 Account",
        "Getting Started"
      ]
    },
    {
      title: "Trading & Orders",
      links: [
        "Placing Orders",
        "Order Types",
        "Market Orders",
        "Limit Orders",
        "Stop Loss Orders",
        "Intraday Trading",
        "F&O Trading"
      ]
    },
    {
      title: "Funds & Payments",
      links: [
        "Add Funds",
        "Withdraw Funds",
        "UPI Payments",
        "NEFT/RTGS",
        "Payment Gateway Issues",
        "Bank Account Linking",
        "Payment History"
      ]
    },
    {
      title: "Kite Platform",
      links: [
        "Kite Web",
        "Kite Mobile App",
        "Charting Tools",
        "Market Watch",
        "Portfolio",
        "Order Book",
        "Position Book"
      ]
    },
    {
      title: "Account Management",
      links: [
        "Update Profile",
        "Change Password",
        "PAN Verification",
        "Bank Account Details",
        "Nominee Details",
        "Account Statement",
        "Tax Documents"
      ]
    },
    {
      title: "Technical Support",
      links: [
        "Login Issues",
        "OTP Problems",
        "App Not Working",
        "Browser Issues",
        "API Access",
        "Data Feed Issues",
        "Report a Bug"
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
      <div className="row">
        <div className="col-12">
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: "600", 
            color: "#333",
            marginBottom: "40px",
            textAlign: "center"
          }}>
            To create a ticket, select a relevant topic
          </h1>
        </div>
      </div>
      <div className="row">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="col-12 col-md-6 col-lg-4"
            style={{
              padding: "20px",
              marginBottom: "30px"
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "24px",
                height: "100%",
                transition: "box-shadow 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
            >
              <h4 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#387ed1",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{ fontSize: "1.5rem" }}>+</span> {category.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      padding: "4px 0",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#387ed1";
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#666";
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;