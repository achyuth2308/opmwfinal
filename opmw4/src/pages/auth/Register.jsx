import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import OPMWLogo from '@/components/shared/OPMWLogo'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const CITIES = ['Chennai', 'Hyderabad', 'Bangalore', 'Noida', 'Indore']

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

const getStrength = (pw) => {
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
}
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColors = ['', '#f87171', '#FBB040', '#4ade80', '#6EE7FA']

const Register = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', password: '', confirmPassword: '' })
    const [showPw, setShowPw] = useState(false)
    const [showCpw, setShowCpw] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})

    const strength = getStrength(form.password)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
        setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const validateElement = (name, value) => {
        let error = ''
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required'
                } else if (value.trim().length < 3) {
                    error = 'Name must be at least 3 characters'
                } else if (/\d/.test(value)) {
                    error = 'Numbers are not allowed'
                } else if (/[^a-zA-Z ]/.test(value)) {
                    error = 'Special characters are not allowed'
                } else if (/\s\s+/.test(value)) {
                    error = 'Multiple consecutive spaces are not allowed'
                }
                break
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required'
                } else if (/\s/.test(value)) {
                    error = 'Email cannot contain spaces'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format'
                }
                break
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone number is required'
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Phone number must be exactly 10 digits'
                }
                break
            case 'city':
                if (!value) error = 'Please select a city'
                break
            case 'password':
                if (value.length < 8) {
                    error = 'Min. 8 characters'
                } else if (!/[A-Z]/.test(value)) {
                    error = 'Must contain at least 1 uppercase letter'
                } else if (!/[^A-Za-z0-9]/.test(value)) {
                    error = 'Must contain at least 1 special character'
                } else if (!/[0-9]/.test(value)) {
                    error = 'Must contain at least 1 number'
                } else if (!/[a-z]/.test(value)) {
                    error = 'Must contain at least 1 lowercase letter'
                }
                break
            case 'confirmPassword':
                if (value !== form.password) error = 'Passwords do not match'
                break
            default:
                break
        }
        return error
    }

    const validate = () => {
        const errs = {}
        Object.keys(form).forEach(key => {
            const error = validateElement(key, form[key])
            if (error) errs[key] = error
        })
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
        setIsLoading(true)
        setError('')
        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: form.name, email: form.email, phone: form.phone,
                    city: form.city, password: form.password, password_confirmation: form.confirmPassword,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                if (data.errors) {
                    const mapped = {}
                    Object.entries(data.errors).forEach(([k, v]) => { mapped[k] = Array.isArray(v) ? v[0] : v })
                    setFieldErrors(mapped)
                } else {
                    setError(data.message || 'Registration failed. Please try again.')
                }
                return
            }
            login(data.user, data.token)
            navigate('/portal', { replace: true })
        } catch {
            setError('Network error. Please check your connection.')
        } finally {
            setIsLoading(false)
        }
    }

    const FocusStyle = { borderColor: 'rgba(110,231,250,0.4)' }
    const BlurStyle = { borderColor: 'rgba(255,255,255,0.10)' }

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

            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: '15%',
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
                    maxWidth: 460,
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
                    <Link to="/" aria-label="OPMW Home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginLeft: -33 }}>
                        <OPMWLogo size="md" showAnimation={false} />
                    </Link>
                </div>

                <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, marginTop: -60, letterSpacing: '-0.02em' }}>
                    Create your account
                </h1>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                    Join the OPMW candidate portal and track your applications.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {/* Name */}
                    <div>
                        <label htmlFor="reg-name" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Full Name *</label>
                        <input id="reg-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" style={{ ...fieldStyle, borderColor: fieldErrors.name ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                        {fieldErrors.name && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="reg-email" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Email *</label>
                        <input id="reg-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" style={{ ...fieldStyle, borderColor: fieldErrors.email ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                        {fieldErrors.email && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.email}</p>}
                    </div>

                    {/* Phone + City row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label htmlFor="reg-phone" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Phone *</label>
                            <input id="reg-phone" name="phone" type="tel" required value={form.phone} onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                                setForm((prev) => ({ ...prev, phone: val }))
                                setError('')
                                setFieldErrors((prev) => ({ ...prev, phone: '' }))
                            }} placeholder="10-digit mobile number" style={{ ...fieldStyle, borderColor: fieldErrors.phone ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} maxLength={10} />
                            {fieldErrors.phone && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="reg-city" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>City *</label>
                            <select id="reg-city" name="city" required value={form.city} onChange={handleChange} style={{ ...fieldStyle, borderColor: fieldErrors.city ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)', colorScheme: 'dark' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)}>
                                <option value="" style={{ background: '#1a1a2e', color: '#e2e8f0' }}>Select city</option>
                                {CITIES.map((c) => <option key={c} value={c} style={{ background: '#1a1a2e', color: '#e2e8f0' }}>{c}</option>)}
                            </select>
                            {fieldErrors.city && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.city}</p>}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="reg-password" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Password *</label>
                        <div style={{ position: 'relative' }}>
                            <input id="reg-password" name="password" type={showPw ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="Min. 8 characters" style={{ ...fieldStyle, paddingRight: 44, borderColor: fieldErrors.password ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }} aria-label="Toggle password visibility">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {form.password && (
                            <div style={{ marginTop: 8 }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.08)', transition: 'background 200ms ease' }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 11, color: strengthColors[strength], fontFamily: 'JetBrains Mono, monospace' }}>
                                    {strengthLabels[strength]}
                                </span>
                            </div>
                        )}
                        {fieldErrors.password && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.password}</p>}
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label htmlFor="reg-confirm" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Confirm Password *</label>
                        <div style={{ position: 'relative' }}>
                            <input id="reg-confirm" name="confirmPassword" type={showCpw ? 'text' : 'password'} required value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" style={{ ...fieldStyle, paddingRight: 44, borderColor: fieldErrors.confirmPassword ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.10)' }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                            <button type="button" onClick={() => setShowCpw(!showCpw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }} aria-label="Toggle confirm password visibility">
                                {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {form.confirmPassword && form.password === form.confirmPassword && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                <CheckCircle2 size={11} style={{ color: '#4ade80' }} />
                                <span style={{ fontSize: 11, color: '#4ade80', fontFamily: 'JetBrains Mono, monospace' }}>Passwords match</span>
                            </div>
                        )}
                        {fieldErrors.confirmPassword && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.confirmPassword}</p>}
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>
                            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{ width: '100%', padding: '13px 20px', borderRadius: 8, background: 'rgba(110,231,250,0.12)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 200ms ease', opacity: isLoading ? 0.7 : 1, marginTop: 4 }}
                        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = 'rgba(110,231,250,0.2)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.12)' }}
                    >
                        {isLoading ? <><Loader2 size={16} className="spin" /> Creating account…</> : 'Create Account'}
                    </button>
                </form>

                <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                </p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 0.9s linear infinite; }`}</style>
        </div>
    )
}

export default Register
