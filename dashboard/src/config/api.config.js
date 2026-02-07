// API Configuration
// Update these URLs when deploying to production

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
// Use environment variable if set; otherwise fallback to localhost login during dev
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || (isLocalhost ? 'http://localhost:3000' : null);

// Production safety check: require frontend URL to be configured
if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_FRONTEND_URL) {
  // eslint-disable-next-line no-console
  console.error('REACT_APP_FRONTEND_URL is required in production.');
}

// Production safety check: require HTTPS API URL when app is served over HTTPS
if (
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  window.location.protocol === 'https:' &&
  API_BASE_URL.startsWith('http://')
) {
  // eslint-disable-next-line no-console
  console.error('REACT_APP_API_URL must be HTTPS in production to avoid mixed-content errors.');
}

export { API_BASE_URL, FRONTEND_URL };
