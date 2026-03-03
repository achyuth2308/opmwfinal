import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MouseGlow = () => {
    const mouseX = useMotionValue(-1000)
    const mouseY = useMotionValue(-1000)

    const springConfig = { damping: 40, stiffness: 450 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <motion.div
            style={{
                position: 'fixed',
                width: 800,
                height: 800,
                top: -400,
                left: -400,
                x,
                y,
                background: 'radial-gradient(circle, rgba(110,231,250,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}

const SceneBackground = () => {
    return (
        <div className="scene-bg" aria-hidden="true">
            {/* Dots Grid Pattern handled by globals.css */}

            {/* Background Moving Nodes */}
            <div className="scene-bg__node scene-bg__node--indigo" />
            <div className="scene-bg__node scene-bg__node--violet" />

            {/* Interactive Mouse Follower */}
            <MouseGlow />

            {/* Film Grain Texture for Cinematic Feel */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.04,
                    backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                    filter: 'contrast(160%) brightness(100%)',
                }}
            />

            {/* Global Vignette */}
            <div className="scene-bg__vignette" />
        </div>
    )
}

export default SceneBackground
