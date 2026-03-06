import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMagnetic } from '@/hooks/useMagnetic'

const AnimatedButton = ({
    children,
    variant,
    size,
    onClick,
    href,
    type,
    disabled,
    className,
    animatedBorder,
}) => {
    const magneticRef = useMagnetic(0.3)

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    }

    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost'

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: '8px',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
        textDecoration: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        outline: 'none',
        position: 'relative',
    }

    const combinedClassName = `${variantClass} ${sizeClasses[size] || sizeClasses.md}${className ? ` ${className}` : ''}`

    const MotionTag = href ? motion.a : motion.button

    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.02 },
        whileTap: disabled ? {} : { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 20 },
    }

    const buttonContent = (
        <MotionTag
            {...motionProps}
            className={combinedClassName}
            style={baseStyle}
            onClick={onClick}
            href={href}
            type={type}
            disabled={disabled}
        >
            {children}
            {/* The Pulse: Breathing effect for primary buttons */}
            {variant === 'primary' && !disabled && (
                <div
                    className="pulse-ring"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        border: '2px solid var(--accent)',
                        opacity: 0,
                        pointerEvents: 'none',
                        animation: 'breathing-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                />
            )}
        </MotionTag>
    )

    return (
        <div
            ref={magneticRef}
            style={{ display: 'inline-flex', padding: 10 }}
        >
            {animatedBorder ? (
                <div style={{ position: 'relative', display: 'inline-flex', borderRadius: '10px', padding: '1px' }}>
                    <div
                        className="animated-border"
                        style={{ position: 'absolute', inset: 0, borderRadius: '10px', zIndex: 0 }}
                    />
                    <motion.div
                        {...motionProps}
                        style={{ ...baseStyle, position: 'relative', zIndex: 1, borderRadius: '9px', border: 'none' }}
                    >
                        {buttonContent}
                    </motion.div>
                </div>
            ) : buttonContent}
            {/* Breathing pulse animation */}
            <style>{`
                @keyframes breathing-pulse {
                    0% { transform: scale(1); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1.1); opacity: 0; }
                }
            `}</style>
        </div>
    )
}

AnimatedButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    onClick: PropTypes.func,
    href: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    animatedBorder: PropTypes.bool,
}

AnimatedButton.defaultProps = {
    variant: 'primary',
    size: 'md',
    onClick: null,
    href: null,
    type: 'button',
    disabled: false,
    className: '',
    animatedBorder: false,
}

export default AnimatedButton
