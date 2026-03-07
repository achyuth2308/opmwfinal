import { createContext, useContext, useState, useCallback } from 'react'
import { useToast } from './ToastContext'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const { addToast } = useToast()
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('opmw-user')
            return stored ? JSON.parse(stored) : null
        } catch {
            return null
        }
    })
    const [token, setToken] = useState(() => localStorage.getItem('opmw-token') || null)

    const login = useCallback((userData, authToken) => {
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('opmw-user', JSON.stringify(userData))
        localStorage.setItem('opmw-token', authToken)
        addToast(`Welcome back, ${userData.name}!`, 'success')
    }, [addToast])

    const logout = useCallback(() => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('opmw-user')
        localStorage.removeItem('opmw-token')
        addToast('You have been logged out.', 'info')
    }, [addToast])

    const isAuthenticated = !!token && !!user

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

export default AuthContext

