// API Configuration
// Update these URLs when deploying to production

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
// Use environment variable if set, otherwise use relative URL (no hardcoded localhost)
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || null;

export { API_BASE_URL, FRONTEND_URL };

