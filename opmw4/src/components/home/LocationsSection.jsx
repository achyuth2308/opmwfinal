import { motion } from 'framer-motion'
import { MapPin, Building2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { LOCATIONS } from '@/constants/locations'

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const LocationsSection = () => {
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
                        Operational Footprint
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
                        Five cities. One team.
                    </h2>
                    <p
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: 16,
                            lineHeight: 1.7,
                            maxWidth: 480,
                            margin: '0 auto',
                        }}
                    >
                        OPMW operates a unified delivery model across India's key IT and BPO corridors.
                    </p>
                </div>

                {/* Locations grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 16,
                    }}
                >
                    {LOCATIONS.map((loc, i) => (
                        <motion.div
                            key={loc.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-40px' }}
                            whileHover={{
                                y: -4,
                                borderColor: 'rgba(110,231,250,0.22)',
                                boxShadow: '0 12px 40px rgba(110,231,250,0.1)',
                                transition: { duration: 0.25 },
                            }}
                            style={{
                                background: loc.isHeadquarters ? 'rgba(110,231,250,0.04)' : 'var(--surface-2)',
                                border: loc.isHeadquarters
                                    ? '1px solid rgba(110,231,250,0.18)'
                                    : '1px solid var(--border)',
                                borderRadius: 12,
                                padding: 24,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* HQ badge */}
                            {loc.isHeadquarters && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: 14,
                                        right: 14,
                                        fontSize: 10,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--accent)',
                                        background: 'rgba(110,231,250,0.1)',
                                        border: '1px solid rgba(110,231,250,0.2)',
                                        borderRadius: 4,
                                        padding: '2px 8px',
                                    }}
                                >
                                    HQ
                                </span>
                            )}

                            {/* Icon */}
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    background: 'var(--accent-dim)',
                                    border: '1px solid rgba(110,231,250,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent)',
                                    flexShrink: 0,
                                }}
                            >
                                <MapPin size={16} />
                            </div>

                            {/* City & state */}
                            <div>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.01em',
                                        marginBottom: 2,
                                    }}
                                >
                                    {loc.city}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.06em',
                                    }}
                                >
                                    {loc.state}
                                </p>
                            </div>

                            {/* Address */}
                            <p
                                style={{
                                    fontSize: 13,
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                }}
                            >
                                {loc.address}
                            </p>

                            {/* Pincode */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    paddingTop: 8,
                                    borderTop: '1px solid var(--border)',
                                }}
                            >
                                <Building2 size={12} style={{ color: 'var(--text-muted)' }} />
                                <span
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    {loc.pincode}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default LocationsSection
