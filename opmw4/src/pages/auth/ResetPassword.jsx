import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import OPMWLogo from '@/components/shared/OPMWLogo'
import apiClient from '@/services/api'

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

const ResetPassword = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const token = params.get('token') || ''
    const email = params.get('email') || ''

    const [form, setForm] = useState({ password: '', confirmPassword: '' })
    const [showPw, setShowPw] = useState(false)
    const [showCpw, setShowCpw] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
        if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
        setIsLoading(true)
        setError('')
        try {
            await apiClient.post('reset-password', {
                token,
                email,
                password: form.password,
                password_confirmation: form.confirmPassword,
            })
            navigate('/login?reset=success', { replace: true })
        } catch (err) {
            setError(err.message || 'Failed to reset password. The link may have expired.')
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
            }}
        >
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 500,
                    height: 300,
                    background: 'radial-gradient(ellipse, rgba(110,231,250,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    width: '100%',
                    maxWidth: 420,
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 'clamp(28px, 5vw, 44px)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 32 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent)' }}>
                        OP
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>OPMW</span>
                </Link>

                {!token ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'rgba(248,113,113,0.9)', fontSize: 14, marginBottom: 16 }}>Invalid or missing reset token.</p>
                        <Link to="/forgot-password" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14 }}>Request a new reset link â†’</Link>
                    </div>
                ) : (
                    <>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                            Set new password
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                            Choose a strong password for your account.
                        </p>

                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* New password */}
                            <div>
                                <label htmlFor="reset-pw" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                                    New Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input id="reset-pw" name="password" type={showPw ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="Min. 8 characters" style={{ ...fieldStyle, paddingRight: 44 }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }} aria-label="Toggle password">
                                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label htmlFor="reset-cpw" style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                                    Confirm Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input id="reset-cpw" name="confirmPassword" type={showCpw ? 'text' : 'password'} required value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" style={{ ...fieldStyle, paddingRight: 44 }} onFocus={(e) => Object.assign(e.target.style, FocusStyle)} onBlur={(e) => Object.assign(e.target.style, BlurStyle)} />
                                    <button type="button" onClick={() => setShowCpw(!showCpw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }} aria-label="Toggle confirm password">
                                        {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {form.confirmPassword && form.password === form.confirmPassword && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                        <CheckCircle2 size={11} style={{ color: '#4ade80' }} />
                                        <span style={{ fontSize: 11, color: '#4ade80', fontFamily: 'JetBrains Mono, monospace' }}>Passwords match</span>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>
                                    <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{ width: '100%', padding: '13px 20px', borderRadius: 8, background: 'rgba(110,231,250,0.12)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 200ms ease', opacity: isLoading ? 0.7 : 1 }}
                                onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = 'rgba(110,231,250,0.2)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.12)' }}
                            >
                                {isLoading ? <><Loader2 size={16} className="spin" /> Resettingâ€¦</> : 'Reset Password'}
                            </button>
                        </form>
                    </>
                )}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 0.9s linear infinite; }`}</style>
        </div>
    )
}

export default ResetPassword



