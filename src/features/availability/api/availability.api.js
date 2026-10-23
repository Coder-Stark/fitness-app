import api from "../../../shared/api/axios";

export const fetchMyAvailability = () =>
  api.get("/availability/me").then((res) => res.data.weeklySchedule);

export const saveMyAvailability = (weeklySchedule) =>
  api.put("/availability/me", { weeklySchedule }).then((res) => res.data.weeklySchedule);