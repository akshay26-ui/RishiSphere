import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// if user is already logged in, don't show login/signup
function GuestRoute({ children }) {
    const { user } = useAuth();

    // user is logged in, go to calendar
    if (user) return <Navigate to="/calendar" />;

    return children;
}

export default GuestRoute;
