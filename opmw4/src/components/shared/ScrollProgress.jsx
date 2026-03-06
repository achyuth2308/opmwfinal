import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollProgress Component
 * A 3px tall progress bar at the top of the viewport.
 */
const ScrollProgress = () => {
    useEffect(() => {
        gsap.to('.scroll-progress-bar', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        })
    }, [])

    return (
        <div
            className="scroll-progress-bar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: 'linear-gradient(90deg, #3B82F6, #6EE7FA)',
                transformOrigin: 'left',
                scaleX: 0,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    )
}

export default ScrollProgress
