import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import useFormSubmit from '@/hooks/useFormSubmit'
import { requestDemo } from '@/services/demo.service'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [form, setForm] = useState(initialForm)
    const [localErrors, setLocalErrors] = useState({})

    const { handleSubmit, isLoading, error, fieldErrors } = useFormSubmit(requestDemo, {
        onSuccess: () => {
            // Success! We stay on the page and form resets automatically
        },
        resetOnSuccess: true,
    })

    const validateField = (name, value) => {
        let error = ''
        if (name === 'contact_name') {
            if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(value)) {
                error = 'Name must contain only letters and single spaces'
            }
        } else if (name === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Please enter a valid work email'
            }
        } else if (name === 'phone') {
            if (!/^\d{10}$/.test(value)) {
                error = 'Phone must be exactly 10 digits'
            }
        } else if (value.trim() === '' && name !== 'message') {
            error = 'This field is required'
        }
        return error
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        // Prevent "long spaces" (multiple consecutive spaces)
        let processedValue = value.replace(/\s\s+/g, ' ')

        // Specific phone logic: digits only, max 10
        if (name === 'phone') {
            processedValue = value.replace(/\D/g, '').slice(0, 10)
        }

        setForm((prev) => ({ ...prev, [name]: processedValue }))

        // Clear local error on change
        if (localErrors[name]) {
            setLocalErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const errors = {}
        Object.keys(initialForm).forEach(key => {
            const err = validateField(key, form[key])
            if (err) errors[key] = err
        })

        if (Object.keys(errors).length > 0) {
            setLocalErrors(errors)
            return
        }

        handleSubmit(form)
    }

    const allFieldErrors = { ...fieldErrors, ...localErrors }

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
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: 680,
                        margin: '0 auto',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: 'clamp(20px, 4vw, 48px)',
                    }}
                >
                    <style>{`
                        .demo-form-grid {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 20px;
                        }
                        
                        .demo-form-span-2 {
                            grid-column: span 2;
                        }

                        .demo-field-input {
                            width: 100%;
                            background: rgba(255, 255, 255, 0.045);
                            border: 1px solid var(--border);
                            border-radius: 8px;
                            padding: 12px 14px;
                            color: var(--text-primary);
                            font-size: 14px;
                            font-family: 'Inter', sans-serif;
                            transition: all 200ms ease;
                            outline: none;
                        }

                        .demo-field-input:focus {
                            border-color: var(--accent);
                            background: rgba(255, 255, 255, 0.07);
                            box-shadow: 0 0 0 3px rgba(110, 231, 250, 0.08);
                        }

                        @media (max-width: 600px) {
                            .demo-form-grid {
                                grid-template-columns: 1fr;
                                gap: 16px;
                            }
                            .demo-form-span-2 {
                                grid-column: span 1;
                            }
                            .demo-field-input {
                                padding: 10px 12px;
                                font-size: 13px;
                            }
                        }
                        .demo-field-input option {
                            background-color: #111419;
                            color: #F0F4F8;
                        }
                    `}</style>

                    <form onSubmit={onSubmit} noValidate>
                        <div className="demo-form-grid">
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
                                    className={`demo-field-input${allFieldErrors.company_name ? ' error' : ''}`}
                                />
                                {allFieldErrors.company_name && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {allFieldErrors.company_name}
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
                                    className={`demo-field-input${allFieldErrors.contact_name ? ' error' : ''}`}
                                />
                                {allFieldErrors.contact_name && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {allFieldErrors.contact_name}
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
                                    className={`demo-field-input${allFieldErrors.email ? ' error' : ''}`}
                                />
                                {allFieldErrors.email && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {allFieldErrors.email}
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
                                    className={`demo-field-input${allFieldErrors.phone ? ' error' : ''}`}
                                />
                                {allFieldErrors.phone && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {allFieldErrors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Employee Count */}
                            <div className="demo-form-span-2">
                                <label htmlFor="demo-employees" className="field-label">
                                    Employee Count *
                                </label>
                                <select
                                    id="demo-employees"
                                    name="employee_count"
                                    required
                                    value={form.employee_count}
                                    onChange={handleChange}
                                    className={`demo-field-input${allFieldErrors.employee_count ? ' error' : ''}`}
                                >
                                    <option value="">Select employee range</option>
                                    {EMPLOYEE_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt} employees
                                        </option>
                                    ))}
                                </select>
                                {allFieldErrors.employee_count && (
                                    <p style={{ fontSize: 12, color: 'rgba(248,113,113,0.9)', marginTop: 4 }}>
                                        {allFieldErrors.employee_count}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="demo-form-span-2">
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
                                    className="demo-field-input"
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
                                    Sending request...
                                </>
                            ) : (
                                'Request Demo'
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </SectionWrapper>
    )
}

export default DemoRequestForm

