import { useEffect, useState, useRef } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

const useCounterAnimation = (target, duration = 2000, isActive = false) => {
    const [currentValue, setCurrentValue] = useState(0)
    const rafRef = useRef(null)
    const startTimeRef = useRef(null)

    useEffect(() => {
        if (!isActive) return

        startTimeRef.current = null

        const step = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp
            const elapsed = timestamp - startTimeRef.current
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easeOutCubic(progress)
            const value = Math.round(easedProgress * target)
            setCurrentValue(value)

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step)
            }
        }

        rafRef.current = requestAnimationFrame(step)

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [target, duration, isActive])

    return currentValue
}

export default useCounterAnimation
