import api from "../../../shared/api/axios";

export const fetchSlots = (date) => api.get("/slots", { params: { date } }).then((res) => res.data);

export const fetchInstantOffer = () => api.get("/slots/instant").then((res) => res.data);

export const createBooking = (payload, idempotencyKey) =>
  api
    .post("/bookings", payload, { headers: { "Idempotency-Key": idempotencyKey } })
    .then((res) => res.data);