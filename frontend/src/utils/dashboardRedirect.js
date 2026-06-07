import { DASHBOARD_URL } from "../config/api.config";

export const redirectToDashboard = ({ token, user, onError }) => {
  if (!token) {
    onError?.("Authentication succeeded but token was not saved. Please try again.");
    return false;
  }

  const currentUrl = window.location.origin + window.location.pathname;
  const dashboardUrlLower = DASHBOARD_URL.toLowerCase();
  const currentUrlLower = currentUrl.toLowerCase();

  if (
    dashboardUrlLower.includes("/login") ||
    dashboardUrlLower === currentUrlLower ||
    dashboardUrlLower.includes(`${currentUrlLower}/login`)
  ) {
    onError?.(
      `Dashboard URL is incorrectly configured. Current: ${DASHBOARD_URL}. Please set REACT_APP_DASHBOARD_URL to your dashboard deployment URL.`
    );
    return false;
  }

  try {
    const redirectUrl = new URL(DASHBOARD_URL);
    redirectUrl.searchParams.set("token", token);

    if (user) {
      redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(user)));
    }

    window.location.href = redirectUrl.toString();
    return true;
  } catch (error) {
    console.error("Error creating dashboard redirect URL:", error, "DASHBOARD_URL:", DASHBOARD_URL);

    if (!DASHBOARD_URL.startsWith("http://") && !DASHBOARD_URL.startsWith("https://")) {
      onError?.(
        `Invalid dashboard URL: ${DASHBOARD_URL}. Please set REACT_APP_DASHBOARD_URL to a valid URL.`
      );
      return false;
    }

    window.location.href = DASHBOARD_URL;
    return true;
  }
};
