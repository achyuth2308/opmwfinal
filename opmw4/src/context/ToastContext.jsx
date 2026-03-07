import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within a ToastProvider')
    return context
}

const TOAST_VARIANTS = {
    success: {
        icon: <CheckCircle2 size={18} className="text-green-400" />,
        borderColor: 'rgba(74, 222, 128, 0.2)',
        glowColor: 'rgba(74, 222, 128, 0.1)',
        textColor: '#4ade80'
    },
    error: {
        icon: <AlertCircle size={18} className="text-red-400" />,
        borderColor: 'rgba(248, 113, 113, 0.2)',
        glowColor: 'rgba(248, 113, 113, 0.1)',
        textColor: '#f87171'
    },
    info: {
        icon: <Info size={18} className="text-blue-400" />,
        borderColor: 'rgba(96, 165, 250, 0.2)',
        glowColor: 'rgba(96, 165, 250, 0.1)',
        textColor: '#60a5fa'
    }
}

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success', duration = 4000) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prev) => [...prev, { id, message, type, duration }])

        if (duration !== Infinity) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id))
            }, duration)
        }
        return id
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast])

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {/* Toast Container */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 10000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    pointerEvents: 'none'
                }}
            >
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const variant = TOAST_VARIANTS[toast.type] || TOAST_VARIANTS.success
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                layout
                                style={{
                                    pointerEvents: 'auto',
                                    minWidth: 280,
                                    maxWidth: 400,
                                    background: 'rgba(15, 15, 18, 0.85)',
                                    backdropFilter: 'blur(12px) saturate(180%)',
                                    border: `1px solid ${variant.borderColor}`,
                                    borderRadius: 12,
                                    padding: '14px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 0 20px ${variant.glowColor}`,
                                }}
                            >
                                <div style={{ flexShrink: 0, display: 'flex' }}>
                                    {variant.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: variant.textColor, lineHeight: 1.4 }}>
                                        {toast.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 4,
                                        cursor: 'pointer',
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        display: 'flex',
                                        borderRadius: 6,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'none'
                                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)'
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
