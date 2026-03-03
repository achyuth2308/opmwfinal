import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import PropTypes from 'prop-types'
import EdisonBulb from './EdisonBulb'
import LightBloom from './LightBloom'
import MonitorReveal from './MonitorReveal'

const INTRO_SEEN_KEY = 'opmw_intro_seen'

const FLICKER_KEYFRAMES = [
    { time: 0, intensity: 0, filament: 0 },
    { time: 80, intensity: 1.0, filament: 1.0 },
    { time: 140, intensity: 0.6, filament: 0.6 },
    { time: 200, intensity: 1.0, filament: 1.0 },
    { time: 280, intensity: 0.8, filament: 0.8 },
    { time: 350, intensity: 1.0, filament: 1.0 },
]

const IntroSequence = ({ onComplete }) => {
    const shouldReduceMotion = useReducedMotion()

    const [phase, setPhase] = useState('idle')
    const [pullRingOffset, setPullRingOffset] = useState(0)
    const [threadStretch, setThreadStretch] = useState(1)
    const [isLit, setIsLit] = useState(false)
    const [flickerIntensity, setFlickerIntensity] = useState(0)
    const [filamentBrightness, setFilamentBrightness] = useState(0)
    const [showBloom, setShowBloom] = useState(false)
    const [bloomIntensity, setBloomIntensity] = useState(0)
    const [showMonitor, setShowMonitor] = useState(false)
    const [overlayOpacity, setOverlayOpacity] = useState(1)
    const [overlayColor, setOverlayColor] = useState('#000000')
    const [isMobile, setIsMobile] = useState(false)
    const [bulbVisible, setBulbVisible] = useState(false)
    const [pullTextVisible, setPullTextVisible] = useState(false)
    const [pendulumActive, setPendulumActive] = useState(false)

    const autoTriggerRef = useRef(null)
    const hasTriggeredRef = useRef(false)
    const flickerRafRef = useRef(null)

    const alreadySeen = sessionStorage.getItem(INTRO_SEEN_KEY) === 'true'

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    const completeIntro = useCallback(() => {
        sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
        if (onComplete) onComplete()
    }, [onComplete])

    const runFlicker = useCallback(() => {
        let frameIndex = 0

        const runNextFrame = () => {
            if (frameIndex >= FLICKER_KEYFRAMES.length - 1) {
                setIsLit(true)
                setFlickerIntensity(1)
                setFilamentBrightness(1)

                setTimeout(() => {
                    setShowBloom(true)
                    let bloomStep = 0
                    const bloomInterval = setInterval(() => {
                        bloomStep += 0.1
                        setBloomIntensity(Math.min(bloomStep, 1))
                        if (bloomStep >= 1) clearInterval(bloomInterval)
                    }, 40)
                }, 100)

                setTimeout(() => {
                    setShowMonitor(true)
                }, 50 + 700)

                setTimeout(() => {
                    setOverlayColor('rgba(9,9,11,0)')
                    let transStep = 0
                    const transInterval = setInterval(() => {
                        transStep += 0.05
                        setOverlayOpacity(Math.max(1 - transStep, 0))
                        if (transStep >= 1) {
                            clearInterval(transInterval)
                            completeIntro()
                        }
                    }, 30)
                }, 50 + 1400)

                return
            }

            const current = FLICKER_KEYFRAMES[frameIndex]
            const next = FLICKER_KEYFRAMES[frameIndex + 1]
            const delay = next.time - current.time

            setIsLit(current.intensity > 0.5)
            setFlickerIntensity(current.intensity)
            setFilamentBrightness(current.filament)

            frameIndex++
            flickerRafRef.current = setTimeout(runNextFrame, delay)
        }

        runNextFrame()
    }, [completeIntro])

    const triggerPull = useCallback(() => {
        if (hasTriggeredRef.current) return
        hasTriggeredRef.current = true

        if (autoTriggerRef.current) clearTimeout(autoTriggerRef.current)

        setPhase('pulling')

        let pullStep = 0
        const pullInterval = setInterval(() => {
            pullStep += 2
            setPullRingOffset(Math.min(pullStep, 20))
            if (pullStep <= 8) setThreadStretch(1 + (pullStep / 8) * 0.04)
            else setThreadStretch(1.04 - ((pullStep - 8) / 12) * 0.04)
            if (pullStep >= 20) clearInterval(pullInterval)
        }, 15)

        setTimeout(() => {
            setPhase('flickering')
            runFlicker()
        }, 300)
    }, [runFlicker])

    useEffect(() => {
        if (alreadySeen || shouldReduceMotion) {
            completeIntro()
            return
        }

        const t1 = setTimeout(() => {
            setBulbVisible(true)
            setPendulumActive(true)
        }, 400)

        const t2 = setTimeout(() => {
            if (!isMobile) {
                setPullTextVisible(true)
            }
        }, 800)

        const autoDelay = isMobile ? 1500 : 3000
        autoTriggerRef.current = setTimeout(() => {
            triggerPull()
        }, 800 + autoDelay)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            if (autoTriggerRef.current) clearTimeout(autoTriggerRef.current)
            if (flickerRafRef.current) clearTimeout(flickerRafRef.current)
        }
    }, [alreadySeen, shouldReduceMotion, isMobile, triggerPull, completeIntro])

    if (alreadySeen || shouldReduceMotion) return null

    return (
        <AnimatePresence>
            <motion.div
                className="intro-overlay"
                style={{
                    background: overlayColor === '#000000' ? '#000000' : '#000000',
                    opacity: overlayOpacity,
                    pointerEvents: phase === 'done' ? 'none' : 'auto',
                }}
                onClick={triggerPull}
                role="button"
                aria-label="Click to illuminate"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerPull() }}
            >
                {/* Thread */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: bulbVisible ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: 1,
                        height: 'clamp(140px, 22vh, 220px)',
                        background: 'rgba(180,140,80,0.3)',
                        transformOrigin: 'top center',
                        transform: `translateX(-50%) scaleY(${threadStretch})`,
                        transition: 'transform 100ms ease',
                    }}
                />

                {/* Pull ring offset element */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: `calc(clamp(140px, 22vh, 220px) + ${pullRingOffset}px)`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'top 150ms cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                >
                    {/* Bulb */}
                    <AnimatePresence>
                        {bulbVisible && (
                            <motion.div
                                initial={{ y: -60, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    rotate: pendulumActive && phase === 'idle'
                                        ? [0, -3, 3, -1, 0]
                                        : phase === 'pulling'
                                            ? [0, -8, 6, -3, 0]
                                            : 0,
                                }}
                                transition={
                                    phase === 'pulling'
                                        ? { duration: 0.3, ease: 'easeOut', rotate: { type: 'keyframes', times: [0, 0.25, 0.6, 0.85, 1] } }
                                        : pendulumActive && phase === 'idle'
                                            ? {
                                                y: { duration: 0.4, ease: 'easeOut' },
                                                opacity: { duration: 0.4 },
                                                rotate: { duration: 3, times: [0, 0.33, 0.66, 0.9, 1], ease: 'easeInOut' },
                                            }
                                            : { duration: 0.4, ease: 'easeOut' }
                                }
                                style={{
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                }}
                            >
                                <EdisonBulb
                                    isLit={isLit}
                                    flickerIntensity={flickerIntensity}
                                    filamentBrightness={filamentBrightness}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Pull to illuminate text */}
                <AnimatePresence>
                    {pullTextVisible && phase === 'idle' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: 'absolute',
                                top: `calc(clamp(140px, 22vh, 220px) + 140px)`,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                            }}
                        >
                            Pull to illuminate
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Light bloom */}
                <LightBloom isVisible={showBloom} intensity={bloomIntensity} />

                {/* Monitor reveal */}
                <MonitorReveal isVisible={showMonitor} />
            </motion.div>
        </AnimatePresence>
    )
}

IntroSequence.propTypes = {
    onComplete: PropTypes.func,
}

IntroSequence.defaultProps = {
    onComplete: () => { },
}

export default IntroSequence
