import { useEffect, useRef, useState } from "react";
import { formatSlotTime } from "../../../shared/utils/formatters";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
  const { unreadCount, items, loadingList, listError, loadList, markRead, markAllRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Load the list when opened, and refresh it while open if new notifications arrive
  useEffect(() => {
    if (open) loadList();
  }, [open, unreadCount, loadList]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={open}
        className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
            <p className="text-sm font-medium">Notifications</p>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="text-xs text-gray-500 underline disabled:no-underline disabled:opacity-50"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {listError && <p className="px-4 py-3 text-sm text-red-700">{listError}</p>}

            {loadingList && items.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-500">Loading...</p>
            )}

            {!loadingList && !listError && items.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-gray-500">No notifications yet.</p>
            )}

            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => !item.read && markRead(item.id)}
                    className={`block w-full px-4 py-3 text-left text-sm ${
                      item.read ? "bg-white" : "bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <span className="flex items-start gap-2">
                      {!item.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                      <span>
                        <span className="block font-medium">{item.title}</span>
                        <span className="block text-gray-600">{item.message}</span>
                        <span className="mt-1 block text-xs text-gray-400">
                          {formatSlotTime(item.createdAt)}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}