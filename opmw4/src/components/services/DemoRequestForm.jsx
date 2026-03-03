import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import useFormSubmit from '@/hooks/useFormSubmit'
import { requestDemo } from '@/services/demo.service'

const EMPLOYEE_OPTIONS = [
    '1–25',
    '26–50',
    '51–100',
    '101–300',
    '301–1000',
    '1000+',
]

const initialForm = {
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    employee_count: '',
    message: '',
}

const DemoRequestForm = () => {
    const [form, setForm] = useState(initialForm)

    const { handleSubmit, isLoading, error, success, fieldErrors } = useFormSubmit(requestDemo, {
        onSuccess: () => { },
        resetOnSuccess: true,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit(form, () => setForm(initialForm))
    }

    if (success) {
        return (
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        padding: 'clamp(48px, 6vw, 80px) 24px',
                        textAlign: 'center',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                    >
                        <CheckCircle2 size={48} style={{ color: 'var(--accent)', margin: '0 auto 20px' }} />
                        <h3
                            style={{
                                fontSize: 24,
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginBottom: 12,
                            }}
                        >
                            Demo request received
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                            Our team will reach out within 1 business day to schedule your HRMS demo.
                        </p>
                    </motion.div>
                </div>
            </SectionWrapper>
        )
    }

    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        Request a Demo
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(28px, 3.5vw, 44px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                            marginBottom: 12,
                        }}
                    >
                        See OPMW HRMS in action
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
                        Fill out the form and we'll schedule a live walkthrough tailored to your team size and workflows.
                    </p>
                </div>

                {/* Form card */}
                <div
                    style={{
                        maxWidth: 680,
                        margin: '0 auto',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: 'clamp(28px, 4vw, 48px)',
                    }}
                >
                    <form onSubmit={onSubmit} noValidate>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: 20,
                            }}
                        >
                            {/* Company Name */}
                            <div>
                                <label htmlFor="demo-company" className="field-label">
                                    Company Name *
                                </label>
                                <input
                                    id="demo-company"
                                    name="company_name"
                                    type="text"
                                    required
                                    placeholder="Acme Corp"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.company_name ? ' error' : ''}`}
                                />
                                {fieldErrors.company_name && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {fieldErrors.company_name}
                                    </p>
                                )}
                            </div>

                            {/* Contact Name */}
                            <div>
                                <label htmlFor="demo-contact" className="field-label">
                                    Contact Name *
                                </label>
                                <input
                                    id="demo-contact"
                                    name="contact_name"
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    value={form.contact_name}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.contact_name ? ' error' : ''}`}
                                />
                                {fieldErrors.contact_name && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {fieldErrors.contact_name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="demo-email" className="field-label">
                                    Work Email *
                                </label>
                                <input
                                    id="demo-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.email ? ' error' : ''}`}
                                />
                                {fieldErrors.email && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="demo-phone" className="field-label">
                                    Phone *
                                </label>
                                <input
                                    id="demo-phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="+91 XXXXX XXXXX"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.phone ? ' error' : ''}`}
                                />
                                {fieldErrors.phone && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {fieldErrors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Employee Count */}
                            <div style={{ gridColumn: 'span 2' }}>
                                <label htmlFor="demo-employees" className="field-label">
                                    Employee Count *
                                </label>
                                <select
                                    id="demo-employees"
                                    name="employee_count"
                                    required
                                    value={form.employee_count}
                                    onChange={handleChange}
                                    className={`field-input${fieldErrors.employee_count ? ' error' : ''}`}
                                >
                                    <option value="">Select employee range</option>
                                    {EMPLOYEE_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt} employees
                                        </option>
                                    ))}
                                </select>
                                {fieldErrors.employee_count && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {fieldErrors.employee_count}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div style={{ gridColumn: 'span 2' }}>
                                <label htmlFor="demo-message" className="field-label">
                                    What would you like to see?
                                </label>
                                <textarea
                                    id="demo-message"
                                    name="message"
                                    rows={4}
                                    placeholder="Tell us about your current HR processes and what you'd like to automate..."
                                    value={form.message}
                                    onChange={handleChange}
                                    className="field-input"
                                    style={{ resize: 'vertical', minHeight: 100 }}
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div
                                style={{
                                    marginTop: 16,
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
                                marginTop: 24,
                                width: '100%',
                                padding: '14px 24px',
                                borderRadius: 8,
                                background: isLoading ? 'rgba(110,231,250,0.06)' : 'rgba(110,231,250,0.1)',
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
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = 'rgba(110,231,250,0.18)'
                                    e.currentTarget.style.transform = 'translateY(-1px)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(110,231,250,0.1)'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                    Sending request…
                                </>
                            ) : (
                                'Request Demo'
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </SectionWrapper>
    )
}

export default DemoRequestForm
