import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const IntroSequence = ({ onComplete }) => {
    const [videoError, setVideoError] = useState(false)
    const videoRef = useRef(null)

    // Ensure video plays or fails gracefully
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.error("Video play failed:", err)
                // If autoplay fails, we might show a play button or just skip
                // For a preloader, skipping to content is usually better than a broken screen
                setVideoError(true)
            })
        }
    }, [])

    const handleEnded = () => {
        if (onComplete) onComplete()
    }

    const handleSkip = () => {
        if (onComplete) onComplete()
    }

    // If video fails to load or play, skip the intro
    useEffect(() => {
        if (videoError) {
            onComplete()
        }
    }, [videoError, onComplete])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <video
                ref={videoRef}
                src="/logo animation 2.0.mp4"
                muted
                playsInline
                autoPlay
                onEnded={handleEnded}
                onError={() => setVideoError(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    maxWidth: '1200px',
                    transform: 'scale(1.04)', // Slight scale to hide watermarks at the edges
                    transition: 'transform 0.5s ease'
                }}
            />

            {/* Skip Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                onClick={handleSkip}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'
                }}
            >
                Skip Intro
            </motion.button>
        </motion.div>
    )
}

IntroSequence.propTypes = {
    onComplete: PropTypes.func,
}

export default IntroSequence
