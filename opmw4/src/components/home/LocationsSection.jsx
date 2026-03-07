import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Globe } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { LOCATIONS } from '@/constants/locations'

const LocationsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeLoc = LOCATIONS[activeIndex]

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % LOCATIONS.length)
        }, 2000)
        return () => clearInterval(timer)
    }, [])

    return (
        <SectionWrapper className="section-gutter">
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(48px, 8vw, 100px) 0',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                    <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                        Operational Footprint
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
                        Five cities. One team.
                    </h2>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: 64,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Left Side: India Silhouette Map */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '1/1.2',
                            maxWidth: 500,
                            margin: '0 auto',
                            background: 'radial-gradient(circle at 50% 50%, rgba(110,231,250,0.03) 0%, transparent 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Highly Accurate India Silhouette */}
                        <svg viewBox="0 0 200 240" style={{ width: '100%', height: 'auto', fill: 'rgba(110,231,250,0.02)', stroke: 'rgba(110,231,250,0.3)', strokeWidth: 1.2 }}>
                            <path d="M100.5,10.2 C98.5,11.2 96.2,14.5 95.2,16.5 C92.5,21.5 88.5,22.5 84.5,22.5 C80.5,22.5 75.5,25.5 72.5,28.5 C68.5,32.5 64.5,38.5 60.5,41.5 C56.5,44.5 50.5,46.5 46.5,50.5 C42.5,54.5 38.5,60.5 35.5,65.5 C32.5,70.5 28.5,75.5 25.5,82.5 C22.5,89.5 18.5,100.5 16.5,108.5 C14.5,116.5 12.5,124.5 14.5,132.5 C16.5,140.5 20.5,145.5 24.5,150.5 C28.5,155.5 32.5,160.5 38.5,165.5 C44.5,170.5 50.5,172.5 56.5,175.5 C62.5,178.5 68.5,182.5 74.5,188.5 C80.5,194.5 86.5,202.5 90.5,210.5 C94.5,218.5 98.5,228.5 100.5,235.5 C102.5,228.5 106.5,218.5 110.5,210.5 C114.5,202.5 120.5,194.5 126.5,188.5 C132.5,182.5 138.5,178.5 144.5,175.5 C150.5,172.5 156.5,170.5 162.5,165.5 C168.5,160.5 172.5,155.5 176.5,150.5 C180.5,145.5 184.5,140.5 186.5,132.5 C188.5,124.5 186.5,116.5 184.5,108.5 C182.5,100.5 178.5,89.5 175.5,82.5 C172.5,75.5 168.5,70.5 165.5,65.5 C162.5,60.5 158.5,54.5 154.5,50.5 C150.5,46.5 144.5,44.5 140.5,41.5 C136.5,38.5 132.5,32.5 128.5,28.5 C125.5,25.5 120.5,22.5 116.5,22.5 C112.5,22.5 108.5,21.5 105.8,16.5 C104.8,14.5 102.5,11.2 100.5,10.2 Z M150,115 L165,115 L175,125 L180,140 L170,150 L155,145 L150,135 Z" />
                        </svg>

                        {/* Location Dots */}
                        {LOCATIONS.map((loc, i) => (
                            <motion.div
                                key={loc.id}
                                onClick={() => setActiveIndex(i)}
                                whileHover={{ scale: 1.2 }}
                                style={{
                                    position: 'absolute',
                                    left: `${loc.coords.x}%`,
                                    top: `${loc.coords.y}%`,
                                    cursor: 'pointer',
                                    zIndex: 2,
                                }}
                            >
                                <div style={{ position: 'relative' }}>
                                    <div
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            background: activeIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                                            border: activeIndex === i ? '4px solid rgba(110,231,250,0.2)' : 'none',
                                            boxShadow: activeIndex === i ? '0 0 15px var(--accent)' : 'none',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    />
                                    {/* City name label on map */}
                                    <span
                                        style={{
                                            position: 'absolute',
                                            left: 16,
                                            top: -4,
                                            whiteSpace: 'nowrap',
                                            fontSize: 12,
                                            fontWeight: activeIndex === i ? 700 : 400,
                                            color: activeIndex === i ? 'var(--text-primary)' : 'var(--text-muted)',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            opacity: activeIndex === i ? 1 : 0.6
                                        }}
                                    >
                                        {loc.city}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side: Details Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLoc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 32,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                }}
                            >
                                {/* Image container */}
                                <div style={{ width: '100%', height: 340, position: 'relative' }}>
                                    <img
                                        src={activeLoc.image}
                                        alt={activeLoc.city}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-2) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

                                    {/* Business District Badge */}
                                    <div style={{ position: 'absolute', top: 24, right: 24 }}>
                                        <span className="pill-badge" style={{
                                            background: 'rgba(0,0,0,0.5)',
                                            backdropFilter: 'blur(8px)',
                                            borderColor: 'rgba(255,255,255,0.1)',
                                            padding: '6px 16px',
                                            fontSize: 11
                                        }}>
                                            {activeLoc.label}
                                        </span>
                                    </div>

                                    {/* City Content overlay - Layout fixed to prevent overlap */}
                                    <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {/* Status Badge integrated here */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                                                LIVE HUB
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', margin: 0 }}>
                                            {activeLoc.city}
                                        </h3>
                                        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace' }}>
                                            {activeLoc.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom description section */}
                                <div style={{ padding: '0 32px 32px' }}>
                                    <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '42ch' }}>
                                        {activeLoc.description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Dots */}
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                            {LOCATIONS.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    style={{
                                        width: activeIndex === i ? 24 : 8,
                                        height: 8,
                                        borderRadius: 4,
                                        background: activeIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Quick Selection Buttons */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {LOCATIONS.map((loc, i) => (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveIndex(i)}
                                    style={{
                                        padding: '8px 24px',
                                        borderRadius: 99,
                                        border: '1px solid',
                                        borderColor: activeIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                                        background: activeIndex === i ? 'rgba(110,231,250,0.08)' : 'transparent',
                                        color: activeIndex === i ? 'var(--accent)' : 'var(--text-muted)',
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {loc.city}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper >
    )
}

export default LocationsSection

