import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import AppRouter from '@/routes/AppRouter'
import IntroSequence from '@/intro/IntroSequence'
import ScrollToTop from '@/components/shared/ScrollToTop'

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
              <IntroSequence key="intro" onComplete={handleIntroComplete} />
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
