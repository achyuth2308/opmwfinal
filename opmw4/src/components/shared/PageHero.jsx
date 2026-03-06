import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import PropTypes from 'prop-types'

/**
 * PageHero — premium shared hero for all inner pages.
 * Usage: <PageHero badge="About" title="..." subtitle="..." />
 */
const PageHero = ({ badge, title, titleAccent, subtitle, children }) => {
    const heroRef = useRef(null)

    useEffect(() => {
        if (!heroRef.current) return
        // Subtle parallax on scroll
        const onScroll = () => {
            const y = window.scrollY
            gsap.set(heroRef.current.querySelector('.page-hero__bg'), {
                y: y * 0.25,
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section
            ref={heroRef}
            style={{
                position: 'relative',
                padding: 'clamp(80px, 10vw, 130px) clamp(24px, 5vw, 80px) clamp(56px, 7vw, 88px)',
                overflow: 'hidden',
                textAlign: 'center',
            }}
        >
            {/* Parallax BG blobs */}
            <div className="page-hero__bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                {/* Top spotlight */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(800px, 100vw)',
                    height: 400,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(110,231,250,0.1) 0%, transparent 65%)',
                }} />
                {/* Indigo blob left */}
                <div className="aurora-blob" style={{
                    width: 400, height: 400,
                    top: '-10%', left: '-5%',
                    background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 65%)',
                    animation: 'aurora-2 18s ease-in-out infinite',
                }} />
                {/* Warm blob right */}
                <div className="aurora-blob" style={{
                    width: 300, height: 300,
                    bottom: '-5%', right: '-3%',
                    background: 'radial-gradient(circle, rgba(251,176,64,0.07) 0%, transparent 65%)',
                    animation: 'aurora-3 22s ease-in-out infinite',
                }} />
                {/* Grid lines */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                    maskImage: 'radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)',
                }} />
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    style={{ marginBottom: 24 }}
                >
                    <span className="pill-badge">{badge}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(40px, 6vw, 80px)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        color: 'var(--text-primary)',
                        marginBottom: 20,
                        maxWidth: 800,
                        margin: '0 auto 20px',
                    }}
                >
                    {title}
                    {titleAccent && (
                        <> <span className="text-shimmer">{titleAccent}</span></>
                    )}
                </motion.h1>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.22 }}
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: 'clamp(15px, 1.8vw, 18px)',
                            lineHeight: 1.75,
                            maxWidth: 560,
                            margin: '0 auto 32px',
                        }}
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Slot for extra content (badges, CTAs, etc.) */}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.32 }}
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

PageHero.propTypes = {
    badge: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleAccent: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
}

export default PageHero
