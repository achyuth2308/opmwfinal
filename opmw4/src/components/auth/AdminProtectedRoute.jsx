import { Navigate, useLocation } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
    const location = useLocation()
    const isAdminAuthenticated = !!localStorage.getItem('opmw-admin-token')

    if (!isAdminAuthenticated) {
        // Redirect to admin login if trying to access any admin route
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    return children
}

export default AdminProtectedRoute
