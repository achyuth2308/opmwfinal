import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const GlassCard = ({ children, className, onClick, as, variant }) => {
    const Tag = as || 'div'
    const baseClass = variant === 'dark' ? 'glass-card-dark' : 'glass-card'

    if (onClick) {
        return (
            <motion.div
                className={`${baseClass}${className ? ` ${className}` : ''}`}
                onClick={onClick}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ cursor: 'pointer' }}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            className={`${baseClass}${className ? ` ${className}` : ''}`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    )
}

GlassCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    as: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'dark']),
}

GlassCard.defaultProps = {
    className: '',
    onClick: null,
    as: 'div',
    variant: 'default',
}

export default GlassCard

