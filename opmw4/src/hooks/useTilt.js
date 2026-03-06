import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useTilt Hook
 * Interactive 3D perspective tilt based on cursor position.
 */
export const useTilt = (maxRotate = 15) => {
    const ref = useRef(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const handleMouseMove = (e) => {
            const { left, top, width, height } = node.getBoundingClientRect()
            const centerX = left + width / 2
            const centerY = top + height / 2

            const mouseX = e.clientX - centerX
            const mouseY = e.clientY - centerY

            const rotateX = (mouseY / (height / 2)) * -maxRotate
            const rotateY = (mouseX / (width / 2)) * maxRotate

            gsap.to(node, {
                rotateX,
                rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            })
        }

        const handleMouseLeave = () => {
            gsap.to(node, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
        }

        node.addEventListener('mousemove', handleMouseMove)
        node.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            node.removeEventListener('mousemove', handleMouseMove)
            node.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [maxRotate])

    return ref
}
