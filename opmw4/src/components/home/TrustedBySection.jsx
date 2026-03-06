import { motion } from 'framer-motion'

const LOGOS = [
    { name: 'BPO Partner', abbr: 'BPO' },
    { name: 'Tech Alliance', abbr: 'TA' },
    { name: 'HRMS Suite', abbr: 'HR' },
    { name: 'Cloud Ops', abbr: 'CO' },
    { name: 'Voice Pro', abbr: 'VP' },
    { name: 'Enterprise+', abbr: 'EP' },
    { name: 'ScaleWorks', abbr: 'SW' },
    { name: 'NetForce', abbr: 'NF' },
]

/**
 * TrustedBySection — Infinite CSS marquee of partner logos.
 */
const TrustedBySection = () => {
    return (
        <section
            style={{
                padding: 'clamp(40px, 5vw, 72px) 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Fade edges */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, var(--base) 0%, transparent 12%, transparent 88%, var(--base) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
            }} />

            {/* Label */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    textAlign: 'center',
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 32,
                }}
            >
                Trusted technology & delivery ecosystem
            </motion.p>

            {/* Marquee */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
                <div className="marquee-track">
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '10px 40px',
                                margin: '0 6px',
                                background: 'var(--surface-2)',
                                border: '1px solid var(--border)',
                                borderRadius: 10,
                                flexShrink: 0,
                                transition: 'border-color 0.3s ease',
                            }}
                        >
                            {/* Logo placeholder — a styled monogram */}
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 7,
                                background: 'var(--accent-dim)',
                                border: '1px solid rgba(110,231,250,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                fontWeight: 600,
                                color: 'var(--accent)',
                                letterSpacing: '0.05em',
                                flexShrink: 0,
                            }}>
                                {logo.abbr}
                            </div>
                            <span style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: 'var(--text-secondary)',
                                whiteSpace: 'nowrap',
                                letterSpacing: '-0.01em',
                            }}>
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustedBySection
