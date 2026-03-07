import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import AnimatedButton from '@/components/shared/AnimatedButton'
import TypewriterText from '@/components/shared/TypewriterText'
import { HERO_STATS } from '@/constants/stats'

const stagger = {
    container: {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.1, delayChildren: 0.15 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    },
}

const HeroSection = () => {
    const sectionRef = useRef(null)
    const videoRef = useRef(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        // Manual seamless loop: jump to start slightly before the absolute end
        // to bypass the browser's "flicker" during loop reset.
        const handleTimeUpdate = () => {
            if (video.currentTime >= video.duration - 0.1) {
                video.currentTime = 0
                video.play().catch(() => { })
            }
        }

        // Standard play logic
        const playVideo = async () => {
            try {
                await video.play()
            } catch (err) {
                // Silently handle autoplay block or user navigation
            }
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        playVideo()

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            style={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(24px, 6vw, 120px) clamp(16px, 5vw, 80px)',
                position: 'relative',
                overflow: 'hidden',
                background: '#0a0a0c', // Safety color to prevent white flicker
            }}
            aria-label="Hero section"
        >
            {/* Background Video - Manual Loop for Seamlessness */}
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                src="/hero_section_video.mp4"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 0,
                    transform: 'scale(1.08)', // Scaling to hide watermark at bottom right
                    willChange: 'transform, opacity',
                }}
            />

            {/* Subtle cyan radial spot behind content */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'clamp(400px, 60vw, 900px)',
                    height: 'clamp(300px, 40vw, 600px)',
                    background:
                        'radial-gradient(ellipse at center, rgba(110,231,250,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <motion.div
                variants={stagger.container}
                initial="hidden"
                animate="show"
                style={{
                    maxWidth: 860,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 0,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Pill badge */}
                <motion.div variants={stagger.item} style={{ marginBottom: 28 }}>
                    <span className="pill-badge">
                        One Platform
                        <span
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                display: 'inline-block',
                                boxShadow: '0 0 6px rgba(110,231,250,0.8)',
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        Multiple Solutions
                        <span
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                display: 'inline-block',
                                boxShadow: '0 0 6px rgba(110,231,250,0.8)',
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        Scalable Execution
                    </span>
                </motion.div>

                {/* H1 with Typewriter Animation and Custom Colors */}
                <motion.h1
                    variants={stagger.item}
                    style={{
                        fontSize: 'clamp(44px, 7vw, 92px)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        color: 'var(--text-primary)',
                        marginBottom: 0,
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <TypewriterText
                        text={[
                            { text: 'One ' },
                            { text: 'Place', shimmer: true }
                        ]}
                        delay={0.4}
                    />
                    <TypewriterText
                        text={[
                            { text: 'Multi ', shimmer: true },
                            { text: 'Work' }
                        ]}
                        delay={1.8}
                    />
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    variants={stagger.item}
                    style={{
                        marginTop: 24,
                        fontSize: 11,
                        fontFamily: 'JetBrains Mono, monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        background: 'linear-gradient(90deg, var(--text-muted) 0%, var(--text-secondary) 50%, var(--text-muted) 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 4s linear infinite',
                    }}
                >
                    Scalable Execution at Scale
                </motion.p>

                {/* Subtext */}
                <motion.p
                    variants={stagger.item}
                    style={{
                        marginTop: 20,
                        fontSize: 'clamp(14px, 1.5vw, 17px)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.75,
                        maxWidth: 580,
                    }}
                >
                    Integrated BPO
                    <span style={{ color: 'rgba(110,231,250,0.5)', margin: '0 10px' }}>·</span>
                    International Voice
                    <span style={{ color: 'rgba(110,231,250,0.5)', margin: '0 10px' }}>·</span>
                    Web Applications
                    <span style={{ color: 'rgba(110,231,250,0.5)', margin: '0 10px' }}>·</span>
                    Enterprise HRMS
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    variants={stagger.item}
                    style={{
                        display: 'flex',
                        gap: 12,
                        marginTop: 36,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Link to="/services/bpo" style={{ textDecoration: 'none' }}>
                        <AnimatedButton variant="primary" size="lg">
                            Explore Services
                            <ArrowRight size={16} />
                        </AnimatedButton>
                    </Link>
                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                        <AnimatedButton variant="ghost" size="lg">
                            View Projects
                            <ChevronRight size={16} />
                        </AnimatedButton>
                    </Link>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    variants={stagger.item}
                    style={{
                        marginTop: 56,
                        display: 'flex',
                        gap: 'clamp(24px, 4vw, 56px)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    {/* Horizontal rule behind stats */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'calc(100% + 48px)',
                            height: 1,
                            background:
                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                        }}
                    />

                    {HERO_STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 4,
                                paddingTop: 24,
                                position: 'relative',
                            }}
                        >
                            {/* Accent top line */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 24,
                                    height: 2,
                                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                                    borderRadius: 1,
                                }}
                            />
                            <span
                                style={{
                                    fontSize: 'clamp(22px, 3vw, 32px)',
                                    fontWeight: 800,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {stat.value}
                            </span>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={stagger.item}
                    style={{ marginTop: 48 }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div
                        style={{
                            width: 24,
                            height: 36,
                            border: '1.5px solid rgba(255,255,255,0.12)',
                            borderRadius: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: 6,
                            margin: '0 auto',
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0], opacity: [0.6, 0.2, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                width: 3,
                                height: 8,
                                borderRadius: 2,
                                background: 'rgba(255,255,255,0.3)',
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
          @keyframes textShimmer {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
      `}</style>
        </section>
    )
}

export default HeroSection
