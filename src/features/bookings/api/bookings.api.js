import api from "../../../shared/api/axios";

export const fetchMyBookings = () => api.get("/bookings/mine").then((res) => res.data.bookings);

export const fetchAssignedBookings = () =>
  api.get("/bookings/assigned").then((res) => res.data.bookings);

export const cancelBooking = (bookingId, reason) =>
  api.post(`/bookings/${bookingId}/cancel`, reason ? { reason } : {}).then((res) => res.data);

export const rescheduleBooking = (bookingId, startTime, preferredTrainerId) =>
  api
    .post(`/bookings/${bookingId}/reschedule`, {
      startTime,
      ...(preferredTrainerId && { preferredTrainerId }),
    })
    .then((res) => res.data);