import { useEffect, useRef } from 'react'

/**
 * ParticleCanvas — 60fps mouse-repel dot cloud for the Hero section.
 * Pure canvas API — zero dependencies.
 */
const ParticleCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let mouse = { x: -999, y: -999 }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const PARTICLE_COUNT = 70
        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: 0,
            baseY: 0,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }))

        particles.forEach(p => { p.baseX = p.x; p.baseY = p.y })

        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        window.addEventListener('mousemove', handleMove)

        const REPEL_RADIUS = 120
        const REPEL_STRENGTH = 6

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                // Mouse repel
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < REPEL_RADIUS) {
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
                    p.vx += (dx / dist) * force * REPEL_STRENGTH
                    p.vy += (dy / dist) * force * REPEL_STRENGTH
                }

                // Return to base (spring)
                p.vx += (p.baseX - p.x) * 0.04
                p.vy += (p.baseY - p.y) * 0.04
                // Damping
                p.vx *= 0.88
                p.vy *= 0.88

                p.x += p.vx
                p.y += p.vy

                // Draw dot
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(110, 231, 250, ${p.opacity})`
                ctx.fill()
            })

            // Draw connecting lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(110, 231, 250, ${0.06 * (1 - d / 120)})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }

            animId = requestAnimationFrame(tick)
        }
        tick()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.6,
            }}
        />
    )
}

export default ParticleCanvas
