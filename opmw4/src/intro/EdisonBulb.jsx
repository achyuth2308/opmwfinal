import PropTypes from 'prop-types'

const EdisonBulb = ({ isLit, flickerIntensity, filamentBrightness }) => {
    const glassOpacity = isLit ? 0.85 : 0.45
    const glassColor = isLit
        ? `rgba(255, ${180 + Math.round(flickerIntensity * 40)}, ${Math.round(flickerIntensity * 60)}, ${glassOpacity})`
        : 'rgba(180, 120, 40, 0.45)'

    const filamentColor = isLit
        ? `rgba(255, ${200 + Math.round(filamentBrightness * 55)}, ${Math.round(filamentBrightness * 80)}, ${0.6 + filamentBrightness * 0.4})`
        : 'rgba(120, 80, 40, 0.5)'

    const glowFilter = isLit
        ? `drop-shadow(0 0 ${16 + flickerIntensity * 44}px rgba(255, 200, 80, ${0.5 + flickerIntensity * 0.4}))`
        : 'none'

    return (
        <svg
            viewBox="0 0 80 120"
            width="80"
            height="120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: glowFilter, overflow: 'visible' }}
            aria-hidden="true"
        >
            {/* Defs */}
            <defs>
                <radialGradient id="bulbGradient" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor={isLit ? 'rgba(255,240,180,0.95)' : 'rgba(200,150,60,0.6)'} />
                    <stop offset="50%" stopColor={glassColor} />
                    <stop offset="100%" stopColor="rgba(80,50,20,0.7)" />
                </radialGradient>
                <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={isLit ? `rgba(255,220,80,${0.3 + flickerIntensity * 0.5})` : 'rgba(0,0,0,0)'} />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="softBlur">
                    <feGaussianBlur stdDeviation="1" />
                </filter>
            </defs>

            {/* Bulb base / cap (metal part) */}
            <rect x="29" y="88" width="22" height="6" rx="1" fill="rgba(140,110,60,0.8)" />
            <rect x="31" y="94" width="18" height="4" rx="1" fill="rgba(120,90,50,0.8)" />
            <rect x="33" y="98" width="14" height="4" rx="1" fill="rgba(100,75,40,0.8)" />
            <rect x="35" y="102" width="10" height="5" rx="1" fill="rgba(90,65,35,0.9)" />

            {/* Thread contacts at base */}
            <line x1="38" y1="102" x2="37" y2="107" stroke="rgba(160,130,70,0.7)" strokeWidth="1" />
            <line x1="42" y1="102" x2="43" y2="107" stroke="rgba(160,130,70,0.7)" strokeWidth="1" />

            {/* Glass bulb shape */}
            <path
                d="M40 14
           C55 14, 68 28, 68 45
           C68 58, 62 68, 56 76
           C52 81, 50 85, 50 88
           L30 88
           C30 85, 28 81, 24 76
           C18 68, 12 58, 12 45
           C12 28, 25 14, 40 14 Z"
                fill="url(#bulbGradient)"
                stroke="rgba(180,140,60,0.4)"
                strokeWidth="0.5"
            />

            {/* Inner glow layer */}
            <path
                d="M40 14
           C55 14, 68 28, 68 45
           C68 58, 62 68, 56 76
           C52 81, 50 85, 50 88
           L30 88
           C30 85, 28 81, 24 76
           C18 68, 12 58, 12 45
           C12 28, 25 14, 40 14 Z"
                fill="url(#innerGlow)"
            />

            {/* Filament support wires */}
            <line x1="38" y1="55" x2="35" y2="70" stroke="rgba(180,140,60,0.5)" strokeWidth="0.8" />
            <line x1="42" y1="55" x2="45" y2="70" stroke="rgba(180,140,60,0.5)" strokeWidth="0.8" />
            <line x1="35" y1="70" x2="35" y2="85" stroke="rgba(160,120,50,0.5)" strokeWidth="0.7" />
            <line x1="45" y1="70" x2="45" y2="85" stroke="rgba(160,120,50,0.5)" strokeWidth="0.7" />

            {/* Filament coil */}
            <path
                d="M35 58
           Q36 54, 37.5 58
           Q39 62, 40.5 58
           Q42 54, 43.5 58
           Q45 62, 45 60
           L45 55
           Q45 52, 43.5 56
           Q42 60, 40.5 56
           Q39 52, 37.5 56
           Q36 60, 35 58
           Z"
                fill="none"
                stroke={filamentColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Filament horizontal connector */}
            <line
                x1="35"
                y1="58"
                x2="35"
                y2="70"
                stroke={filamentColor}
                strokeWidth="0.8"
            />
            <line
                x1="45"
                y1="58"
                x2="45"
                y2="70"
                stroke={filamentColor}
                strokeWidth="0.8"
            />

            {/* Bulb highlight (specular) */}
            <ellipse
                cx="28"
                cy="30"
                rx="7"
                ry="10"
                fill={isLit ? 'rgba(255,250,220,0.25)' : 'rgba(255,255,255,0.08)'}
                transform="rotate(-20 28 30)"
                filter="url(#softBlur)"
            />

            {/* Pull ring at bottom */}
            <circle
                cx="40"
                cy="114"
                r="5"
                fill="none"
                stroke="rgba(160,130,70,0.9)"
                strokeWidth="1.5"
            />
            <line
                x1="40"
                y1="107"
                x2="40"
                y2="109"
                stroke="rgba(160,130,70,0.8)"
                strokeWidth="1"
            />
        </svg>
    )
}

EdisonBulb.propTypes = {
    isLit: PropTypes.bool.isRequired,
    flickerIntensity: PropTypes.number.isRequired,
    filamentBrightness: PropTypes.number.isRequired,
}

export default EdisonBulb
