// API Configuration
// Update these URLs when deploying to production

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:3001';

// Production safety check: require dashboard URL to be configured
if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_DASHBOARD_URL) {
  // eslint-disable-next-line no-console
  console.error('REACT_APP_DASHBOARD_URL is required in production.');
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

export { API_BASE_URL, DASHBOARD_URL };
