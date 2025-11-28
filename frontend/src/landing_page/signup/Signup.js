import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD_URL } from "../../config/api.config";

function Signup() {
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

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Trim whitespace
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    if (!trimmedData.username || !trimmedData.email || !trimmedData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const result = await signup(trimmedData);

      if (result && result.success) {
        if (result.data && result.data.token && result.data.user) {
          const { token, user } = result.data;
          const redirectUrl = new URL(DASHBOARD_URL);
          redirectUrl.searchParams.set('token', token);
          redirectUrl.searchParams.set(
            'user',
            encodeURIComponent(JSON.stringify(user))
          );
          window.location.href = redirectUrl.toString();
          return;
        }
        // Fallback: redirect without params (dashboard will check localStorage)
        window.location.href = DASHBOARD_URL;
      } else {
        setError(result?.message || "Signup failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
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

