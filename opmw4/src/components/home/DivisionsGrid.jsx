import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, Monitor, LayoutDashboard, ArrowUpRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { DIVISIONS } from '@/constants/divisions'

const iconMap = { Headphones, Monitor, LayoutDashboard }

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const DivisionsGrid = () => {
    const ref = useRef(null)

    return (
        <SectionWrapper
            className="section-gutter"
            style={{ padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px)' }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        Our Divisions
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                        }}
                    >
                        Everything under one roof
                    </h2>
                </div>

                {/* Cards grid */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'clamp(40px, 6vw, 80px)',
                        maxWidth: 1000,
                        margin: '0 auto',
                    }}
                >
                    {DIVISIONS.map((division, i) => {
                        const Icon = division.icon || Monitor
                        const isEven = i % 2 === 0
                        return (
                            <motion.div
                                key={division.id}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-60px' }}
                                whileHover="hover"
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 32,
                                    padding: 'clamp(32px, 5vw, 48px)',
                                    display: 'flex',
                                    flexDirection: isEven ? 'row' : 'row-reverse',
                                    flexWrap: 'wrap',
                                    gap: 48,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Background Gradient Glow */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: isEven
                                            ? 'radial-gradient(circle at 100% 0%, rgba(110,231,250,0.05) 0%, transparent 50%)'
                                            : 'radial-gradient(circle at 0% 0%, rgba(110,231,250,0.05) 0%, transparent 50%)',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Content Side */}
                                <div style={{
                                    flex: '1 1 340px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 28,
                                    textAlign: 'left'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div className="icon-wrapper" style={{
                                            background: 'var(--accent-dim)',
                                            color: 'var(--accent)',
                                            width: 56,
                                            height: 56,
                                            borderRadius: 14
                                        }}>
                                            <Icon size={28} />
                                        </div>
                                        <Link
                                            to={division.href}
                                            aria-label={`Learn more about ${division.title}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 44,
                                                height: 44,
                                                borderRadius: 12,
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                                textDecoration: 'none',
                                                background: 'rgba(255,255,255,0.03)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(110,231,250,0.4)'
                                                e.currentTarget.style.color = 'var(--accent)'
                                                e.currentTarget.style.background = 'var(--accent-dim)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)'
                                                e.currentTarget.style.color = 'var(--text-secondary)'
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                            }}
                                        >
                                            <ArrowUpRight size={20} />
                                        </Link>
                                    </div>

                                    <div>
                                        <h3
                                            style={{
                                                fontSize: 'clamp(24px, 3vw, 32px)',
                                                fontWeight: 700,
                                                color: 'var(--text-primary)',
                                                marginBottom: 16,
                                                letterSpacing: '-0.03em',
                                            }}
                                        >
                                            {division.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: 'clamp(15px, 1.8vw, 17px)',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.7,
                                                maxWidth: '45ch',
                                            }}
                                        >
                                            {division.description}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                        {division.tags.map((tag) => (
                                            <span key={tag} className="tag-chip" style={{
                                                padding: '8px 16px',
                                                fontSize: 14,
                                                borderRadius: 8,
                                                background: 'rgba(255,255,255,0.05)'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div
                                    style={{
                                        flex: '1 1 360px',
                                        height: 'clamp(240px, 35vw, 340px)',
                                        borderRadius: 24,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.08)'
                                    }}
                                >
                                    <motion.div
                                        style={{ width: '100%', height: '100%', position: 'relative' }}
                                        variants={{
                                            hover: { scale: 1.08 }
                                        }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)',
                                                zIndex: 1,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                        <img
                                            src={division.image}
                                            alt={division.title}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                    </motion.div>

                                    {/* Animated decorative element */}
                                    <motion.div
                                        aria-hidden="true"
                                        style={{
                                            position: 'absolute',
                                            top: -20,
                                            left: -20,
                                            width: 150,
                                            height: 150,
                                            background: 'var(--accent)',
                                            filter: 'blur(60px)',
                                            opacity: 0,
                                            borderRadius: '50%',
                                            pointerEvents: 'none'
                                        }}
                                        variants={{
                                            hover: { opacity: 0.2, scale: 1.2 }
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default DivisionsGrid

