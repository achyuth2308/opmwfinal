import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import App from './App.jsx'
import { initEmailJS } from '@/services/emailjs.service'

// Initialise EmailJS
initEmailJS()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)

