import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const LightBloom = ({ isVisible, intensity }) => {
    if (!isVisible) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: intensity, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9996,
                background:
                    'radial-gradient(circle at 50% 30%, rgba(255,190,60,0.18) 0%, rgba(255,160,40,0.08) 30%, rgba(255,140,20,0.03) 60%, transparent 80%)',
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        />
    )
}

LightBloom.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    intensity: PropTypes.number.isRequired,
}

export default LightBloom

