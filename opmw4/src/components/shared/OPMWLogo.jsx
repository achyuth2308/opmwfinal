import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const OPMWLogo = ({ size, showAnimation }) => {
    // Standardizing dimensions: sm: ~100px, md: ~140px, lg: ~210px
    const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.5 : 1
    const baseWidth = 180
    const w = Math.round(baseWidth * scale)

    return (
        <>
            <style>{`
                .opmw-logo-container {
                    --current-w: ${w}px;
                }
                @media (max-width: 768px) {
                    .opmw-logo-container {
                        --current-w: ${Math.round(w * 0.85)}px;
                    }
                }
                @media (max-width: 480px) {
                    .opmw-logo-container {
                        --current-w: ${Math.round(w * 0.75)}px;
                    }
                }
            `}</style>
            <motion.div
                className="opmw-logo-container"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: 'var(--current-w)',
                    minWidth: 'var(--current-w)',
                    overflow: 'visible'
                }}
                initial={showAnimation ? { opacity: 0, y: -10, filter: 'blur(8px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: showAnimation ? 0.2 : 0
                }}
            >
                <img
                    src="/logo (2).png"
                    alt="OPMW Logo"
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
                    }}
                />
            </motion.div>
        </>
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


