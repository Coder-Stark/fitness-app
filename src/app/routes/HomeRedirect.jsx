import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROLE_HOME } from "../../shared/constants/roles";
import Spinner from "../../shared/components/ui/Spinner";

export default function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner fullScreen />;
  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={ROLE_HOME[user.role]} replace />;
}