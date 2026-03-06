import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * TypewriterText Component
 * @param {Array|string} text - An array of segments [{text, color, shimmer}] or a simple string
 * @param {number} delay - Delay in seconds before typing starts
 * @param {string} cursorColor - Color of the typing cursor
 * @param {boolean} showCursor - Whether to show the cursor during typing
 */
const TypewriterText = ({ text, delay = 0, cursorColor = 'var(--accent)', showCursor = true, nowrap = false }) => {
    // Normalize text into segments
    const segments = typeof text === 'string' ? [{ text }] : text
    const fullText = segments.map(s => s.text).join('')

    const [charCount, setCharCount] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let timeout
        const startTimeout = setTimeout(() => {
            let i = 0
            const type = () => {
                if (i < fullText.length) {
                    setCharCount(i + 1)
                    i++
                    timeout = setTimeout(type, 50 + Math.random() * 40)
                } else {
                    setIsComplete(true)
                }
            }
            type()
        }, delay * 1000)

        return () => {
            clearTimeout(startTimeout)
            clearTimeout(timeout)
        }
    }, [fullText, delay])

    let charactersDisplayed = 0

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '1.2em',
            position: 'relative',
            whiteSpace: nowrap ? 'nowrap' : 'pre-wrap',
            flexWrap: nowrap ? 'nowrap' : 'wrap',
            justifyContent: 'inherit'
        }}>
            {segments.map((seg, idx) => {
                const textToShow = seg.text.substring(0, Math.max(0, charCount - charactersDisplayed))
                charactersDisplayed += seg.text.length

                const isShimmer = seg.shimmer
                const style = isShimmer ? {
                    background: 'linear-gradient(90deg, #6EE7FA 0%, #F1B255 50%, #6EE7FA 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'textShimmer 3s linear infinite',
                    display: 'inline-block'
                } : {
                    color: seg.color || 'inherit'
                }

                return (
                    <span key={idx} style={{ ...style, transition: 'color 0.3s ease' }}>
                        {textToShow}
                    </span>
                )
            })}

            {showCursor && !isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0.1, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '0.85em',
                        background: cursorColor,
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                        boxShadow: `0 0 10px ${cursorColor}`,
                        visibility: charCount > 0 || delay === 0 ? 'visible' : 'hidden'
                    }}
                />
            )}

            <style>{`
                @keyframes textShimmer {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
        </span>
    )
}

export default TypewriterText

