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
                <style>{`
                    @media (max-width: 768px) {
                        .footer-brand-column {
                            align-items: center !important;
                            text-align: center !important;
                            grid-column: 1 / -1 !important;
                        }
                        .footer-logo-link {
                            margin-top: 0 !important;
                            justify-content: center !important;
                        }
                        .footer-description {
                            margin-top: 0 !important;
                            margin-left: auto !important;
                            margin-right: auto !important;
                        }
                        .footer-contact-info {
                            align-items: center !important;
                        }
                    }
                `}</style>
                <div
                    className="footer-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '48px 40px',
                        marginBottom: 56,
                    }}
                >
                    {/* Brand column */}
                    <div
                        className="footer-brand-column"
                        style={{
                            gridColumn: 'span 1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left'
                        }}
                    >
                        <Link to="/" className="footer-logo-link" style={{ display: 'flex', marginBottom: 16, textDecoration: 'none', marginTop: -40 }}>
                            <OPMWLogo size="md" showAnimation={false} />
                        </Link>
                        <p
                            className="footer-description"
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: 14,
                                lineHeight: 1.7,
                                maxWidth: 280,
                                marginBottom: 24,
                                marginTop: -30,
                                marginLeft: 0,
                                paddingLeft: 0
                            }}
                        >
                            One Place Multi Work — India's integrated enterprise operations platform delivering BPO, IT, and HRMS under one brand.
                        </p>
                        <div className="footer-contact-info" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
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
                            <a
                                href="tel:+919154399144"
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
                                <Phone size={13} />
                                +91 91543 99144
                            </a>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 8,
                                    color: 'var(--text-secondary)',
                                    fontSize: 13,
                                    lineHeight: 1.6,
                                }}
                            >
                                <MapPin size={13} style={{ marginTop: 5, flexShrink: 0 }} />
                                Chennai · Hyderabad · Bangalore · Noida · Indore
                            </span>
                        </div>
                    </div>

                    {/* Company links */}
                    <div className="footer-column">
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
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
                    <div className="footer-column">
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
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
                    <div className="footer-column">
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
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
                                    color: 'var(--text-secondary)',
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
                                            color: 'var(--text-secondary)',
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
                    className="footer-bottom-bar"
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
                            color: 'var(--text-secondary)',
                            fontSize: 13,
                            fontFamily: 'JetBrains Mono, monospace',
                        }}
                    >
                        © {year} OPMW — One Place Multi Work. All rights reserved.
                    </p>
                    <p
                        style={{
                            color: 'var(--text-secondary)',
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

