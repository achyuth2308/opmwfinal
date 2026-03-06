import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * SplitText Component
 * Animates text characters/words sliding up from hidden overflow.
 */
const SplitText = ({ text, delay = 0, className = "", style = {}, type = "slide" }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const chars = containerRef.current.querySelectorAll('.char')

        if (type === 'typewriter') {
            gsap.fromTo(chars,
                { opacity: 0, visibility: 'hidden' },
                {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.01,
                    stagger: 0.08,
                    delay,
                    ease: 'none'
                }
            )
        } else {
            // Default slide + blur animation
            gsap.fromTo(chars,
                { y: '40%', opacity: 0, filter: 'blur(12px)' },
                {
                    y: '0%',
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    stagger: 0.03,
                    delay,
                    ease: 'power3.out'
                }
            )
        }
    }, [text, delay, type])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                overflow: 'hidden',
                display: 'inline-block',
                ...style
            }}
        >
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="char"
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                        visibility: type === 'typewriter' ? 'hidden' : 'visible'
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    )
}

export default SplitText
