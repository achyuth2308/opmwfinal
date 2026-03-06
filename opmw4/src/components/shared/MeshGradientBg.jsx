import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const MeshGradientBg = () => {
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 })
    const { pathname } = useLocation()

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const xPos = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
            const yPos = (clientY / window.innerHeight - 0.5) * 2 // -1 to 1
            mouseX.set(xPos)
            mouseY.set(yPos)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    // Derived transforms for the blob positions based on mouse
    const blob1X = useTransform(mouseX, [-1, 1], ['-20%', '20%'])
    const blob1Y = useTransform(mouseY, [-1, 1], ['-20%', '20%'])

    const blob2X = useTransform(mouseX, [-1, 1], ['20%', '-20%'])
    const blob2Y = useTransform(mouseY, [-1, 1], ['20%', '-20%'])

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -2,
                overflow: 'hidden',
                background: 'var(--base)',
                pointerEvents: 'none'
            }}
            aria-hidden="true"
        >
            {/* Base grid overlay (optional depth) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.5
            }} />

            {/* Mouse reactive blobs */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(110,231,250,0.12) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    x: blob1X,
                    y: blob1Y,
                    borderRadius: '50%'
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(251,176,64,0.08) 0%, transparent 60%)',
                    filter: 'blur(120px)',
                    x: blob2X,
                    y: blob2Y,
                    borderRadius: '50%'
                }}
            />

            {/* Vignette to darken edges */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(9,9,11,0.8) 100%)',
                zIndex: 1
            }} />
        </div>
    )
}

export default MeshGradientBg
