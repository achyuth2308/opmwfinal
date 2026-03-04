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
            whileHover="hover"
            onClick={() => onClick && onClick(project)}
            style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            variants={{
                hover: {
                    y: -5,
                    borderColor: 'rgba(110,231,250,0.3)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View project: ${project.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(project) }}
        >
            {/* Project Image Container */}
            <div style={{ position: 'relative', height: 240, width: '100%', overflow: 'hidden' }}>
                <motion.img
                    src={project.image}
                    alt={project.title}
                    variants={{
                        hover: { scale: 1.1 }
                    }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />

                {/* Visual Overlays */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.2) 50%, transparent 100%)',
                    zIndex: 1,
                }} />

                {/* Category Badge - Positioned delicately on image */}
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 2
                }}>
                    <span
                        style={{
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: colors.text,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: `1px solid rgba(255, 255, 255, 0.1)`,
                            borderRadius: 6,
                            padding: '5px 12px',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                    >
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Area - Clean and Balanced */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <h3
                        style={{
                            fontSize: 19,
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.3,
                            flex: 1,
                            margin: 0,
                            transition: 'color 0.3s ease'
                        }}
                    >
                        {project.title}
                    </h3>
                    <motion.div
                        variants={{ hover: { x: 4, y: -4, color: 'var(--accent)' } }}
                        style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>
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
        image: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func,
}

ProjectCard.defaultProps = {
    onClick: null,
}

export default ProjectCard
