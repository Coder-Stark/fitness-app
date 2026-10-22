import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../../features/auth/context/AuthProvider";
import NotificationsProvider from "../../features/notifications/context/NotificationsProvider";
import ServerTimeProvider from "../../features/time/context/ServerTimeProvider";

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServerTimeProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
        </ServerTimeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}