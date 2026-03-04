import { motion } from 'framer-motion'
import { Building2, MapPin, Layers } from 'lucide-react'

const HIGHLIGHTS = [
    {
        icon: Building2,
        label: 'Founded',
        value: '2021',
        detail: 'Chennai, India',
    },
    {
        icon: MapPin,
        label: 'HQ',
        value: 'Tidel Park',
        detail: 'Chennai – 600113',
    },
    {
        icon: Layers,
        label: 'Sectors',
        value: 'BPO · IT · HRMS',
        detail: 'Integrated delivery',
    },
]

const AboutOPMW = () => {
    return (
        <section
            style={{
                padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px)',
                position: 'relative',
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 48,
                    alignItems: 'center',
                }}
            >
                {/* Left — text */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                >
                    <div className="section-divider" style={{ marginBottom: 16 }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        About OPMW
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(26px, 3.5vw, 44px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            marginBottom: 20,
                            lineHeight: 1.15,
                        }}
                    >
                        Execution at scale,<br />built from ground up
                    </h2>
                    <p
                        style={{
                            fontSize: 'clamp(14px, 1.5vw, 16px)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            marginBottom: 16,
                        }}
                    >
                        OPMW (One Platform Multiple Work) was founded to solve a fragmented problem — enterprises
                        juggling separate vendors for BPO, IT, and HR. We built a single delivery engine that
                        handles all three.
                    </p>
                    <p
                        style={{
                            fontSize: 'clamp(14px, 1.5vw, 16px)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                        }}
                    >
                        Today, 300+ professionals across 5 Indian cities deliver voice campaigns, software
                        platforms, and HRMS solutions for clients spanning e-commerce, manufacturing,
                        fintech, and real estate.
                    </p>
                </motion.div>

                {/* Right — stat highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {HIGHLIGHTS.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: '16px 20px',
                                    transition: 'border-color 200ms ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(110,231,250,0.2)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 8,
                                        background: 'rgba(110,231,250,0.07)',
                                        border: '1px solid rgba(110,231,250,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={18} style={{ color: 'var(--accent)' }} />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 10,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: 'var(--text-muted)',
                                            marginBottom: 3,
                                        }}
                                    >
                                        {item.label}
                                    </p>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {item.value}
                                    </p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.detail}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default AboutOPMW
