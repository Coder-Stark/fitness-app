import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../../features/auth/context/AuthProvider";

//Phase 5 adds NotificationsProvider here
export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}