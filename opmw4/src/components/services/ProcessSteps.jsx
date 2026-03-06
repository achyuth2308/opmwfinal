import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { ArrowRight } from 'lucide-react'

const ProcessSteps = ({ sectionLabel, headline, steps }) => {
    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(64px, 8vw, 100px) clamp(24px, 5vw, 80px)',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        {sectionLabel}
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(28px, 3.5vw, 44px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                        }}
                    >
                        {headline}
                    </h2>
                </div>

                {/* Steps â€” horizontal flow on desktop, vertical on mobile */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 0,
                        position: 'relative',
                    }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={step.id || i}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flex: '1 1 160px',
                                minWidth: 140,
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
                            >
                                {/* Step circle */}
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        border: '1.5px solid rgba(110,231,250,0.25)',
                                        background: 'rgba(110,231,250,0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 16,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Step content */}
                                <div style={{ textAlign: 'center', paddingBottom: 8 }}>
                                    <h3
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            marginBottom: 6,
                                        }}
                                    >
                                        {step.title}
                                    </h3>
                                    {step.description && (
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.6,
                                                maxWidth: 160,
                                                margin: '0 auto',
                                            }}
                                        >
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Connector arrow (not on last item) */}
                            {i < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: 16,
                                        color: 'rgba(110,231,250,0.3)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <ArrowRight size={18} />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

ProcessSteps.propTypes = {
    sectionLabel: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
}

export default ProcessSteps

