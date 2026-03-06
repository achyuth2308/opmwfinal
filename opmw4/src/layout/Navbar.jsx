import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, LogIn } from 'lucide-react'
import OPMWLogo from '@/components/shared/OPMWLogo'
import AnimatedButton from '@/components/shared/AnimatedButton'
import MagneticNavLink from '@/components/shared/MagneticNavLink'
import { NAV_LINKS } from '@/constants/navigation'
import { useAuth } from '@/context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth()

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('opmw-token')
            await fetch(`${API_BASE}/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })
        } catch { /* ignore */ }
        logout()
        navigate('/')
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
        setServicesOpen(false)
    }, [location.pathname])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            <motion.header
                initial={{ y: -80, x: '-50%', opacity: 0 }}
                animate={{ y: isScrolled ? 16 : 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    zIndex: 1000,
                    height: isScrolled ? 68 : 84,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 'clamp(20px, 5vw, 40px)',
                    paddingRight: 'clamp(20px, 5vw, 40px)',
                    width: isScrolled ? 'calc(100% - 32px)' : '100%',
                    maxWidth: isScrolled ? 1200 : 1400,
                    borderRadius: isScrolled ? 20 : 0,
                    background: isScrolled
                        ? 'rgba(10,10,12,0.7)'
                        : 'rgba(10,10,12,0.3)',
                    backdropFilter: isScrolled ? 'blur(24px) saturate(1.8)' : 'blur(12px)',
                    WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.8)' : 'blur(12px)',
                    border: isScrolled
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid transparent',
                    borderBottom: !isScrolled ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isScrolled ? '0 20px 48px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)' : 'none',
                    transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* Left: Logo (Takes 1 unit of space) */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <Link to="/" aria-label="OPMW Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <OPMWLogo size="md" showAnimation={false} />
                        </Link>
                    </div>

                    {/* Center: Desktop Nav Links (Takes as much as needed, centered) */}
                    <nav
                        aria-label="Primary navigation"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            justifyContent: 'center'
                        }}
                        className="hidden-mobile"
                    >
                        {NAV_LINKS.map((link) => {
                            if (link.children) {
                                return (
                                    <div
                                        key={link.label}
                                        style={{ position: 'relative' }}
                                        onMouseEnter={() => setServicesOpen(true)}
                                        onMouseLeave={() => setServicesOpen(false)}
                                    >
                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 4,
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '8px 16px',
                                                borderRadius: 6,
                                                color: 'var(--text-secondary)',
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: 'Inter, sans-serif',
                                                transition: 'all 200ms ease',
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                                            aria-expanded={servicesOpen}
                                            aria-haspopup="true"
                                        >
                                            {link.label}
                                            <ChevronDown size={14} />
                                        </button>

                                        <AnimatePresence>
                                            {servicesOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.2 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        paddingTop: 8,
                                                        minWidth: 220,
                                                        zIndex: 100,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            background: 'var(--surface-1)',
                                                            border: '1px solid var(--border)',
                                                            borderRadius: 12,
                                                            padding: 8,
                                                            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                                                        }}
                                                    >
                                                        {link.children.map((child) => (
                                                            <NavLink
                                                                key={child.href}
                                                                to={child.href}
                                                                style={({ isActive }) => ({
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    padding: '12px 14px',
                                                                    borderRadius: 8,
                                                                    textDecoration: 'none',
                                                                    fontSize: 14,
                                                                    fontWeight: 500,
                                                                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                                                    background: isActive ? 'var(--accent-dim)' : 'transparent',
                                                                    transition: 'all 150ms ease',
                                                                })}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.color = 'var(--text-primary)'
                                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.color = 'var(--text-secondary)'
                                                                    e.currentTarget.style.background = 'transparent'
                                                                }}
                                                            >
                                                                {child.label}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            }

                            return (
                                <MagneticNavLink
                                    key={link.href}
                                    to={link.href}
                                    end={link.href === '/'}
                                    className="nav-item-magnetic"
                                >
                                    {link.label}
                                </MagneticNavLink>
                            )
                        })}
                    </nav>

                    {/* Right: Actions + Hamburger (Takes 1 unit of space) */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                        {/* Desktop Actions */}
                        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {isAuthenticated ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Link
                                        to="/portal"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 7,
                                            padding: '7px 14px', borderRadius: 8,
                                            background: 'rgba(110,231,250,0.08)',
                                            border: '1px solid rgba(110,231,250,0.2)',
                                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                                            color: 'var(--accent)', transition: 'all 200ms ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.16)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.08)' }}
                                    >
                                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(110,231,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace' }}>
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                        Portal
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        title="Logout"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '7px 8px', borderRadius: 7, display: 'flex', alignItems: 'center', transition: 'color 200ms ease' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
                                    >
                                        <LogOut size={15} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        padding: '7px 16px', borderRadius: 8,
                                        background: 'rgba(110,231,250,0.08)',
                                        border: '1px solid rgba(110,231,250,0.2)',
                                        textDecoration: 'none', fontSize: 13, fontWeight: 600,
                                        color: 'var(--accent)', transition: 'all 200ms ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.16)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.08)' }}
                                >
                                    <LogIn size={14} /> Sign In
                                </Link>
                            )}
                        </div>

                        {/* Mobile Hamburger (Visible only on mobile) */}
                        <button
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                padding: 8,
                                borderRadius: 8,
                                position: 'relative',
                                zIndex: 1001,
                            }}
                            className="show-mobile"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: '0%' }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                            position: 'fixed',
                            top: 64,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999,
                            background: 'var(--surface-1)',
                            padding: '32px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            overflowY: 'auto',
                        }}
                    >
                        {NAV_LINKS.map((link) => {
                            if (link.children) {
                                return (
                                    <div key={link.label}>
                                        <p
                                            style={{
                                                color: 'var(--text-muted)',
                                                fontSize: 11,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                letterSpacing: '0.12em',
                                                textTransform: 'uppercase',
                                                padding: '16px 0 8px',
                                            }}
                                        >
                                            {link.label}
                                        </p>
                                        {link.children.map((child) => (
                                            <NavLink
                                                key={child.href}
                                                to={child.href}
                                                style={({ isActive }) => ({
                                                    display: 'block',
                                                    padding: '12px 16px',
                                                    borderRadius: 8,
                                                    textDecoration: 'none',
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                                    background: isActive ? 'var(--accent-dim)' : 'transparent',
                                                    marginBottom: 2,
                                                })}
                                            >
                                                {child.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )
                            }
                            return (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    end={link.href === '/'}
                                    style={({ isActive }) => ({
                                        display: 'block',
                                        padding: '14px 16px',
                                        borderRadius: 8,
                                        textDecoration: 'none',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                                    })}
                                >
                                    {link.label}
                                </NavLink>
                            )
                        })}

                        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/portal"
                                        onClick={() => setMobileOpen(false)}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 10, background: 'rgba(110,231,250,0.08)', border: '1px solid rgba(110,231,250,0.2)', textDecoration: 'none', fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}
                                    >
                                        <LayoutDashboard size={16} /> My Portal
                                    </Link>
                                    <button
                                        onClick={() => { setMobileOpen(false); handleLogout() }}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 10, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', fontSize: 16, fontWeight: 600, color: '#f87171', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 10, background: 'rgba(110,231,250,0.08)', border: '1px solid rgba(110,231,250,0.2)', textDecoration: 'none', fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}
                                >
                                    <LogIn size={16} /> Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
        </>
    )
}

export default Navbar
