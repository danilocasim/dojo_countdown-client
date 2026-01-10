// ===========================================
// Render API
// ===========================================

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const renderApi = {
  // Get render URL for countdown
  getImageUrl: (countdownId, format = "gif") => {
    return `${API_URL}/api/v1/render/${countdownId}.${format}`;
  },

  // Get preview URL with cache buster
  getPreviewUrl: (countdownId, format = "gif") => {
    const cacheBuster = Date.now();
    return `${API_URL}/api/v1/render/${countdownId}.${format}?t=${cacheBuster}`;
  },

  // Get embed codes
  getEmbedCodes: (countdownId) => {
    const baseUrl = `${API_URL}/api/v1/render/${countdownId}`;

    return {
      html: `<img src="${baseUrl}.gif" alt="Countdown Timer" style="max-width: 100%; height: auto;" />`,
      markdown: `![Countdown Timer](${baseUrl}.gif)`,
      url: `${baseUrl}.gif`,
      bbcode: `[img]${baseUrl}.gif[/img]`,
    };
  },
};

export default renderApi;
