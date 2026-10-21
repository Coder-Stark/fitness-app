import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../../features/auth/context/AuthProvider";
import NotificationsProvider from "../../features/notifications/context/NotificationsProvider";

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}