import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const IntroSequence = ({ onComplete }) => {
    const [videoError, setVideoError] = useState(false)
    const videoRef = useRef(null)

    // Ensure video plays or fails gracefully
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0
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
            <style>{`
                .intro-video-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000;
                }
                .intro-video {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    transition: transform 0.5s ease;
                }
                
                /* For wider screens, allow it to cover more space if needed, button position adjustment */
                @media (min-aspect-ratio: 16/9) {
                    .intro-video {
                        width: 100vw;
                        height: 100vh;
                        object-fit: cover;
                        transform: scale(1.02);
                    }
                }

                .skip-btn {
                    position: absolute;
                    bottom: 40px;
                    right: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.5);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-family: 'JetBrains Mono', monospace;
                    cursor: pointer;
                    z-index: 100;
                    backdrop-filter: blur(10px);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    transition: all 0.2s ease;
                    outline: none;
                }

                @media (max-width: 768px) {
                    .skip-btn {
                        bottom: 30px;
                        right: 50% !important;
                        transform: translateX(50%);
                        padding: 7px 14px;
                        font-size: 9px;
                        white-space: nowrap;
                    }
                }
            `}</style>

            <div className="intro-video-container">
                <video
                    ref={videoRef}
                    src="/logo animation 2.0.mp4"
                    className="intro-video"
                    muted
                    playsInline
                    onEnded={handleEnded}
                    onError={() => setVideoError(true)}
                />
            </div>

            {/* Skip Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={handleSkip}
                className="skip-btn"
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

