import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedButton from '@/components/shared/AnimatedButton'
import TiltCard from '@/components/shared/TiltCard'
const BADGES = [
    '300+ Workforce',
    '5 Operational Cities',
    'GST & MSME Registered',
    '100% Uptime SLA',
]

const CTASection = () => {
    return (
        <SectionWrapper className="section-gutter">
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)' }}>
                {/* Outer animated-border wrapper */}
                <div style={{ position: 'relative', borderRadius: 24, padding: 1 }}>
                    {/* Rotating gradient border */}
                    <div className="animated-border" style={{ position: 'absolute', inset: 0, borderRadius: 24, zIndex: 0 }} />

                    <TiltCard>
                        {/* Inner content panel */}
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                background: '#0C1018',
                                borderRadius: 23,
                                padding: 'clamp(56px, 7vw, 96px) clamp(32px, 5vw, 80px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            {/* ── Aurora blobs ────────────────────── */}
                            <div className="aurora-blob" style={{
                                width: 500, height: 400,
                                top: '-20%', left: '-10%',
                                background: 'radial-gradient(circle, rgba(110,231,250,0.12) 0%, transparent 65%)',
                                animation: 'aurora-1 12s ease-in-out infinite',
                            }} />
                            <div className="aurora-blob" style={{
                                width: 420, height: 360,
                                top: '-15%', right: '-5%',
                                background: 'radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 65%)',
                                animation: 'aurora-2 15s ease-in-out infinite',
                            }} />
                            <div className="aurora-blob" style={{
                                width: 320, height: 300,
                                bottom: '-10%', left: '30%',
                                background: 'radial-gradient(circle, rgba(251,176,64,0.1) 0%, transparent 65%)',
                                animation: 'aurora-3 18s ease-in-out infinite',
                            }} />

                            {/* Top-edge glass streak */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(110,231,250,0.25), transparent)',
                            }} />

                            {/* Label */}
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-label"
                                style={{ color: 'var(--accent)', marginBottom: 20 }}
                            >
                                Ready to Scale
                            </motion.p>

                            {/* Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.08 }}
                                style={{
                                    fontSize: 'clamp(36px, 5vw, 64px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.05,
                                    color: 'var(--text-primary)',
                                    marginBottom: 20,
                                    maxWidth: 680,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                Ready to Scale Your{' '}
                                <span className="text-shimmer">Operations</span>?
                            </motion.h2>

                            {/* Sub */}
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.16 }}
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: 17,
                                    lineHeight: 1.75,
                                    maxWidth: 520,
                                    marginBottom: 44,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                Join enterprises across 5 cities powered by OPMW's integrated platform
                                — BPO, IT, and HRMS in one execution engine.
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.24 }}
                                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}
                            >
                                <Link to="/services/bpo" style={{ textDecoration: 'none' }}>
                                    <AnimatedButton variant="primary" size="lg" animatedBorder className="cta-pulse-btn">
                                        Explore Services
                                        <ArrowRight size={16} />
                                    </AnimatedButton>
                                </Link>
                                <Link to="/contact" style={{ textDecoration: 'none' }}>
                                    <AnimatedButton variant="ghost" size="lg">
                                        Contact Us
                                    </AnimatedButton>
                                </Link>
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.36 }}
                                style={{
                                    marginTop: 48,
                                    display: 'flex',
                                    gap: '12px 28px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                {BADGES.map(badge => (
                                    <span
                                        key={badge}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 7,
                                            fontSize: 12,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            color: 'var(--text-muted)',
                                            letterSpacing: '0.06em',
                                        }}
                                    >
                                        <CheckCircle2 size={13} color="var(--accent)" style={{ flexShrink: 0, opacity: 0.7 }} />
                                        {badge}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default CTASection
