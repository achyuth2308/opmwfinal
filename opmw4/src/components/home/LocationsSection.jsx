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
        }, 3500)
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
                        {/* Original Stylized Silhouette */}
                        <svg viewBox="0 0 200 240" style={{ width: '90%', height: 'auto', fill: 'rgba(255,255,255,0.02)', stroke: 'rgba(110,231,250,0.15)', strokeWidth: 1 }}>
                            <path d="M100 10 L130 30 L150 60 L180 100 L170 160 L140 200 L100 230 L60 200 L30 160 L20 100 L50 60 L70 30 Z" />
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

