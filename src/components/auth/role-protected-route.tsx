import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context-provider";

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole: string }) => {
    const { isAuthenticated, hasPermission } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!hasPermission(requiredRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
