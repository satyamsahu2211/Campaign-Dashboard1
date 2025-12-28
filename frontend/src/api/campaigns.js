import axios from "axios";

const api = axios.create({
  baseURL: "https://mixo-fe-backend-task.vercel.app",
  timeout: 8000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    // Graceful backend failures
    if ([400, 408, 422].includes(status)) {
      return Promise.resolve({ data: null });
    }

    if (status === 429) {
      console.warn("Rate limit hit. Please wait.");
    }

    return Promise.reject(err);
  }
);

// APIs (5/5)
export const getCampaigns = () => api.get("/campaigns");
export const getCampaignById = (id) => api.get(`/campaigns/${id}`);
export const getInsights = () => api.get("/campaigns/insights");
export const getCampaignInsights = (id) =>
  api.get(`/campaigns/${id}/insights`);
