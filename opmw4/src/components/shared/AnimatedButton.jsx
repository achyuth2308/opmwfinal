import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

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
        opacity: disabled ? 0.7 : 1,
        outline: 'none',
        position: 'relative',
    }

    const combinedClassName = `${variantClass} ${sizeClasses[size] || sizeClasses.md}${className ? ` ${className}` : ''}`

    const MotionTag = href ? motion.a : motion.button

    const motionProps = {
        whileHover: disabled ? {} : { y: -2 },
        whileTap: disabled ? {} : { scale: 0.98, y: 0 },
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    }

    if (animatedBorder) {
        return (
            <div style={{ position: 'relative', display: 'inline-flex', borderRadius: '10px', padding: '1px' }}>
                <div
                    className="animated-border"
                    style={{ position: 'absolute', inset: 0, borderRadius: '10px', zIndex: 0 }}
                />
                <MotionTag
                    {...motionProps}
                    className={combinedClassName}
                    style={{ ...baseStyle, position: 'relative', zIndex: 1, borderRadius: '9px', border: 'none' }}
                    onClick={onClick}
                    href={href}
                    type={type}
                    disabled={disabled}
                >
                    {children}
                </MotionTag>
            </div>
        )
    }

    return (
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
        </MotionTag>
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

