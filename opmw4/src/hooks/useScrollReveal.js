import { useEffect, useState } from 'react'

const useScrollReveal = (ref, options = {}) => {
    const [isVisible, setIsVisible] = useState(false)

    const threshold = options.threshold ?? 0.15
    const rootMargin = options.rootMargin ?? '0px 0px -50px 0px'

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [ref, threshold, rootMargin])

    return isVisible
}

export default useScrollReveal

