import { useCallback, useEffect, useMemo, useState } from "react";
import { ROLES } from "../../../shared/constants/roles";
import { usePolling } from "../../../shared/hooks/usePolling";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "../api/notification.api";
import { NotificationsContext } from "./NotificationsContext";

const POLL_INTERVAL_MS = 8_000;

export default function NotificationsProvider({ children }) {
  const { user } = useAuth();
  // Trainers and customers are notified. Admins are not
  const enabled = user?.role === ROLES.TRAINER || user?.role === ROLES.CUSTOMER;

  const [unreadCount, setUnreadCount] = useState(0);
  const [items, setItems] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState("");

  const refreshCount = useCallback(async () => {
    try {
      setUnreadCount(await fetchUnreadCount());
    } catch {
      // keep the last known count, the next poll tries again
    }
  }, []);

  const loadList = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await fetchNotifications();
      setItems(data.notifications);
      setUnreadCount(data.unreadCount);
      setListError("");
    } catch (err) {
      setListError(getErrorMessage(err));
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      refreshCount();
    } else {
      setUnreadCount(0);
      setItems([]);
    }
  }, [enabled, refreshCount]);

  usePolling(refreshCount, POLL_INTERVAL_MS, enabled);

  const markRead = useCallback(
    async (id) => {
      try {
        await markNotificationRead(id);
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
        setUnreadCount((count) => Math.max(0, count - 1));
      } catch {
        refreshCount();
      }
    },
    [refreshCount]
  );

  const markAllRead = useCallback(async () => {
    try {
      await markAllNotificationsRead();
      setItems((prev) => prev.map((item) => ({ ...item, read: true })));
      setUnreadCount(0);
    } catch {
      refreshCount();
    }
  }, [refreshCount]);

  const value = useMemo(
    () => ({ unreadCount, items, loadingList, listError, loadList, markRead, markAllRead }),
    [unreadCount, items, loadingList, listError, loadList, markRead, markAllRead]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}