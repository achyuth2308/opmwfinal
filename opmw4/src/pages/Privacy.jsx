import { motion } from 'framer-motion'
import TypewriterText from '@/components/shared/TypewriterText'

const SECTIONS = [
    {
        title: 'Information We Collect',
        body: 'We collect information you provide directly to us — such as name, email address, phone number, company information, and any other information submitted through our contact forms or service inquiry portals. We also collect usage data through server logs and analytics tools.',
    },
    {
        title: 'How We Use Your Information',
        body: 'We use collected information to process service requests, respond to inquiries, send operational communications, improve our services, and comply with legal obligations. We do not sell your data to third parties.',
    },
    {
        title: 'Data Storage & Security',
        body: 'Your information is stored on secure servers within India. We implement industry-standard technical and organizational measures including encryption in transit (TLS), access controls, and regular security audits.',
    },
    {
        title: 'Cookies',
        body: 'We use session cookies and analytics cookies to improve your browsing experience. You may disable cookies in your browser settings; however, some features of the site may not function properly without them.',
    },
    {
        title: 'Data Retention',
        body: 'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Upon request, we can delete or anonymize your data subject to legal obligations.',
    },
    {
        title: 'Your Rights',
        body: 'You have the right to access, correct, or delete personal information we hold about you. You may also object to processing or request portability. To exercise these rights, email us at info@opmw.in.',
    },
    {
        title: 'Third-Party Services',
        body: 'We may use third-party service providers for analytics, email delivery, and CRM. These providers are contractually obligated to handle data securely and may not use it for their own commercial purposes.',
    },
    {
        title: 'Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance.',
    },
    {
        title: 'Contact Us',
        body: 'For any privacy-related questions, please contact our Data Protection Officer at info@opmw.in or write to us at OPMW, Tidel Park, Taramani, Chennai – 600113.',
    },
]

const Privacy = () => {
    return (
        <div
            style={{
                maxWidth: 760,
                margin: '0 auto',
                padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span
                    style={{
                        fontSize: 10,
                        fontFamily: 'JetBrains Mono, monospace',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        display: 'block',
                        marginBottom: 16,
                    }}
                >
                    Legal
                </span>
                <h1
                    style={{
                        fontSize: 'clamp(32px, 4vw, 48px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        marginBottom: 8,
                    }}
                >
                    <TypewriterText text="Privacy Policy" delay={0.2} />
                </h1>
                <p
                    style={{
                        fontSize: 13,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                        marginBottom: 48,
                    }}
                >
                    Effective Date: 1 January 2025 Â· Last Updated: 1 January 2025
                </p>

                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40 }}>
                    OPMW ("One Place Multi Work", "we", "our", or "us") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, store, and share your information when you
                    visit our website or use our services.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {SECTIONS.map((section, i) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                        >
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.01em',
                                    marginBottom: 12,
                                }}
                            >
                                {i + 1}. {section.title}
                            </h2>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                {section.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Privacy

