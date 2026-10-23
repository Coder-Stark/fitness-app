import api from "../../../shared/api/axios";

export const fetchMySessions = () =>
  api.get("/session-records/mine").then((res) => res.data.sessions);

export const fetchSessionRecord = (bookingId) =>
  api.get(`/session-records/${bookingId}`).then((res) => res.data);

export const saveTrainerNotes = (bookingId, payload) =>
  api.put(`/session-records/${bookingId}/trainer-notes`, payload).then((res) => res.data.record);

export const saveFeedback = (bookingId, payload) =>
  api.put(`/session-records/${bookingId}/feedback`, payload).then((res) => res.data.record);