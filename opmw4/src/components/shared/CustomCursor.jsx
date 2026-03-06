import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * CustomCursor — Premium dual-ring cursor with spring lag & hover expand.
 * Hides the native cursor via .custom-cursor-zone class on <body>.
 */
const CustomCursor = () => {
    const outerRef = useRef(null)
    const dotRef = useRef(null)

    useEffect(() => {
        // Hide native cursor globally
        document.body.classList.add('custom-cursor-zone')

        const outer = outerRef.current
        const dot = dotRef.current
        if (!outer || !dot) return

        // GSAP quickTo for buttery-smooth tracking
        const xOuter = gsap.quickTo(outer, 'x', { duration: 0.55, ease: 'power3.out' })
        const yOuter = gsap.quickTo(outer, 'y', { duration: 0.55, ease: 'power3.out' })
        const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'none' })
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'none' })

        const handleMove = (e) => {
            xOuter(e.clientX)
            yOuter(e.clientY)
            xDot(e.clientX)
            yDot(e.clientY)
        }

        // Expand + tint on interactive element hover
        const handleEnter = (e) => {
            const el = e.target
            if (el.closest('a, button, [role="button"], [data-cursor="expand"]')) {
                gsap.to(outer, { scale: 1.8, background: 'rgba(110,231,250,0.15)', duration: 0.3 })
            }
        }
        const handleLeave = () => {
            gsap.to(outer, { scale: 1, background: 'transparent', duration: 0.3 })
        }

        window.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseenter', handleEnter, true)
        document.addEventListener('mouseleave', handleLeave, true)

        return () => {
            document.body.classList.remove('custom-cursor-zone')
            window.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseenter', handleEnter, true)
            document.removeEventListener('mouseleave', handleLeave, true)
        }
    }, [])

    // Only render on non-touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

    return (
        <>
            {/* Outer lag ring */}
            <div
                ref={outerRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(110, 231, 250, 0.5)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                }}
            />
            {/* Inner precise dot */}
            <div
                ref={dotRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: -4,
                    left: -4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    )
}

export default CustomCursor
