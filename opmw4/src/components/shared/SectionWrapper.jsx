import { useRef } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import useScrollReveal from '@/hooks/useScrollReveal'

const SectionWrapper = ({ children, className, delay, id }) => {
    const ref = useRef(null)
    const isVisible = useScrollReveal(ref, { threshold: 0.12 })

    return (
        <motion.section
            ref={ref}
            id={id}
            className={className}
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
                duration: 0.6,
                delay: delay || 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.section>
    )
}

SectionWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delay: PropTypes.number,
    id: PropTypes.string,
}

SectionWrapper.defaultProps = {
    className: '',
    delay: 0,
    id: undefined,
}

export default SectionWrapper

