import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useMagnetic Hook (GSAP version)
 * Buttons slightly "stick" to and follow the cursor.
 */
export const useMagnetic = (strength = 0.5) => {
    const ref = useRef(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const handleMouseMove = (e) => {
            const { left, top, width, height } = node.getBoundingClientRect()
            const centerX = left + width / 2
            const centerY = top + height / 2

            const deltaX = e.clientX - centerX
            const deltaY = e.clientY - centerY

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

            if (distance < 80) {
                gsap.to(node, {
                    x: deltaX * strength,
                    y: deltaY * strength,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            } else {
                gsap.to(node, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                })
            }
        }

        const handleMouseLeave = () => {
            gsap.to(node, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        node.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            node.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength])

    return ref
}
