import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: 'admin' | 'worker' | 'citizen';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const location = useLocation();

    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && userRole !== role) {
        // If the user's role doesn't match the required role, redirect to appropriate dashboard
        if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (userRole === 'worker') return <Navigate to="/worker/dashboard" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
