import api from "../../../shared/api/axios";

export const fetchServerTime = () => api.get("/time").then((res) => res.data);