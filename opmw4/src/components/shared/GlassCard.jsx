import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTilt } from '@/hooks/useTilt'

const GlassCard = ({ children, className, onClick, as }) => {
    const tiltRef = useTilt(10)
    const Tag = as || 'div'

    return (
        <motion.div
            ref={tiltRef}
            className={`glass-card${className ? ` ${className}` : ''}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            style={{
                cursor: onClick ? 'pointer' : 'default',
                transformStyle: 'preserve-3d',
                perspective: 1000
            }}
        >
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    )
}

GlassCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    as: PropTypes.string,
}

GlassCard.defaultProps = {
    className: '',
    onClick: null,
    as: 'div',
}

export default GlassCard
