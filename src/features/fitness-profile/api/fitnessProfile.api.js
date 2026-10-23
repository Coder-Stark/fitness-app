import api from "../../../shared/api/axios";

export const fetchMyProfile = () => api.get("/fitness-profile/me").then((res) => res.data.profile);

export const saveMyProfile = (payload) =>
  api.put("/fitness-profile/me", payload).then((res) => res.data.profile);