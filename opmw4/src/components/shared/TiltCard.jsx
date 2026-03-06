import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import PropTypes from 'prop-types'

const TiltCard = ({ children, className = '', style = {} }) => {
    const ref = useRef(null)
    const [hovering, setHovering] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const mouseX = useSpring(0, { stiffness: 400, damping: 30 })
    const mouseY = useSpring(0, { stiffness: 400, damping: 30 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg'])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg'])

    const handleMouseMove = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        // Compute position inside the element (0 to 1)
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        // Set springs for 3D rotation (-0.5 to 0.5 range)
        mouseX.set(x - 0.5)
        mouseY.set(y - 0.5)

        // Save exact pixel coordinates for the CSS radial glow
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => {
        setHovering(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
                position: 'relative',
                overflow: 'hidden'
            }}
            className={`tilt-card-wrapper ${className}`}
        >
            {/* The cursor-following glow mask layer */}
            {hovering && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        pointerEvents: 'none',
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(110, 231, 250, 0.1), transparent 40%)`,
                        mixBlendMode: 'screen',
                        borderRadius: 'inherit'
                    }}
                />
            )}

            {/* Inner content wrapper preserving Z-depth */}
            <div style={{ transform: 'translateZ(20px)', width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    )
}

TiltCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
}

export default TiltCard
