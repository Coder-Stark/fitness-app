import { BrowserRouter } from "react-router-dom";

// Phase 1 adds AuthProvider here, Phase 5 adds NotificationsProvider
export default function AppProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}