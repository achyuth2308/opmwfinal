import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Shield } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { adminLogin } from '@/services/admin.service'
import OPMWLogo from '@/components/shared/OPMWLogo'

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

const AdminLogin = () => {
    const navigate = useNavigate()
    const { addToast } = useToast()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
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
            const data = await adminLogin(form.email, form.password)
            localStorage.setItem('opmw-admin-token', data.token)
            localStorage.setItem('opmw-admin', JSON.stringify(data.admin))
            addToast(`Admin login successful. Welcome, ${data.admin.name}.`, 'success')
            navigate('/admin', { replace: true })
        } catch (err) {
            const msg = err.message || 'Invalid credentials. Please try again.'
            setError(msg)
            addToast(msg, 'error')
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
                    background: 'rgba(18, 18, 22, 0.85)',
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
                <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
                    <Link to="/" aria-label="OPMW Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                        <OPMWLogo size="md" showAnimation={false} />
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <Shield size={20} style={{ color: 'var(--accent)' }} />
                    <h1
                        style={{
                            fontSize: 'clamp(22px, 3vw, 28px)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Admin Panel
                    </h1>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                    Sign in to manage applications, candidates & contacts.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Email */}
                    <div>
                        <label htmlFor="admin-email" style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>
                            Admin Email
                        </label>
                        <input
                            id="admin-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="admin@opmw.in"
                            value={form.email}
                            onChange={handleChange}
                            style={fieldStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="admin-password" style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="admin-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                placeholder="Your admin password"
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
                                    color: 'var(--text-secondary)',
                                    padding: 4,
                                    display: 'flex',
                                }}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

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
                        {isLoading ? <><Loader2 size={16} className="spin" /> Signing in...</> : 'Sign In to Admin'}
                    </button>
                </form>

                <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                    <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13 }}>
                        ← Back to website
                    </Link>
                </p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 0.9s linear infinite; }`}</style>
        </div>
    )
}

export default AdminLogin

