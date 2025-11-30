import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD_URL } from "../../config/api.config";

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
        
        // Ensure we have token before redirecting
        if (token) {
          // Validate DASHBOARD_URL - prevent redirecting to login page
          const currentUrl = window.location.origin + window.location.pathname;
          const dashboardUrlLower = DASHBOARD_URL.toLowerCase();
          const currentUrlLower = currentUrl.toLowerCase();
          
          // Check if DASHBOARD_URL is the same as current page or login page
          if (dashboardUrlLower.includes('/login') || 
              dashboardUrlLower === currentUrlLower ||
              dashboardUrlLower.includes(currentUrlLower + '/login')) {
            console.error('Invalid DASHBOARD_URL - cannot redirect to login page:', DASHBOARD_URL);
            setError(`Dashboard URL is incorrectly configured. Current: ${DASHBOARD_URL}. Please set REACT_APP_DASHBOARD_URL to your dashboard deployment URL (not the login page).`);
            setLoading(false);
            return;
          }
          
          try {
            // Redirect to dashboard with token and user in URL params
            const redirectUrl = new URL(DASHBOARD_URL);
            redirectUrl.searchParams.set('token', token);
            if (user) {
              redirectUrl.searchParams.set(
                'user',
                encodeURIComponent(JSON.stringify(user))
              );
            }
            // Force redirect immediately - don't set loading to false
            console.log('Redirecting to dashboard:', redirectUrl.toString());
            window.location.href = redirectUrl.toString();
            return; // Don't execute code below
          } catch (urlError) {
            console.error('Error creating redirect URL:', urlError, 'DASHBOARD_URL:', DASHBOARD_URL);
            // Check if DASHBOARD_URL is a valid URL
            if (!DASHBOARD_URL.startsWith('http://') && !DASHBOARD_URL.startsWith('https://')) {
              setError(`Invalid dashboard URL: ${DASHBOARD_URL}. Please set REACT_APP_DASHBOARD_URL to a valid URL (e.g., https://your-dashboard.vercel.app)`);
              setLoading(false);
              return;
            }
            // Fallback: redirect without params (dashboard will check localStorage)
            window.location.href = DASHBOARD_URL;
            return; // Don't execute code below
          }
        } else {
          console.error('No token available after successful login');
          setError("Login succeeded but token was not saved. Please try again.");
          setLoading(false);
        }
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

