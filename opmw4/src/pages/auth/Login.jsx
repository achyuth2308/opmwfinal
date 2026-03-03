import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import OPMWLogo from '@/components/shared/OPMWLogo'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const fieldStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: 'Inter, system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 200ms ease',
    boxSizing: 'border-box',
}

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const from = location.state?.from?.pathname || '/portal'

    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }
        setIsLoading(true)
        setError('')
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password }),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message || 'Invalid credentials. Please try again.')
                return
            }
            login(data.user, data.token)
            navigate(from, { replace: true })
        } catch {
            setError('Network error. Please check your connection.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface-1)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 1,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                <source src="/signup background.mp4" type="video/mp4" />
            </video>

            {/* Light contrast overlay for readability while keeping video visible */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(15,15,18,0.05) 0%, rgba(15,15,18,0.5) 100%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Ambient glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 600,
                    height: 400,
                    background: 'radial-gradient(ellipse, rgba(110,231,250,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div
                style={{
                    width: '100%',
                    maxWidth: 420,
                    background: 'rgba(18, 18, 22, 0.65)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    padding: 'clamp(28px, 5vw, 44px)',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.03)',
                }}
            >
                {/* Logo */}
                <div style={{ marginBottom: 32 }}>
                    <Link to="/" aria-label="OPMW Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                        <OPMWLogo size="md" showAnimation={false} />
                    </Link>
                </div>

                <h1
                    style={{
                        fontSize: 'clamp(22px, 3vw, 28px)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: 6,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Welcome back
                </h1>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                    Sign in to your OPMW candidate portal.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Email */}
                    <div>
                        <label htmlFor="login-email" style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                            Email Address
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            style={fieldStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <label htmlFor="login-password" style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                Password
                            </label>
                            <Link to="/forgot-password" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                                Forgot Password?
                            </Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="login-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                placeholder="Your password"
                                value={form.password}
                                onChange={handleChange}
                                style={{ ...fieldStyle, paddingRight: 44 }}
                                onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }}
                                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                    padding: 4,
                                    display: 'flex',
                                }}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="remember"
                            checked={form.remember}
                            onChange={handleChange}
                            style={{ width: 14, height: 14, accentColor: 'var(--accent)' }}
                        />
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Remember me</span>
                    </label>

                    {/* Error */}
                    {error && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 8,
                                padding: '10px 14px',
                                background: 'rgba(248,113,113,0.08)',
                                border: '1px solid rgba(248,113,113,0.25)',
                                borderRadius: 8,
                                fontSize: 13,
                                color: 'rgba(248,113,113,0.9)',
                            }}
                        >
                            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '13px 20px',
                            borderRadius: 8,
                            background: 'rgba(110,231,250,0.12)',
                            border: '1px solid rgba(110,231,250,0.3)',
                            color: 'var(--accent)',
                            fontSize: 15,
                            fontWeight: 600,
                            fontFamily: 'Inter, system-ui, sans-serif',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            transition: 'all 200ms ease',
                            opacity: isLoading ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.background = 'rgba(110,231,250,0.2)' } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.12)' }}
                    >
                        {isLoading ? <><Loader2 size={16} className="spin" /> Signing in…</> : 'Sign In'}
                    </button>
                </form>

                <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                        Register
                    </Link>
                </p>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 0.9s linear infinite; }`}</style>
        </div>
    )
}

export default Login
