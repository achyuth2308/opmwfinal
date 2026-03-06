import { motion } from 'framer-motion'
import TypewriterText from '@/components/shared/TypewriterText'

const SECTIONS = [
    {
        title: 'Acceptance of Terms',
        body: 'By accessing or using the OPMW website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.',
    },
    {
        title: 'Description of Services',
        body: 'OPMW provides business process outsourcing (BPO), information technology (IT) services, and HRMS software solutions to enterprise clients. Service details, deliverables, and SLAs are defined in individual Client Agreements.',
    },
    {
        title: 'Client Obligations',
        body: 'You agree to provide accurate information, maintain confidentiality of account credentials, use services only for lawful purposes, and comply with all applicable laws and regulations in your jurisdiction.',
    },
    {
        title: 'Intellectual Property',
        body: 'All content, software, and proprietary systems provided by OPMW â€” including the OPMW HRMS platform â€” remain the intellectual property of OPMW. Client data remains the property of the respective client.',
    },
    {
        title: 'Confidentiality',
        body: 'Both parties agree to maintain strict confidentiality of all non-public information shared during the service engagement. This obligation survives the termination of any service agreement.',
    },
    {
        title: 'Limitation of Liability',
        body: 'OPMW shall not be liable for indirect, incidental, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the fees paid in the three months preceding the claim.',
    },
    {
        title: 'Indemnification',
        body: 'You agree to indemnify and hold OPMW harmless from any claims, liabilities, damages, or expenses arising from your breach of these Terms or misuse of our services.',
    },
    {
        title: 'SLA & Uptime',
        body: 'OPMW HRMS targets 99.9% monthly uptime. Scheduled maintenance windows are communicated 48-hours in advance. Uptime SLAs for BPO and IT services are governed by individual client agreements.',
    },
    {
        title: 'Termination',
        body: 'Either party may terminate services with written notice as specified in the Client Agreement. Upon termination, client data will be made available for export for 30 days, after which it will be securely deleted.',
    },
    {
        title: 'Governing Law',
        body: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.',
    },
    {
        title: 'Modifications',
        body: 'OPMW reserves the right to modify these Terms at any time. Continued use of our services after notification of changes constitutes acceptance of the updated Terms.',
    },
    {
        title: 'Contact',
        body: 'For questions regarding these Terms, contact us at info@opmw.in or OPMW, Tidel Park, Taramani, Chennai â€“ 600113.',
    },
]

const Terms = () => {
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
                    <TypewriterText text="Terms of Service" delay={0.2} />
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
                    These Terms of Service govern your access to and use of OPMW's website, products, and services.
                    Please read them carefully before engaging with our platform or services.
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

export default Terms

