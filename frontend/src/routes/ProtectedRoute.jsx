import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// only let logged in users through
function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    // not logged in
    if (!user) return <Navigate to="/login" />;

    // wrong role (e.g. student trying to access admin)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
