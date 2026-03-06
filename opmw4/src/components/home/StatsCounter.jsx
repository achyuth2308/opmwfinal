import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import useScrollReveal from '@/hooks/useScrollReveal'
import useCounterAnimation from '@/hooks/useCounterAnimation'
import { STATS } from '@/constants/stats'

const StatItem = ({ stat, isActive }) => {
    const count = useCounterAnimation(stat.value, 2000, isActive)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'clamp(28px, 3vw, 40px) clamp(20px, 2vw, 32px)',
                position: 'relative',
            }}
        >
            {/* Top accent bar */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    borderRadius: 1,
                }}
            />

            {/* Number */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <span
                    style={{
                        fontSize: 'clamp(36px, 5vw, 64px)',
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                    }}
                >
                    {isActive ? count : 0}
                </span>
                {stat.suffix && (
                    <span
                        style={{
                            fontSize: 'clamp(24px, 3vw, 40px)',
                            fontWeight: 800,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--accent)',
                            lineHeight: 1,
                            marginTop: 2,
                        }}
                    >
                        {stat.suffix}
                    </span>
                )}
            </div>

            {/* Label */}
            <p
                style={{
                    marginTop: 10,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                }}
            >
                {stat.label}
            </p>

            {/* Description */}
            <p
                style={{
                    marginTop: 6,
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    maxWidth: 140,
                }}
            >
                {stat.description}
            </p>
        </div>
    )
}

const StatsCounter = () => {
    const ref = useRef(null)
    const isVisible = useScrollReveal(ref, { threshold: 0.2 })

    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
                }}
            >
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        By The Numbers
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
                        Operational scale
                    </h2>
                </div>

                {/* Stats container */}
                <div
                    ref={ref}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        overflow: 'hidden',
                    }}
                >
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.id}
                            style={{
                                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                                borderBottom: '1px solid transparent',
                            }}
                        >
                            <StatItem stat={stat} isActive={isVisible} />
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}

export default StatsCounter

