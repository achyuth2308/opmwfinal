import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import OPMWLogo from '@/components/shared/OPMWLogo'
import apiClient from '@/services/api'

/* ─── Google SVG Icon ─────────────────────────────────────────────────────── */
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
)

/* ─── Shared field style ──────────────────────────────────────────────────── */
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

/* ─── Google One-Tap / GSI helper ────────────────────────────────────────── */
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const loadGSI = () =>
    new Promise((resolve, reject) => {
        if (window.google?.accounts) return resolve()
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })

/* ═══════════════════════════════════════════════════════════════════════════ */

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const { addToast } = useToast()
    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState('')
    const videoRef = useRef(null)

    // Show success banner when redirected from password-reset or registration
    const resetSuccess = new URLSearchParams(location.search).get('reset') === 'success'
    const regSuccess = location.state?.message || ''

    /* ── Load Google GSI script on mount ── */
    useEffect(() => {
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') return
        loadGSI().then(() => {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: async (response) => {
                    setGoogleLoading(true)
                    try {
                        const data = await apiClient.post('auth/google', {
                            credential: response.credential,
                        })
                        login(data.user, data.token)
                        navigate(from, { replace: true })
                    } catch (err) {
                        setError(err.message || 'Google authentication failed.')
                    } finally {
                        setGoogleLoading(false)
                    }
                }
            })
            // Render the official Google button to the container
            window.google.accounts.id.renderButton(
                document.getElementById('google-signin-btn-container'),
                { theme: 'outline', size: 'large', width: '100%', shape: 'pill' }
            )
        }).catch(() => console.warn('Failed to load Google GSI'))
    }, [from, login, navigate])

    /* ── Handle Background Video ── */
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Silently sink the AbortError (e.g. power save mode)
            })
        }
    }, [])

    /* ── Form handlers ── */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        setError('')
    }

    /* ── Email / password login ── */
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
        setIsLoading(true)
        setError('')
        try {
            const data = await apiClient.post('login', { email: form.email, password: form.password })
            login(data.user, data.token)
            navigate(from, { replace: true })
        } catch (err) {
            const msg = err.message || 'Invalid credentials. Please try again.'
            setError(msg)
            addToast(msg, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    /* ── Google login ── */
    const handleGoogleLogin = () => {
        setError('')
        // Try to show the One Tap prompt as well
        window.google.accounts.id.prompt()
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
            <video
                ref={videoRef}
                loop muted playsInline
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1, pointerEvents: 'none', zIndex: 0 }}
            >
                <source src="/signup background.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(15,15,18,0.05) 0%, rgba(15,15,18,0.5) 100%)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Ambient glow */}
            <div aria-hidden="true" style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(110,231,250,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

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

                {/* Password reset success banner */}
                {resetSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 8, fontSize: 13, color: '#4ade80', marginBottom: 20 }}>
                        <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
                        Password reset successful! Please sign in with your new password.
                    </div>
                )}

                {/* Registration success banner */}
                {regSuccess && !resetSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 8, fontSize: 13, color: '#4ade80', marginBottom: 20 }}>
                        <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
                        {regSuccess}
                    </div>
                )}

                <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                    Welcome back
                </h1>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                    Sign in to your OPMW candidate portal.
                </p>

                {/* ─── Google Sign-In Button (Official Render) ─────────────── */}
                <div
                    id="google-signin-btn-container"
                    style={{ width: '100%', marginBottom: 20, minHeight: 40 }}
                />

                {/* ─── Divider ─────────────────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* ─── Email / Password Form ────────────────────────────────── */}
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
                                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }}
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
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>
                            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        id="login-submit-btn"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '13px 20px', borderRadius: 8, background: 'rgba(110,231,250,0.12)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 200ms ease', opacity: isLoading ? 0.7 : 1 }}
                        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = 'rgba(110,231,250,0.2)' }}
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
