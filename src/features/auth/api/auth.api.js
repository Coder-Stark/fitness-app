import api from "../../../shared/api/axios";

export const loginRequest = (payload) => api.post("/auth/login", payload).then((res) => res.data);

export const fetchMe = () => api.get("/auth/me").then((res) => res.data);