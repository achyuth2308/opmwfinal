import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const OPMWLogo = ({ size, showAnimation }) => {
    const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.4 : 1
    const w = Math.round(120 * scale)
    const h = Math.round(36 * scale)

    return (
        <motion.svg
            viewBox="0 0 120 36"
            width={w}
            height={h}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="OPMW Logo"
            role="img"
            style={{ overflow: 'visible' }}
        >
            <defs>
                <filter id="oGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(110,231,250,0.5)" />
                </filter>
            </defs>

            {/* O — circle ring with glow */}
            <motion.circle
                cx="12"
                cy="18"
                r="9.5"
                fill="none"
                stroke="#F0F4F8"
                strokeWidth="2.5"
                strokeDasharray="55"
                initial={showAnimation ? { strokeDashoffset: 55, opacity: 0 } : { strokeDashoffset: 0, opacity: 1 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{ filter: 'url(#oGlow)' }}
            />
            {/* O inner glow ring */}
            <motion.circle
                cx="12"
                cy="18"
                r="7"
                fill="none"
                stroke="rgba(110,231,250,0.5)"
                strokeWidth="1"
                initial={showAnimation ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.2 }}
            />

            {/* P */}
            <motion.path
                d="M26 8 L26 28 M26 8 L34 8 Q40 8 40 14 Q40 20 34 20 L26 20"
                fill="none"
                stroke="#F0F4F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                initial={showAnimation ? { strokeDashoffset: 60, opacity: 0 } : { strokeDashoffset: 0, opacity: 1 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* M */}
            <motion.path
                d="M45 28 L45 8 L57 22 L69 8 L69 28"
                fill="none"
                stroke="#F0F4F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                initial={showAnimation ? { strokeDashoffset: 70, opacity: 0 } : { strokeDashoffset: 0, opacity: 1 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* W */}
            <motion.path
                d="M74 8 L81 28 L88 16 L95 28 L102 8"
                fill="none"
                stroke="#F0F4F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="70"
                initial={showAnimation ? { strokeDashoffset: 70, opacity: 0 } : { strokeDashoffset: 0, opacity: 1 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* Pulsing glow on O ring */}
            <motion.circle
                cx="12"
                cy="18"
                r="9.5"
                fill="none"
                stroke="rgba(110,231,250,0.3)"
                strokeWidth="1"
                animate={{
                    filter: [
                        'drop-shadow(0 0 2px rgba(110,231,250,0.2))',
                        'drop-shadow(0 0 6px rgba(110,231,250,0.5))',
                        'drop-shadow(0 0 2px rgba(110,231,250,0.2))',
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: showAnimation ? 0.9 : 0,
                }}
            />
        </motion.svg>
    )
}

OPMWLogo.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    showAnimation: PropTypes.bool,
}

OPMWLogo.defaultProps = {
    size: 'md',
    showAnimation: true,
}

export default OPMWLogo
