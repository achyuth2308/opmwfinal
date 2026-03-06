import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Loader2, ArrowLeft, MailCheck } from 'lucide-react'
import OPMWLogo from '@/components/shared/OPMWLogo'
import apiClient from '@/services/api'
import { sendForgotPasswordEmail } from '@/services/emailjs.service'

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

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) { setError('Please enter your email address.'); return }
        setIsLoading(true)
        setError('')
        try {
            // 1. Call backend to generate the reset token
            const response = await apiClient.post('forgot-password', { email })

            // 2. Build the reset URL — prefer the token returned by backend,
            //    fall back to a generic link if not provided.
            const resetToken = response?.token || response?.reset_token || ''
            const resetLink = resetToken
                ? `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`
                : `${window.location.origin}/reset-password`

            // 3. Fire the EmailJS email (now blocking for better error visibility)
            await sendForgotPasswordEmail({
                to_email: email,
                to_name: response?.name || email.split('@')[0],
                reset_link: resetLink,
            })

            setSuccess(true)
        } catch (err) {
            if (err.type === 'network') {
                setError(`Connection failed. Please ensure your backend is running at ${import.meta.env.VITE_API_URL || 'the correctly configured API URL'}.`)
            } else if (err.status === 401 || err.status === 403 || err.text) {
                // This captures EmailJS specific errors
                setError(`Email service error: ${err.text || 'Unable to send email'}. Please check your Service ID and Template ID.`)
            } else {
                setError(err.message || 'Unable to send reset link. Please try again.')
            }
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

            {/* Overlay */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
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
                    width: 500,
                    height: 300,
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

                {success ? (
                    <div style={{ textAlign: 'center', padding: '8px 0' }}>
                        {/* Success icon */}
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'rgba(74,222,128,0.1)',
                            border: '1.5px solid rgba(74,222,128,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}>
                            <MailCheck size={28} style={{ color: '#4ade80' }} />
                        </div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                            Check your email
                        </h2>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
                            We've sent a password reset link to{' '}
                            <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
                            Please check your inbox and click the link to reset your password.
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 28 }}>
                            Didn't receive it? Check your spam folder or wait a few minutes.
                        </p>
                        <Link
                            to="/login"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: 14,
                                color: 'var(--accent)',
                                textDecoration: 'none',
                                fontWeight: 600,
                            }}
                        >
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                            Reset your password
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label htmlFor="forgot-email" style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                                    Email Address
                                </label>
                                <input
                                    id="forgot-email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                                    style={fieldStyle}
                                    onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }}
                                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}
                                />
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
                                {isLoading ? <><Loader2 size={16} className="spin" /> Sending...</> : 'Send Reset Link'}
                            </button>
                        </form>

                        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
                            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent)', textDecoration: 'none' }}>
                                <ArrowLeft size={13} /> Back to login
                            </Link>
                        </p>
                    </>
                )}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } .spin { animation: spin 0.9s linear infinite; }`}</style>
        </div>
    )
}

export default ForgotPassword
