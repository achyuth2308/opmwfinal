import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { X, Tag, CheckCircle2, FileText, Layers } from 'lucide-react'

const categoryColors = {
    BPO: { text: '#6EE7FA', bg: 'rgba(110,231,250,0.08)', border: 'rgba(110,231,250,0.2)' },
    IT: { text: '#a78bfa', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)' },
    HRMS: { text: '#FBB040', bg: 'rgba(251,176,64,0.08)', border: 'rgba(251,176,64,0.2)' },
}

const statusColors = {
    Completed: '#4ade80',
    Ongoing: '#6EE7FA',
    Active: '#6EE7FA',
    Delivered: '#a78bfa',
}

const ProjectModal = ({ project, onClose }) => {
    const handleEsc = useCallback((e) => {
        if (e.key === 'Escape') onClose()
    }, [onClose])

    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [handleEsc])

    if (!project) return null
    const colors = categoryColors[project.category] || categoryColors.BPO
    const statusColor = statusColors[project.status] || 'var(--text-muted)'

    return (
        <AnimatePresence>
            {project && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px clamp(20px, 4vw, 40px)',
                        pointerEvents: 'none',
                    }}
                >
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            pointerEvents: 'auto',
                        }}
                        aria-hidden="true"
                    />

                    {/* Modal panel */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 32, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '100%',
                            maxWidth: 680,
                            maxHeight: 'min(90vh, 800px)',
                            overflowY: 'auto',
                            background: '#0F1219',
                            border: `1px solid ${colors.border}`,
                            borderRadius: 24,
                            padding: 0,
                            boxShadow: `0 0 100px ${colors.bg}, 0 40px 120px rgba(0,0,0,0.7)`,
                            pointerEvents: 'auto',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                zIndex: 10,
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '50%',
                                width: 36,
                                height: 36,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                transition: 'all 200ms ease',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                                e.currentTarget.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            <X size={18} />
                        </button>

                        {/* Project Image */}
                        {project.image && (
                            <div style={{
                                width: '100%',
                                margin: 0,
                                height: 'clamp(240px, 35vh, 320px)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, #0F1219 0%, transparent 80%)'
                                }} />
                            </div>
                        )}

                        {/* Content Area */}
                        <div style={{ padding: 'clamp(28px, 5vw, 56px)', paddingTop: project.image ? 8 : 'clamp(28px, 5vw, 56px)' }}>
                            {/* Header badges row */}
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                                {/* Category badge */}
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
                                        padding: '4px 12px',
                                        display: 'inline-block',
                                        fontWeight: 600
                                    }}
                                >
                                    {project.category}
                                </span>

                                {/* Status badge */}
                                <span
                                    style={{
                                        fontSize: 10,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        letterSpacing: '0.14em',
                                        textTransform: 'uppercase',
                                        color: statusColor,
                                        background: `${statusColor}14`,
                                        border: `1px solid ${statusColor}40`,
                                        borderRadius: 4,
                                        padding: '4px 12px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        fontWeight: 600
                                    }}
                                >
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
                                    {project.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h2
                                style={{
                                    fontSize: 'clamp(24px, 3.5vw, 36px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    color: 'white',
                                    marginBottom: 24,
                                    lineHeight: 1.15,
                                }}
                            >
                                {project.title}
                            </h2>

                            {/* Divider */}
                            <div style={{ height: 1, background: 'linear-gradient(90deg, var(--border), transparent)', marginBottom: 32 }} />

                            {/* Rest of details... */}

                            {/* Summary */}
                            {project.summary && (
                                <div style={{ marginBottom: 22 }}>
                                    <p
                                        style={{
                                            fontSize: 11,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: 'var(--text-muted)',
                                            marginBottom: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        <FileText size={11} />
                                        Project Summary
                                    </p>
                                    <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                        {project.summary}
                                    </p>
                                </div>
                            )}

                            {/* Scope */}
                            {project.scope && (
                                <div style={{ marginBottom: 22 }}>
                                    <p
                                        style={{
                                            fontSize: 11,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color: 'var(--text-muted)',
                                            marginBottom: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        <Layers size={11} />
                                        Scope of Work
                                    </p>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                        {project.scope}
                                    </p>
                                </div>
                            )}

                            {/* Outcome */}
                            <div style={{ marginBottom: 22 }}>
                                <p
                                    style={{
                                        fontSize: 11,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-muted)',
                                        marginBottom: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}
                                >
                                    <CheckCircle2 size={11} />
                                    Outcome
                                </p>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                                    <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {project.outcome}
                                    </p>
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div>
                                <p
                                    style={{
                                        fontSize: 11,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-muted)',
                                        marginBottom: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}
                                >
                                    <Tag size={11} />
                                    Technology Stack
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                padding: '5px 12px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 6,
                                                fontSize: 12,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            <Tag size={10} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

ProjectModal.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        summary: PropTypes.string,
        scope: PropTypes.string,
        tech: PropTypes.arrayOf(PropTypes.string).isRequired,
        outcome: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        image: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
}

ProjectModal.defaultProps = {
    project: null,
}

export default ProjectModal
