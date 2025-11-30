import React from "react";

function Hero() {
  return (
    <section 
      className="container-fluid" 
      style={{ 
        backgroundColor: "#f8f9fa",
        paddingTop: "60px",
        paddingBottom: "40px"
      }}
    >
      <div 
        className="p-3 p-md-5" 
        style={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        <h4 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333", margin: 0 }}>
          Support Portal
        </h4>
        <a 
          href="#" 
          style={{ 
            color: "#387ed1",
            textDecoration: "none",
            fontWeight: "500"
          }}
          onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
          onMouseLeave={(e) => e.target.style.textDecoration = "none"}
        >
          Track Tickets
        </a>
      </div>
      <div className="row p-3 p-md-5 mx-1 mx-md-3" style={{ marginTop: "20px" }}>
        <div className="col-12 col-lg-6 p-3 mb-4 mb-lg-0">
          <h1 style={{ 
            fontSize: "1.75rem", 
            fontWeight: "600", 
            color: "#333",
            marginBottom: "20px"
          }}>
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input 
            className="form-control my-3" 
            placeholder="Eg. how do I activate F&O"
            style={{
              padding: "12px 16px",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
          <div className="d-flex flex-column flex-md-row gap-2 flex-wrap" style={{ marginTop: "20px" }}>
            <a 
              href="#" 
              style={{ 
                color: "#387ed1",
                textDecoration: "none",
                marginRight: "20px",
                marginBottom: "10px"
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >
              Track account opening
            </a>
            <a 
              href="#" 
              style={{ 
                color: "#387ed1",
                textDecoration: "none",
                marginRight: "20px",
                marginBottom: "10px"
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >
              Track segment activation
            </a>
            <a 
              href="#" 
              style={{ 
                color: "#387ed1",
                textDecoration: "none",
                marginRight: "20px",
                marginBottom: "10px"
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >
              Intraday margins
            </a>
            <a 
              href="#"
              style={{ 
                color: "#387ed1",
                textDecoration: "none",
                marginBottom: "10px"
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >
              Kite user manual
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-6 p-3">
          <h1 style={{ 
            fontSize: "1.75rem", 
            fontWeight: "600", 
            color: "#333",
            marginBottom: "20px"
          }}>
            Featured
          </h1>
          <ol style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "12px" }}>
              <a 
                href="#" 
                style={{ 
                  color: "#387ed1",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <a 
                href="#"
                style={{ 
                  color: "#387ed1",
                  textDecoration: "none"
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;