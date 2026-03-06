import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import AnimatedButton from '@/components/shared/AnimatedButton'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ServiceHero = ({ label, headline, subtext, ctaLabel, ctaHref, trustItems, image }) => {
    return (
        <section
            style={{
                padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 'clamp(400px, 80vh, 700px)',
                display: 'flex',
                alignItems: 'center'
            }}
            aria-label={`${label} hero`}
        >
            {/* Gradient orbs */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '60%',
                    width: 600,
                    height: 600,
                    background:
                        'radial-gradient(circle, rgba(110,231,250,0.08) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    pointerEvents: 'none',
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    bottom: '0%',
                    left: '-5%',
                    width: 400,
                    height: 400,
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 64,
                    alignItems: 'center'
                }}>
                    {/* Content Side */}
                    <div style={{ flex: '1 1 500px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ marginBottom: 20 }}
                        >
                            <span className="pill-badge">{label}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{
                                fontSize: 'clamp(36px, 5.5vw, 72px)',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.08,
                                color: 'var(--text-primary)',
                                marginBottom: 24,
                            }}
                        >
                            {headline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.2 }}
                            style={{
                                fontSize: 'clamp(15px, 1.8vw, 17px)',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                                maxWidth: 560,
                                marginBottom: 36,
                            }}
                        >
                            {subtext}
                        </motion.p>

                        {ctaHref && ctaLabel && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {ctaHref.startsWith('#') ? (
                                    <a href={ctaHref} style={{ textDecoration: 'none' }}>
                                        <AnimatedButton variant="primary" size="lg">
                                            {ctaLabel}
                                            <ArrowRight size={16} />
                                        </AnimatedButton>
                                    </a>
                                ) : (
                                    <Link to={ctaHref} style={{ textDecoration: 'none' }}>
                                        <AnimatedButton variant="primary" size="lg">
                                            {ctaLabel}
                                            <ArrowRight size={16} />
                                        </AnimatedButton>
                                    </Link>
                                )}
                            </motion.div>
                        )}

                        {/* Trust signals */}
                        {trustItems && trustItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.45 }}
                                style={{
                                    display: 'flex',
                                    gap: 24,
                                    flexWrap: 'wrap',
                                    marginTop: 40,
                                    paddingTop: 32,
                                    borderTop: '1px solid var(--border)',
                                }}
                            >
                                {trustItems.map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            fontSize: 13,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            color: 'var(--text-secondary)',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 5,
                                                height: 5,
                                                borderRadius: '50%',
                                                background: 'var(--accent)',
                                                boxShadow: '0 0 6px rgba(110,231,250,0.6)',
                                                display: 'inline-block',
                                                flexShrink: 0,
                                            }}
                                        />
                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Image Side */}
                    {image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                flex: '1 1 420px',
                                position: 'relative',
                                borderRadius: 32,
                                overflow: 'hidden',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <img
                                    src={image}
                                    alt={label}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(9,9,11,0.4) 0%, transparent 60%)',
                                    pointerEvents: 'none'
                                }} />

                                {/* Inner corner glow */}
                                <div style={{
                                    position: 'absolute',
                                    top: -20,
                                    left: -20,
                                    width: 120,
                                    height: 120,
                                    background: 'rgba(110,231,250,0.1)',
                                    filter: 'blur(30px)',
                                    borderRadius: '50%',
                                    pointerEvents: 'none'
                                }} />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}

ServiceHero.propTypes = {
    label: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    subtext: PropTypes.string.isRequired,
    ctaLabel: PropTypes.string,
    ctaHref: PropTypes.string,
    trustItems: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
}

ServiceHero.defaultProps = {
    ctaLabel: null,
    ctaHref: null,
    trustItems: [],
    image: null,
}

export default ServiceHero
