// ===========================================
// Countdowns API
// ===========================================

import { api } from "./client";

export const countdownsApi = {
  // Get all countdowns for current user
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query
      ? `/api/v1/countdowns?${query}`
      : "/api/v1/countdowns";
    const response = await api.get(endpoint);
    return response;
  },

  // Get single countdown by ID
  getById: async (id, opt = {}) => {
    const response = await api.get(`/api/v1/countdowns/${id}`, { ...opt });
    return response;
  },

  // Create new countdown
  create: async (data) => {
    const response = await api.post("/api/v1/countdowns", data);
    return response;
  },

  // Update countdown
  update: async (id, data) => {
    const response = await api.put(`/api/v1/countdowns/${id}`, data);
    return response;
  },

  // Delete countdown
  delete: async (id) => {
    const response = await api.delete(`/api/v1/countdowns/${id}`);
    return response;
  },

  // Get countdown stats
  getStats: async () => {
    const response = await api.get("/api/v1/countdowns/stats");
    return response;
  },
};

export default countdownsApi;
