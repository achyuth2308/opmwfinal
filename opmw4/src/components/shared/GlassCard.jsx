import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const GlassCard = ({ children, className, onClick, as }) => {
    const Tag = as || 'div'

    if (onClick) {
        return (
            <motion.div
                className={`glass-card${className ? ` ${className}` : ''}`}
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
            className={`glass-card${className ? ` ${className}` : ''}`}
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
}

GlassCard.defaultProps = {
    className: '',
    onClick: null,
    as: 'div',
}

export default GlassCard

