import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedButton from '@/components/shared/AnimatedButton'

const CTASection = () => {
    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
                }}
            >
                {/* Animated border container */}
                <div style={{ position: 'relative', borderRadius: 20, padding: 1 }}>
                    {/* Rotating gradient border */}
                    <motion.div
                        animate={{ '--border-angle': ['0deg', '360deg'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 20,
                            background:
                                'conic-gradient(from var(--border-angle, 0deg) at 50% 50%, rgba(110,231,250,0) 0%, rgba(110,231,250,0.5) 25%, rgba(251,176,64,0.3) 50%, rgba(110,231,250,0) 75%)',
                            zIndex: 0,
                        }}
                    />
                    <div
                        className="animated-border"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 20,
                            zIndex: 0,
                        }}
                    />

                    {/* Inner content panel */}
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            background: '#0F1219',
                            borderRadius: 19,
                            padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 80px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Glow spot */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: '-20%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 600,
                                height: 300,
                                background:
                                    'radial-gradient(ellipse at center, rgba(110,231,250,0.07) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }}
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-label"
                            style={{ color: 'var(--accent)', marginBottom: 16 }}
                        >
                            Ready to Scale
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            style={{
                                fontSize: 'clamp(32px, 4vw, 56px)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                                lineHeight: 1.1,
                                marginBottom: 16,
                                maxWidth: 640,
                            }}
                        >
                            Ready to Scale Your Operations
                            <span style={{ color: 'var(--accent)' }}>?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.16 }}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: 16,
                                lineHeight: 1.75,
                                maxWidth: 480,
                                marginBottom: 40,
                            }}
                        >
                            Join enterprises across 5 cities powered by OPMW's integrated platform
                            BPO, IT, and HRMS in one execution engine.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.24 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
                        >
                            <Link to="/contact#contact-form" style={{ textDecoration: 'none' }}>
                                <AnimatedButton variant="primary" size="lg" animatedBorder>
                                    Contact Us
                                </AnimatedButton>
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.36 }}
                            style={{
                                marginTop: 40,
                                display: 'flex',
                                gap: 24,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                        >
                            {[
                                '300+ Workforce',
                                '5 Operational Cities',
                                'GST & MSME Registered',
                                '100% Uptime SLA',
                            ].map((badge) => (
                                <span
                                    key={badge}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        fontSize: 12,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.06em',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: '50%',
                                            background: 'var(--accent)',
                                            opacity: 0.6,
                                            display: 'inline-block',
                                            flexShrink: 0,
                                        }}
                                    />
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default CTASection

