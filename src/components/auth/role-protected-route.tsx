import { useEffect } from "react";
import { useAuth } from "./auth-context-provider";
import { useNavigate } from "react-router-dom";

interface RoleProtectedRouteProps {
    children: JSX.Element;
    requiredRole: "admin" | "common";
}

const RoleProtectedRoute = ({ children, requiredRole }: RoleProtectedRouteProps) => {
    const { isAuthenticated, hasPermission } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !hasPermission(requiredRole)) {
            navigate("/unauthorized");
        }
    }, [isAuthenticated, hasPermission, requiredRole, navigate]);

    return isAuthenticated && hasPermission(requiredRole) ? children : null;
};

export default RoleProtectedRoute;
