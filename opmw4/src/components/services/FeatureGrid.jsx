import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import SectionWrapper from '@/components/shared/SectionWrapper'

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const FeatureGrid = ({ sectionLabel, headline, subtext, features }) => {
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
                <div style={{ maxWidth: 600, marginBottom: 56 }}>
                    <div className="section-divider" />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12, marginTop: 16 }}>
                        {sectionLabel}
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(28px, 3.5vw, 44px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                            marginBottom: 16,
                        }}
                    >
                        {headline}
                    </h2>
                    {subtext && (
                        <p
                            style={{
                                fontSize: 15,
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                            }}
                        >
                            {subtext}
                        </p>
                    )}
                </div>

                {/* Feature cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 16,
                    }}
                >
                    {features.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.id || i}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-40px' }}
                                whileHover={{
                                    y: -3,
                                    borderColor: 'rgba(110,231,250,0.2)',
                                    boxShadow: '0 12px 40px rgba(110,231,250,0.1)',
                                    transition: { duration: 0.25 },
                                }}
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: 'clamp(20px, 2.5vw, 28px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 14,
                                }}
                            >
                                {Icon && (
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 9,
                                            background: 'var(--accent-dim)',
                                            border: '1px solid rgba(110,231,250,0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        <Icon size={18} />
                                    </div>
                                )}
                                <div>
                                    <h3
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            marginBottom: 8,
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {feature.title}
                                    </h3>
                                    {feature.description && (
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {feature.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}

FeatureGrid.propTypes = {
    sectionLabel: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    subtext: PropTypes.string,
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            icon: PropTypes.elementType,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
}

FeatureGrid.defaultProps = {
    subtext: '',
}

export default FeatureGrid
