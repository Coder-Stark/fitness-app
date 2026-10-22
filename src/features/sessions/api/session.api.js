import api from "../../../shared/api/axios";

export const startSession = (bookingId) =>
  api.post(`/sessions/${bookingId}/start`).then((res) => res.data);