import api from "../../../shared/api/axios";

export const fetchAdminSummary = () => api.get("/admin/summary").then((res) => res.data);

export const fetchAdminBookings = (params) =>
  api.get("/admin/bookings", { params }).then((res) => res.data);