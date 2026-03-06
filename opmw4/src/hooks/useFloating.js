import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useFloating Hook
 * Applies a low-frequency ambient floating animation.
 */
export const useFloating = (yAmplitude = 15, duration = 3) => {
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return

        gsap.to(ref.current, {
            y: `+=${yAmplitude}`,
            rotation: 2,
            duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2 // Random start offset
        })
    }, [yAmplitude, duration])

    return ref
}
