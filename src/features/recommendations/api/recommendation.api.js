import api from "../../../shared/api/axios";

export const fetchRecommendation = () => api.get("/recommendations/me").then((res) => res.data);