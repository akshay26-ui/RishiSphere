import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Redirects logged-in users away from login/signup pages
export default function GuestRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/calendar" replace />;
    }

    return children;
}
