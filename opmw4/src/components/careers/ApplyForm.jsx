import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { X, Upload, CheckCircle2, Loader2, LogIn } from 'lucide-react'
import { PREFERRED_CITIES } from '@/constants/careers'
import { submitApplication } from '@/services/careers.service'
import { useAuth } from '@/context/AuthContext'

const ApplyForm = ({ role, onClose }) => {
    const { user, token } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        full_name: user?.name || '',
        email: user?.email || '',
        phone: '',
        position: role ? role.title : '',
        preferred_city: '',
        cover_note: '',
        resume: null,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [fileName, setFileName] = useState('')

    // Sync user name/email if auth changes
    useEffect(() => {
        if (user) {
            setForm((prev) => ({ ...prev, full_name: user.name || prev.full_name, email: user.email || prev.email }))
        }
    }, [user])

    const handleEsc = useCallback((e) => {
        if (e.key === 'Escape') onClose()
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [handleEsc])

    useEffect(() => {
        if (role) setForm((prev) => ({ ...prev, position: role.title }))
    }, [role])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            setFieldErrors((prev) => ({ ...prev, resume: 'Only PDF files are allowed.' }))
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setFieldErrors((prev) => ({ ...prev, resume: 'File must be under 5MB.' }))
            return
        }
        setFieldErrors((prev) => ({ ...prev, resume: undefined }))
        setForm((prev) => ({ ...prev, resume: file }))
        setFileName(file.name)
    }

    // Client-side validation
    const validate = () => {
        const errors = {}
        // phone validated separately below

        if (!form.full_name.trim() || form.full_name.trim().length < 2) {
            errors.full_name = 'Full name must be at least 2 characters.'
        }
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = 'Please enter a valid email address.'
        }
        if (!form.phone.trim() || !/^[0-9]{10}$/.test(form.phone.trim())) {
            errors.phone = 'Phone number must be exactly 10 digits.'
        }
        if (!form.preferred_city) {
            errors.preferred_city = 'Please select a preferred city.'
        }
        if (form.cover_note && form.cover_note.length > 2000) {
            errors.cover_note = `Cover note must be under 2000 characters (currently ${form.cover_note.length}).`
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setIsLoading(true)
        setFieldErrors({})

        try {
            const fd = new FormData()
            fd.append('applicant_name', form.full_name)
            fd.append('applicant_email', form.email)
            fd.append('applicant_phone', form.phone)
            fd.append('role', form.position)
            fd.append('location', form.preferred_city)
            fd.append('cover_note', form.cover_note)
            if (form.resume) fd.append('resume', form.resume)

            await submitApplication(fd)
            setSuccess(true)
        } catch (err) {
            if (err.response?.status === 409) {
                setError('You have already applied for this position.')
            } else if (err.type === 'validation' && err.fieldErrors) {
                setFieldErrors(err.fieldErrors)
                setError(err.message || 'Please fix the errors below.')
            } else {
                setError(err.message || 'Submission failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Auth guard â€” not logged in
    if (!token) {
        return (
            <AnimatePresence>
                <>
                    <motion.div
                        key="apply-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 9000 }}
                        aria-hidden="true"
                    />
                    <motion.div
                        key="apply-panel"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 9001, width: 'min(480px, 100vw)', background: '#0F1219', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 20 }}
                    >
                        <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <X size={16} />
                        </button>
                        <LogIn size={40} style={{ color: 'var(--accent)' }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>Sign in to Apply</h2>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.7 }}>
                            You need to be signed in to apply for a position at OPMW.
                        </p>
                        <button
                            onClick={() => { onClose(); navigate('/login') }}
                            style={{ padding: '12px 28px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.18)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.1)' }}
                        >
                            Go to Login
                        </button>
                    </motion.div>
                </>
            </AnimatePresence>
        )
    }

    const cityOptions = (role && role.cities && role.cities.length > 0) ? role.cities : PREFERRED_CITIES

    return (
        <AnimatePresence>
            <>
                {/* Backdrop */}
                <motion.div
                    key="apply-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 9000 }}
                    aria-hidden="true"
                />

                {/* Drawer */}
                <motion.div
                    key="apply-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Apply for position"
                    style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 9001, width: 'min(560px, 100vw)', background: '#0F1219', borderLeft: '1px solid var(--border)', overflowY: 'auto', padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 4 }}>Application</p>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                                {role ? role.title : 'Apply Now'}
                            </h2>
                        </div>
                        <button onClick={onClose} aria-label="Close application form" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 200ms ease', flexShrink: 0 }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ height: 1, background: 'var(--border)' }} />

                    {success ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '48px 0' }}>
                            <CheckCircle2 size={48} style={{ color: 'var(--accent)', margin: '0 auto 20px' }} />
                            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Application submitted!</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>We review every application carefully and will reach out within 5 business days.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Full name (pre-filled, read-only) */}
                            <div>
                                <label htmlFor="apply-name" className="field-label">Full Name *</label>
                                <input
                                    id="apply-name"
                                    name="full_name"
                                    type="text"
                                    required
                                    value={form.full_name}
                                    readOnly
                                    className="field-input"
                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                />
                                {fieldErrors.full_name && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.full_name}</p>}
                            </div>

                            {/* Email (pre-filled, read-only) */}
                            <div>
                                <label htmlFor="apply-email" className="field-label">Email *</label>
                                <input
                                    id="apply-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    readOnly
                                    className="field-input"
                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                />
                                {fieldErrors.email && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="apply-phone" className="field-label">Phone *</label>
                                <input
                                    id="apply-phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="10-digit mobile number"
                                    value={form.phone}
                                    maxLength={10}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                                        setForm((prev) => ({ ...prev, phone: val }))
                                        setFieldErrors((prev) => ({ ...prev, phone: undefined }))
                                    }}
                                    className={`field-input${fieldErrors.phone ? ' error' : ''}`}
                                />
                                {fieldErrors.phone && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.phone}</p>}
                            </div>

                            {/* Position (pre-filled, read-only) */}
                            <div>
                                <label htmlFor="apply-position" className="field-label">Position</label>
                                <input id="apply-position" name="position" type="text" value={form.position} readOnly className="field-input" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                            </div>

                            {/* Preferred city */}
                            <div>
                                <label htmlFor="apply-city" className="field-label">Preferred City *</label>
                                <select
                                    id="apply-city"
                                    name="preferred_city"
                                    required
                                    value={form.preferred_city}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.preferred_city ? ' error' : ''}`}
                                >
                                    <option value="">Select preferred city</option>
                                    {cityOptions.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                {fieldErrors.preferred_city && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.preferred_city}</p>}
                            </div>

                            {/* Resume upload */}
                            <div>
                                <label className="field-label" htmlFor="apply-resume">Resume (PDF, max 5MB)</label>
                                <label
                                    htmlFor="apply-resume"
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: `1px dashed ${fieldErrors.resume ? 'rgba(248,113,113,0.4)' : 'rgba(110,231,250,0.2)'}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, color: fileName ? 'var(--text-primary)' : 'var(--text-muted)', background: 'rgba(110,231,250,0.03)', transition: 'border-color 200ms ease' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(110,231,250,0.4)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = fieldErrors.resume ? 'rgba(248,113,113,0.4)' : 'rgba(110,231,250,0.2)' }}
                                >
                                    <Upload size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                    {fileName || 'Upload PDF (max 5MB)'}
                                </label>
                                <input id="apply-resume" type="file" accept=".pdf" onChange={handleFile} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }} />
                                {fieldErrors.resume && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.resume}</p>}
                            </div>

                            {/* Cover note */}
                            <div>
                                <label htmlFor="apply-cover" className="field-label">
                                    Cover Note
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>({form.cover_note.length}/2000)</span>
                                </label>
                                <textarea
                                    id="apply-cover"
                                    name="cover_note"
                                    rows={4}
                                    placeholder="Tell us why you're a great fit for this role..."
                                    value={form.cover_note}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.cover_note ? ' error' : ''}`}
                                    style={{ resize: 'vertical', minHeight: 100 }}
                                />
                                {fieldErrors.cover_note && <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>{fieldErrors.cover_note}</p>}
                            </div>

                            {/* Global error */}
                            {error && (
                                <div style={{ padding: '12px 16px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{ padding: '14px 24px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 200ms ease', opacity: isLoading ? 0.7 : 1 }}
                                onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = 'rgba(110,231,250,0.18)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.1)' }}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                        Submittingâ€¦
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </>
        </AnimatePresence>
    )
}

ApplyForm.propTypes = {
    role: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        cities: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    onClose: PropTypes.func.isRequired,
}

ApplyForm.defaultProps = {
    role: null,
}

export default ApplyForm

