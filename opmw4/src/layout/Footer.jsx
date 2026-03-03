import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react'
import OPMWLogo from '@/components/shared/OPMWLogo'
import { FOOTER_LINKS } from '@/constants/navigation'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer
            style={{
                background: 'var(--surface-1)',
                borderTop: '1px solid var(--border)',
                padding: '64px 24px 32px',
            }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '48px 40px',
                        marginBottom: 56,
                    }}
                >
                    {/* Brand column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <Link to="/" style={{ display: 'inline-flex', marginBottom: 16 }}>
                            <OPMWLogo size="md" showAnimation={false} />
                        </Link>
                        <p
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: 14,
                                lineHeight: 1.7,
                                maxWidth: 240,
                                marginBottom: 24,
                            }}
                        >
                            One Place Multi Work — India&apos;s integrated enterprise operations platform delivering BPO, IT, and HRMS under one brand.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <a
                                href="mailto:info@opmw.in"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    color: 'var(--text-secondary)',
                                    fontSize: 13,
                                    textDecoration: 'none',
                                    transition: 'color 200ms ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                            >
                                <Mail size={13} />
                                info@opmw.in
                            </a>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    color: 'var(--text-secondary)',
                                    fontSize: 13,
                                }}
                            >
                                <MapPin size={13} />
                                Chennai · Hyderabad · Bangalore · Noida · Indore
                            </span>
                        </div>
                    </div>

                    {/* Company links */}
                    <div>
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginBottom: 16,
                            }}
                        >
                            Company
                        </p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: 14,
                                            textDecoration: 'none',
                                            transition: 'color 200ms ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services links */}
                    <div>
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginBottom: 16,
                            }}
                        >
                            Services
                        </p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FOOTER_LINKS.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: 14,
                                            textDecoration: 'none',
                                            transition: 'color 200ms ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginBottom: 16,
                            }}
                        >
                            Legal
                        </p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FOOTER_LINKS.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: 14,
                                            textDecoration: 'none',
                                            transition: 'color 200ms ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 28 }}>
                            <p
                                style={{
                                    fontSize: 11,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-muted)',
                                    marginBottom: 8,
                                }}
                            >
                                Compliance
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {['GST Registered', 'MSME Registered'].map((badge) => (
                                    <span
                                        key={badge}
                                        style={{
                                            fontSize: 11,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            color: 'var(--text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 5,
                                                height: 5,
                                                borderRadius: '50%',
                                                background: 'var(--accent)',
                                                display: 'inline-block',
                                                flexShrink: 0,
                                            }}
                                        />
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        paddingTop: 32,
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 12,
                    }}
                >
                    <p
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: 13,
                            fontFamily: 'JetBrains Mono, monospace',
                        }}
                    >
                        © {year} OPMW — One Place Multi Work. All rights reserved.
                    </p>
                    <p
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: 12,
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.08em',
                        }}
                    >
                        Chennai · Hyderabad · Bangalore · Noida · Indore
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
