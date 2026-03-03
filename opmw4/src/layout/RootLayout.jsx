import { Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SceneBackground from '@/components/shared/SceneBackground'

const RootLayout = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <SceneBackground />

            {/* Top Scroll Progress Bar */}
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--accent)',
                    transformOrigin: '0%',
                    zIndex: 10000,
                }}
            />

            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <Navbar />
                <main style={{ flex: 1, paddingTop: 64 }} id="main-content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default RootLayout
