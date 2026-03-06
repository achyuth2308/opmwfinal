import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import useFormSubmit from '@/hooks/useFormSubmit'
import { submitContactForm } from '@/services/contact.service'

const SERVICE_OPTIONS = [
    'BPO Services',
    'IT Solutions',
    'HRMS Product',
    'General Inquiry',
]

const initialForm = {
    name: '',
    email: '',
    company: '',
    service_interest: '',
    message: '',
}

const ContactForm = () => {
    const [form, setForm] = useState(initialForm)

    const { handleSubmit, isLoading, error, success, fieldErrors } = useFormSubmit(
        submitContactForm,
        {
            onSuccess: () => { },
            resetOnSuccess: true,
        }
    )

    const [localFieldErrors, setLocalFieldErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (localFieldErrors[name]) {
            setLocalFieldErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const errs = {}

        // Name validation
        if (!form.name.trim()) {
            errs.name = 'Full name is required'
        } else if (form.name.trim().length < 3) {
            errs.name = 'Name must be at least 3 characters long'
        } else if (/\s\s+/.test(form.name)) {
            errs.name = 'Multiple consecutive spaces are not allowed'
        } else if (/\d/.test(form.name)) {
            errs.name = 'Numbers are not allowed'
        } else if (/[^a-zA-Z ]/.test(form.name)) {
            errs.name = 'Special characters are not allowed'
        }

        // Email validation
        if (!form.email.trim()) {
            errs.email = 'Email is required'
        } else if (/\s/.test(form.email)) {
            errs.email = 'Email cannot contain spaces'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = 'Invalid email format'
        }

        // Company validation
        if (form.company && /\s\s+/.test(form.company)) {
            errs.company = 'Multiple consecutive spaces are not allowed'
        }

        // Message validation
        if (!form.message.trim()) {
            errs.message = 'Message is required'
        } else {
            const wordCount = form.message.trim().split(/\s+/).filter(w => w.length > 0).length
            if (wordCount > 200) {
                errs.message = `Message cannot exceed 200 words (currently ${wordCount} words)`
            }
        }

        // Service Interest
        if (!form.service_interest) {
            errs.service_interest = 'Please select a service'
        }

        return errs
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setLocalFieldErrors(errs)
            return
        }
        handleSubmit(form, () => setForm(initialForm))
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    background: 'var(--surface-2)',
                    border: '1px solid rgba(110,231,250,0.15)',
                    borderRadius: 16,
                }}
            >
                <CheckCircle2 size={48} style={{ color: 'var(--accent)', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
                    Message received
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
                    We'll get back to you within 1â€“2 business days. For urgent inquiries, email us directly at{' '}
                    <a href="mailto:info@opmw.in" style={{ color: 'var(--accent)' }}>info@opmw.in</a>.
                </p>
            </motion.div>
        )
    }

    return (
        <div
            style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 'clamp(28px, 4vw, 44px)',
            }}
        >
            <h3
                style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: 24,
                    letterSpacing: '-0.02em',
                }}
            >
                Send us a message
            </h3>

            <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Name */}
                <div>
                    <label htmlFor="contact-name" className="field-label">Full Name *</label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={`field-input${localFieldErrors.name || fieldErrors.name ? ' error' : ''}`}
                    />
                    {(localFieldErrors.name || fieldErrors.name) && (
                        <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                            {localFieldErrors.name || fieldErrors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="contact-email" className="field-label">Email *</label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`field-input${localFieldErrors.email || fieldErrors.email ? ' error' : ''}`}
                    />
                    {(localFieldErrors.email || fieldErrors.email) && (
                        <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                            {localFieldErrors.email || fieldErrors.email}
                        </p>
                    )}
                </div>

                {/* Company */}
                <div>
                    <label htmlFor="contact-company" className="field-label">Company Name</label>
                    <input
                        id="contact-company"
                        name="company"
                        type="text"
                        placeholder="Your company"
                        value={form.company}
                        onChange={handleChange}
                        className={`field-input${localFieldErrors.company ? ' error' : ''}`}
                    />
                    {localFieldErrors.company && (
                        <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                            {localFieldErrors.company}
                        </p>
                    )}
                </div>

                {/* Service interest */}
                <div>
                    <label htmlFor="contact-service" className="field-label">Service Interest *</label>
                    <select
                        id="contact-service"
                        name="service_interest"
                        required
                        value={form.service_interest}
                        onChange={handleChange}
                        className={`field-input${localFieldErrors.service_interest || fieldErrors.service_interest ? ' error' : ''}`}
                    >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {(localFieldErrors.service_interest || fieldErrors.service_interest) && (
                        <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                            {localFieldErrors.service_interest || fieldErrors.service_interest}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="contact-message" className="field-label">Message *</label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your requirements..."
                        value={form.message}
                        onChange={handleChange}
                        className={`field-input${localFieldErrors.message || fieldErrors.message ? ' error' : ''}`}
                        style={{ resize: 'vertical', minHeight: 120 }}
                    />
                    {(localFieldErrors.message || fieldErrors.message) && (
                        <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                            {localFieldErrors.message || fieldErrors.message}
                        </p>
                    )}
                </div>

                {/* Error banner */}
                {error && (
                    <div
                        style={{
                            padding: '12px 16px',
                            background: 'rgba(248,113,113,0.08)',
                            border: '1px solid rgba(248,113,113,0.25)',
                            borderRadius: 8,
                            fontSize: 13,
                            color: 'rgba(248,113,113,0.9)',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        padding: '14px 28px',
                        borderRadius: 8,
                        background: 'rgba(110,231,250,0.1)',
                        border: '1px solid rgba(110,231,250,0.3)',
                        color: 'var(--accent)',
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: 'Inter, sans-serif',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 200ms ease',
                        opacity: isLoading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.background = 'rgba(110,231,250,0.18)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                            Sendingâ€¦
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default ContactForm

