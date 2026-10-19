import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLE_HOME } from "../../../shared/constants/roles";
import Spinner from "../../../shared/components/ui/Spinner";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />;

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold">Sign in</h1>
      <p className="mb-6 text-sm text-gray-500">Book and manage your fitness sessions.</p>
      <LoginForm />
    </div>
  );
}