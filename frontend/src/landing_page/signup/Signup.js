import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD_URL } from "../../config/api.config";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      // Redirect to dashboard after successful signup
      window.location.href = DASHBOARD_URL;
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="text-center mb-4">
            <h1 className="fs-2 mb-3">Signup now</h1>
            <p className="text-muted">
              Or track your existing application.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Continue"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              I authorise TradeX to contact me via phone, email, or WhatsApp to
              assist me through my signup journey. Consents here override any
              previous registration with DNC / NDNC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

