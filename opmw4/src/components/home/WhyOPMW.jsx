import { motion } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { WHY_OPMW } from '@/constants/whyOpmw'

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const WhyOPMW = () => {
    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px)',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        Why OPMW
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                            marginBottom: 16,
                        }}
                    >
                        Built different by design
                    </h2>
                    <p
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: 16,
                            lineHeight: 1.7,
                            maxWidth: 520,
                            margin: '0 auto',
                        }}
                    >
                        Six structural advantages that make OPMW the preferred operations partner
                        for enterprises building at scale.
                    </p>
                </div>

                {/* Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 20,
                    }}
                >
                    {WHY_OPMW.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-50px' }}
                                whileHover={{
                                    y: -3,
                                    borderColor: 'rgba(110,231,250,0.2)',
                                    boxShadow: '0 12px 48px rgba(110,231,250,0.1)',
                                    transition: { duration: 0.28 },
                                }}
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: 'clamp(20px, 2.5vw, 32px)',
                                    display: 'flex',
                                    gap: 18,
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Number watermark */}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 16,
                                        fontSize: 56,
                                        fontWeight: 800,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: 'rgba(255,255,255,0.025)',
                                        lineHeight: 1,
                                        userSelect: 'none',
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* Icon */}
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        background: 'var(--accent-dim)',
                                        border: '1px solid rgba(110,231,250,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={20} />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            marginBottom: 8,
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default WhyOPMW

