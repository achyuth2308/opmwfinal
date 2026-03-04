import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'

const deptColors = {
    BPO: { bg: 'rgba(110,231,250,0.07)', border: 'rgba(110,231,250,0.18)', text: '#6EE7FA' },
    IT: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)', text: '#a78bfa' },
    HR: { bg: 'rgba(251,176,64,0.07)', border: 'rgba(251,176,64,0.18)', text: '#FBB040' },
    Operations: { bg: 'rgba(74,222,128,0.07)', border: 'rgba(74,222,128,0.18)', text: '#4ade80' },
}

const RoleCard = ({ role, onApply }) => {
    const colors = deptColors[role.department] || deptColors.BPO

    const citiesLabel = role.citiesLabel || (Array.isArray(role.cities) ? role.cities.join(', ') : 'Various Cities')

    return (
        <motion.div
            whileHover={{
                y: -3,
                borderColor: colors.border,
                boxShadow: `0 12px 40px ${colors.bg.replace('0.07', '0.14')}`,
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
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                    style={{
                        fontSize: 10,
                        fontFamily: 'JetBrains Mono, monospace',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: colors.text,
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 4,
                        padding: '2px 8px',
                    }}
                >
                    {role.department}
                </span>
                <span
                    style={{
                        fontSize: 11,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                    }}
                >
                    {role.type}
                </span>
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                }}
            >
                {role.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {role.description}
            </p>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 12,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                    }}
                >
                    <MapPin size={11} />
                    {citiesLabel}
                </span>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 12,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                    }}
                >
                    <Briefcase size={11} />
                    {role.experience}
                </span>
            </div>

            {/* Apply button */}
            <button
                onClick={() => onApply && onApply(role)}
                style={{
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    width: '100%',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                }}
            >
                Apply Now
                <ArrowRight size={14} />
            </button>
        </motion.div>
    )
}

RoleCard.propTypes = {
    role: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        cities: PropTypes.arrayOf(PropTypes.string).isRequired,
        citiesLabel: PropTypes.string,
        experience: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onApply: PropTypes.func,
}

RoleCard.defaultProps = {
    onApply: null,
}

export default RoleCard
