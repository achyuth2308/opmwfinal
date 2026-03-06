import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import TypewriterText from '@/components/shared/TypewriterText'
import BranchCard from '@/components/contact/BranchCard'
import ContactForm from '@/components/contact/ContactForm'
import { LOCATIONS } from '@/constants/locations'

const Contact = () => {
    return (
        <>
            {/* Hero */}
            <section
                style={{
                    padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(40px, 5vw, 60px)',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        height: 400,
                        background: 'radial-gradient(ellipse, rgba(110,231,250,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ marginBottom: 20 }}
                    >
                        <span className="pill-badge">Contact</span>
                    </motion.div>
                    <motion.h1
                        style={{
                            fontSize: 'clamp(36px, 5.5vw, 72px)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            color: 'var(--text-primary)',
                            marginBottom: 16,
                        }}
                    >
                        <TypewriterText
                            text={[
                                { text: "Let's talk operations" }
                            ]}
                            delay={0.2}
                        />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18 }}
                        style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 480, margin: '0 auto 20px' }}
                    >
                        Whether you're exploring BPO, IT, or HRMS — our team responds within 1 business day.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        href="mailto:info@opmw.in"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 15,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--accent)',
                            textDecoration: 'none',
                        }}
                    >
                        <Mail size={15} />
                        info@opmw.in
                    </motion.a>
                </div>
            </section>

            {/* Branch cards */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 clamp(24px, 5vw, 80px) clamp(48px, 6vw, 72px)',
                    }}
                >
                    <div style={{ marginBottom: 32 }}>
                        <div className="section-divider" style={{ marginBottom: 16 }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 10 }}>Our Offices</p>
                        <h2
                            style={{
                                fontSize: 'clamp(24px, 3vw, 36px)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Five cities. Always reachable.
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 16,
                        }}
                    >
                        {LOCATIONS.map((location) => (
                            <BranchCard key={location.id} location={location} />
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Contact form + map */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 120px)',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: 40,
                            alignItems: 'start',
                        }}
                    >
                        {/* Form */}
                        <ContactForm />

                        {/* Map + info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Google Maps embed — OPMW HQ, Tidel Park Chennai */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.2456!3d12.9999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTidel+Park+Chennai!5e0!3m2!1sen!2sin!4v1"
                                width="100%"
                                height="280"
                                style={{ border: 0, borderRadius: 12, display: 'block' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="OPMW HQ Location"
                            />

                            {/* Quick info */}
                            <div
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: 24,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 14,
                                }}
                            >
                                <h4
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    Corporate Information
                                </h4>
                                {[
                                    { label: 'Email', value: 'info@opmw.in', href: 'mailto:info@opmw.in' },
                                    { label: 'Response Time', value: '1 business day' },
                                    { label: 'HQ Location', value: 'Tidel Park, Chennai' },
                                    { label: 'Operating Hours', value: 'Mon–Sat, 9AM–7PM IST' },
                                ].map((item) => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                                        <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                                            {item.label}
                                        </span>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.value}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </>
    )
}

export default Contact

