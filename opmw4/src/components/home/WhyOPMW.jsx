import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WHY_OPMW } from '@/constants/whyOpmw'
import TiltCard from '@/components/shared/TiltCard'
import SectionWrapper from '@/components/shared/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const WhyOPMW = () => {
    const lineRef = useRef(null)

    useEffect(() => {
        if (!lineRef.current) return
        gsap.fromTo(lineRef.current,
            { scaleY: 0, transformOrigin: 'top' },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: lineRef.current,
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: true,
                }
            }
        )
    }, [])

    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)',
                    position: 'relative',
                }}
            >
                {/* Section spotlight */}
                <div className="section-spotlight" />

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        Why OPMW
                    </p>
                    <h2
                        style={{
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: 'var(--text-primary)',
                            marginBottom: 16,
                        }}
                    >
                        Built <span className="text-shimmer">different</span> by design
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
                        Six structural advantages that make OPMW the preferred operations partner for enterprises building at scale.
                    </p>
                </div>

                {/* Timeline layout */}
                <div style={{ position: 'relative', display: 'flex', gap: 'clamp(24px, 5vw, 64px)' }}>
                    {/* Vertical connector line */}
                    <div style={{
                        position: 'relative',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 8,
                    }}>
                        <div
                            ref={lineRef}
                            style={{
                                width: 1,
                                height: '100%',
                                background: 'linear-gradient(180deg, var(--accent) 0%, rgba(110,231,250,0.1) 100%)',
                                position: 'relative',
                            }}
                        />
                    </div>

                    {/* Items */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>
                        {WHY_OPMW.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        display: 'flex',
                                        gap: 20,
                                        alignItems: 'flex-start',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Timeline node — overlaps the line */}
                                    <div style={{
                                        position: 'absolute',
                                        left: 'calc(-40px - 0.5px)',
                                        top: 12,
                                        width: 9,
                                        height: 9,
                                        borderRadius: '50%',
                                        background: 'var(--accent)',
                                        boxShadow: '0 0 12px rgba(110,231,250,0.6)',
                                        flexShrink: 0,
                                        zIndex: 2,
                                    }} />

                                    {/* Card */}
                                    <TiltCard style={{ flex: 1 }}>
                                        <motion.div
                                            whileHover={{
                                                y: -4,
                                                boxShadow: '0 16px 56px rgba(110,231,250,0.1)',
                                                borderColor: 'rgba(110,231,250,0.2)',
                                            }}
                                            transition={{ duration: 0.25 }}
                                            style={{
                                                background: 'var(--surface-2)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 16,
                                                padding: 'clamp(20px, 3vw, 32px)',
                                                display: 'flex',
                                                gap: 20,
                                                alignItems: 'flex-start',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                height: '100%',
                                            }}
                                        >
                                            {/* Glass top-edge highlight */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: 1,
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                                            }} />

                                            {/* Number watermark */}
                                            <span aria-hidden="true" style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 16,
                                                fontSize: 56,
                                                fontWeight: 800,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                color: 'rgba(255,255,255,0.02)',
                                                lineHeight: 1,
                                                userSelect: 'none',
                                            }}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>

                                            {/* Icon */}
                                            <div style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 10,
                                                background: 'var(--accent-dim)',
                                                border: '1px solid rgba(110,231,250,0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--accent)',
                                                flexShrink: 0,
                                            }}>
                                                <Icon size={20} />
                                            </div>

                                            <div>
                                                <h3 style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    color: 'var(--text-primary)',
                                                    marginBottom: 6,
                                                    letterSpacing: '-0.01em',
                                                }}>
                                                    {item.title}
                                                </h3>
                                                <p style={{
                                                    fontSize: 14,
                                                    color: 'var(--text-secondary)',
                                                    lineHeight: 1.7,
                                                }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default WhyOPMW
