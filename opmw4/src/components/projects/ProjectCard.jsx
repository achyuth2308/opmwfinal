import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { ArrowUpRight, Tag } from 'lucide-react'

const categoryColors = {
    BPO: { bg: 'rgba(110,231,250,0.08)', border: 'rgba(110,231,250,0.2)', text: '#6EE7FA' },
    IT: { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)', text: '#a78bfa' },
    HRMS: { bg: 'rgba(251,176,64,0.08)', border: 'rgba(251,176,64,0.2)', text: '#FBB040' },
}

const ProjectCard = ({ project, onClick }) => {
    const colors = categoryColors[project.category] || categoryColors.BPO

    return (
        <motion.div
            whileHover={{
                y: -4,
                borderColor: colors.border,
                boxShadow: `0 16px 56px ${colors.bg.replace('0.08', '0.18')}`,
                transition: { duration: 0.28 },
            }}
            onClick={() => onClick && onClick(project)}
            style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 'clamp(22px, 2.5vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                boxSizing: 'border-box',
            }}
            role="button"
            tabIndex={0}
            aria-label={`View project: ${project.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(project) }}
        >
            {/* Corner glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle at top right, ${colors.bg} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Header row — category badge + arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        padding: '3px 10px',
                    }}
                >
                    {project.category}
                </span>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 11,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                    }}
                >
                    <span>{project.year}</span>
                    <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
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
                {project.title}
            </h3>

            {/* Outcome */}
            <p
                style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    flex: 1,
                }}
            >
                {project.outcome}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                {project.tech.map((t) => (
                    <span key={t} className="tag-chip">
                        {t}
                    </span>
                ))}
            </div>

            {/* Status */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border)',
                }}
            >
                <span
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: project.status === 'Active' ? '#4ade80' : 'var(--text-muted)',
                        boxShadow: project.status === 'Active' ? '0 0 6px rgba(74,222,128,0.6)' : 'none',
                        display: 'inline-block',
                        flexShrink: 0,
                    }}
                />
                <span
                    style={{
                        fontSize: 11,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                    }}
                >
                    {project.status}
                </span>
            </div>
        </motion.div>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tech: PropTypes.arrayOf(PropTypes.string).isRequired,
        outcome: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
}

ProjectCard.defaultProps = {
    onClick: null,
}

export default ProjectCard
