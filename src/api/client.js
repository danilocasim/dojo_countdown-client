// ===========================================
// API Client - Fetch-based HTTP Client
// ===========================================

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data.accessToken;
  } catch (error) {
    clearTokens();
    return null;
  }
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (!options.skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === "object") {
    config.body = JSON.stringify(options.body);
  }

  let response = await fetch(url, config);

  // Handle 401 - Try to refresh token
  if (response.status === 401 && !options.skipAuth && !options.isRetry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      response = await fetch(url, { ...config, headers, isRetry: true });
    }
  }

  return response;
};

// API Methods
export const api = {
  get: (endpoint, options = {}) =>
    fetchWithAuth(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    fetchWithAuth(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    fetchWithAuth(endpoint, { ...options, method: "PUT", body }),

  patch: (endpoint, body, options = {}) =>
    fetchWithAuth(endpoint, { ...options, method: "PATCH", body }),

  delete: (endpoint, options = {}) =>
    fetchWithAuth(endpoint, { ...options, method: "DELETE" }),
};

export { setTokens, clearTokens, getAccessToken, getRefreshToken };

export default api;
