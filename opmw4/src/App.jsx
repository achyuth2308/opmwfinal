import { useState, lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import AppRouter from '@/routes/AppRouter'
import ScrollToTop from '@/components/shared/ScrollToTop'

const IntroSequence = lazy(() => import('@/intro/IntroSequence'))

const App = () => {
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem('opmw-intro-seen') === '1'
  )

  const handleIntroComplete = () => {
    sessionStorage.setItem('opmw-intro-seen', '1')
    setIntroComplete(true)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
            {!introComplete ? (
              <Suspense fallback={null}>
                <IntroSequence key="intro" onComplete={handleIntroComplete} />
              </Suspense>
            ) : (
              <AppRouter key="app" />
            )}
          </AnimatePresence>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
