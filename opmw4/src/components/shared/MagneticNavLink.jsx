import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const MagneticNavLink = ({ to, children, end, className }) => {
    const ref = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ position: 'relative', display: 'inline-flex' }}
        >
            <NavLink
                to={to}
                end={end}
                className={className}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'color 200ms ease',
                }}
            >
                {({ isActive }) => (
                    <>
                        {/* The animated sliding pill */}
                        {isActive && (
                            <motion.div
                                layoutId="nav-pill"
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 30,
                                }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(255,255,255,0.06)',
                                    borderRadius: '8px',
                                    zIndex: -1,
                                }}
                            />
                        )}
                        <span style={{
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            transition: 'color 200ms ease',
                        }}>
                            {children}
                        </span>
                    </>
                )}
            </NavLink>
        </motion.div>
    )
}

MagneticNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    end: PropTypes.bool,
    className: PropTypes.string,
}

export default MagneticNavLink
