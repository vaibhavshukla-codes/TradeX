import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { redirectToDashboard } from "../../utils/dashboardRedirect";

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
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

    // Validate inputs
    if (!formData.username || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Trim whitespace
    const credentials = {
      username: formData.username.trim(),
      password: formData.password
    };

    if (!credentials.username || !credentials.password) {
      setError("Username and password cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const result = await login(credentials);
      
      if (result && result.success) {
        // Get token and user - prefer from result.data, fallback to localStorage
        let token = null;
        let user = null;
        
        if (result.data && result.data.token && result.data.user) {
          token = result.data.token;
          user = result.data.user;
        } else {
          // Fallback to localStorage
          token = localStorage.getItem('token');
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            try {
              user = JSON.parse(savedUser);
            } catch (e) {
              console.error('Error parsing user from localStorage:', e);
            }
          }
        }
        
        const redirected = redirectToDashboard({ token, user, onError: setError });
        if (!redirected) {
          setLoading(false);
        }
        return;
      } else {
        setError(result?.message || "Invalid username or password");
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Check if it's a CORS error
      if (error.message && error.message.includes('CORS')) {
        setError("CORS error: Please check backend configuration. Make sure FRONTEND_URL is set correctly in Render.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="text-center mb-4">
            <h1 className="fs-2 mb-3">Login</h1>
            <p className="text-muted">
              Welcome back! Please login to your account.
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-muted">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
