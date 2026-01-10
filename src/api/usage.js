// ===========================================
// Usage API
// ===========================================

import { api } from "./client";

export const usageApi = {
  // Get current usage
  getCurrent: async () => {
    const response = await api.get("/api/v1/usage");
    return response;
  },

  // Get usage history
  getHistory: async (months = 6) => {
    const response = await api.get(`/api/v1/usage/history?months=${months}`);
    return response;
  },

  // Quick quota check
  checkQuota: async () => {
    const response = await api.get("/api/v1/usage/check");
    return response;
  },
};

export default usageApi;
