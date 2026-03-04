import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        // Use 'instant' to jump immediately to top without any scroll animation.
        // This prevents the "scrolling from bottom to top" effect on page navigation.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return null
}

export default ScrollToTop
