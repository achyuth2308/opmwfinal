import { motion } from 'framer-motion'

const CorporatePositioning = () => {
    return (
        <section
            style={{
                padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle glow */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    height: 300,
                    background: 'radial-gradient(ellipse, rgba(110,231,250,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div
                        style={{
                            height: 1,
                            background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
                            maxWidth: 240,
                            margin: '0 auto 28px',
                        }}
                    />
                    <h2
                        style={{
                            fontSize: 'clamp(22px, 3.5vw, 42px)',
                            fontWeight: 800,
                            letterSpacing: '-0.035em',
                            lineHeight: 1.15,
                            color: 'var(--text-primary)',
                            maxWidth: 760,
                            margin: '0 auto 20px',
                        }}
                    >
                        India's only platform that unifies{' '}
                        <span style={{ color: 'var(--accent)' }}>BPO execution</span>,{' '}
                        <span style={{ color: 'var(--accent)' }}>IT delivery</span>, and{' '}
                        <span style={{ color: 'var(--accent)' }}>workforce technology</span>{' '}
                        under a single brand.
                    </h2>
                    <p
                        style={{
                            fontSize: 'clamp(14px, 1.6vw, 17px)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.75,
                            maxWidth: 600,
                            margin: '0 auto',
                        }}
                    >
                        While others specialise in one vertical, OPMW operates across the full enterprise
                        operations stack — from agent floors to software products.
                    </p>
                    <div
                        style={{
                            height: 1,
                            background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
                            maxWidth: 240,
                            margin: '28px auto 0',
                        }}
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default CorporatePositioning
