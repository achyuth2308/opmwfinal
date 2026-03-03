import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { MapPin, Phone, Building2 } from 'lucide-react'

const BranchCard = ({ location }) => {
    return (
        <motion.div
            whileHover={{
                y: -3,
                borderColor: 'rgba(110,231,250,0.2)',
                boxShadow: '0 12px 40px rgba(110,231,250,0.1)',
                transition: { duration: 0.25 },
            }}
            style={{
                background: location.isHeadquarters ? 'rgba(110,231,250,0.04)' : 'var(--surface-2)',
                border: location.isHeadquarters
                    ? '1px solid rgba(110,231,250,0.18)'
                    : '1px solid var(--border)',
                borderRadius: 12,
                padding: 'clamp(20px, 2.5vw, 28px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* HQ Badge */}
            {location.isHeadquarters && (
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
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(110,231,250,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                }}
            >
                <MapPin size={18} />
            </div>

            {/* City + state */}
            <div>
                <h3
                    style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: 2,
                        letterSpacing: '-0.01em',
                    }}
                >
                    {location.city}
                </h3>
                <p
                    style={{
                        fontSize: 12,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                    }}
                >
                    {location.state}
                </p>
            </div>

            {/* Address */}
            <p
                style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                }}
            >
                <Building2 size={13} style={{ flexShrink: 0, color: 'var(--text-muted)', marginTop: 2 }} />
                {location.address}, {location.pincode}
            </p>

            {/* Phone */}
            <a
                href={`tel:${location.phone.replace(/\s/g, '')}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
                <Phone size={13} />
                {location.phone}
            </a>
        </motion.div>
    )
}

BranchCard.propTypes = {
    location: PropTypes.shape({
        id: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        pincode: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        isHeadquarters: PropTypes.bool.isRequired,
    }).isRequired,
}

export default BranchCard
