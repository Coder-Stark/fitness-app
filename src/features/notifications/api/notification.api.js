import api from "../../../shared/api/axios";

export const fetchNotifications = (limit = 20) =>
  api.get("/notifications", { params: { limit } }).then((res) => res.data);

export const fetchUnreadCount = () =>
  api.get("/notifications/unread-count").then((res) => res.data.unreadCount);

export const markNotificationRead = (id) =>
  api.patch(`/notifications/${id}/read`).then((res) => res.data.notification);

export const markAllNotificationsRead = () =>
  api.post("/notifications/read-all").then((res) => res.data);