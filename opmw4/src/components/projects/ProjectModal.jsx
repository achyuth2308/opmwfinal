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
                            padding: 'clamp(28px, 5vw, 56px)',
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
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid var(--border)',
                                borderRadius: 8,
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                transition: 'all 200ms ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = 'var(--text-primary)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                e.currentTarget.style.color = 'var(--text-secondary)'
                            }}
                        >
                            <X size={15} />
                        </button>

                        {/* Header badges row */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
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
                                    padding: '3px 10px',
                                    display: 'inline-block',
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
                                    padding: '3px 10px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5,
                                }}
                            >
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
                                {project.status}
                            </span>
                        </div>

                        {/* Title */}
                        <h2
                            style={{
                                fontSize: 'clamp(20px, 2.8vw, 28px)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                                marginBottom: 20,
                                paddingRight: 40,
                                lineHeight: 1.25,
                            }}
                        >
                            {project.title}
                        </h2>

                        {/* Divider */}
                        <div style={{ height: 1, background: 'linear-gradient(90deg, var(--border), transparent)', marginBottom: 24 }} />

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
    }),
    onClose: PropTypes.func.isRequired,
}

ProjectModal.defaultProps = {
    project: null,
}

export default ProjectModal
