import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const OPMWLogoStroke = () => (
    <svg viewBox="0 0 200 56" width="200" height="56" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="logoGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(110,231,250,0.5)" />
            </filter>
        </defs>
        {/* O */}
        <motion.circle
            cx="26"
            cy="28"
            r="20"
            fill="none"
            stroke="#6EE7FA"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
            style={{ filter: 'url(#logoGlow)' }}
        />
        {/* P */}
        <motion.path
            d="M54 8 L54 48 M54 8 L70 8 Q80 8 80 20 Q80 32 70 32 L54 32"
            fill="none"
            stroke="#F0F4F8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* M */}
        <motion.path
            d="M92 48 L92 8 L116 36 L140 8 L140 48"
            fill="none"
            stroke="#F0F4F8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
        />
        {/* W */}
        <motion.path
            d="M152 8 L164 48 L176 24 L188 48 L200 8"
            fill="none"
            stroke="#F0F4F8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        />
    </svg>
)

const MonitorReveal = ({ isVisible }) => {
    if (!isVisible) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 8 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9997,
                perspective: '800px',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Monitor frame */}
            <div
                style={{
                    width: 'clamp(280px, 60vw, 560px)',
                    background: '#0F141B',
                    borderRadius: '14px',
                    border: '1px solid rgba(110,231,250,0.15)',
                    boxShadow:
                        '0 0 60px rgba(110,231,250,0.1), 0 40px 100px rgba(0,0,0,0.7)',
                    overflow: 'hidden',
                }}
            >
                {/* Monitor top bar */}
                <div
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: 'rgba(255,80,80,0.6)',
                            display: 'inline-block',
                        }}
                    />
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: 'rgba(255,200,0,0.6)',
                            display: 'inline-block',
                        }}
                    />
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: 'rgba(40,200,80,0.6)',
                            display: 'inline-block',
                        }}
                    />
                    <span
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.2)',
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.1em',
                        }}
                    >
                        opmw.in
                    </span>
                </div>

                {/* Monitor screen content */}
                <div
                    style={{
                        padding: 'clamp(28px, 4vw, 48px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20,
                        background:
                            'linear-gradient(135deg, rgba(110,231,250,0.04) 0%, rgba(0,0,0,0) 60%)',
                    }}
                >
                    {/* Logo stroke draw */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <OPMWLogoStroke />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        style={{
                            color: '#8A9BB0',
                            fontSize: 13,
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                        }}
                    >
                        One Place Multi Work
                    </motion.p>

                    {/* Accent line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.7, duration: 0.5, ease: 'easeOut' }}
                        style={{
                            width: 60,
                            height: 1,
                            background: 'linear-gradient(90deg, transparent, #6EE7FA, transparent)',
                            transformOrigin: 'center',
                        }}
                    />
                </div>
            </div>

            {/* Desk surface line */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
                style={{
                    height: 1,
                    background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                    marginTop: 24,
                    transformOrigin: 'center',
                }}
            />
        </motion.div>
    )
}

MonitorReveal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
}

export default MonitorReveal
