import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, User, LogOut, Menu, X, Star } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const API_BASE = import.meta.env.VITE_API_URL || 'http://opmwfinal.onrender.com/api'

const STATUS_COLORS = {
    Pending: { color: '#FBB040', bg: 'rgba(251,176,64,0.1)', border: 'rgba(251,176,64,0.25)' },
    Reviewed: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
    Shortlisted: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)' },
    Rejected: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
    Selected: { color: '#6EE7FA', bg: 'rgba(110,231,250,0.1)', border: 'rgba(110,231,250,0.25)' },
}

const NAV_ITEMS = [
    { path: '/portal', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/portal/applications', label: 'My Applications', icon: FileText },
    { path: '/portal/profile', label: 'My Profile', icon: User },
]

const StatusBadge = ({ status }) => {
    const c = STATUS_COLORS[status] || STATUS_COLORS.Pending
    return (
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
            {status === 'Selected' && <Star size={9} />}
            {status}
        </span>
    )
}

const PortalNav = ({ mobileOpen, setMobileOpen }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const loc = window.location.pathname

    const handleLogout = async () => {
        try {
            const tk = localStorage.getItem('opmw-token')
            await fetch(`${API_BASE}/logout`, { method: 'POST', headers: { Authorization: `Bearer ${tk}`, Accept: 'application/json' } })
        } catch { /* ignore */ }
        logout()
        navigate('/login')
    }

    const content = (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
                <img src="/logo (2).png" alt="OPMW Logo" style={{ height: 24, width: 'auto', objectFit: 'contain' }} />
            </Link>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', marginBottom: 8 }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{user?.name || 'Candidate'}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>
            <nav style={{ flex: 1, padding: '8px' }}>
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                    const active = loc === path
                    return (
                        <Link key={path} to={path} onClick={() => setMobileOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500, color: active ? 'var(--accent)' : 'var(--text-secondary)', background: active ? 'rgba(110,231,250,0.08)' : 'transparent', marginBottom: 2, transition: 'all 200ms ease' }}
                            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}>
                            <Icon size={15} />{label}
                        </Link>
                    )
                })}
            </nav>
            <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', transition: 'all 200ms ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}>
                    <LogOut size={15} />Logout
                </button>
            </div>
        </div>
    )

    return (
        <>
            <aside style={{ width: 230, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }} className="portal-desk-sidebar">{content}</aside>
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
                    <aside style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 250, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', overflowY: 'auto' }}>{content}</aside>
                </div>
            )}
            <style>{`@media(min-width:769px){.portal-desk-sidebar{display:flex!important;flex-direction:column}}@media(max-width:768px){.portal-desk-sidebar{display:none!important}}`}</style>
        </>
    )
}

const MyApplications = () => {
    const { token } = useAuth()
    const [applications, setApplications] = useState([])
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' }
                const [appsRes, notifsRes] = await Promise.all([
                    fetch(`${API_BASE}/applications`, { headers }),
                    fetch(`${API_BASE}/notifications`, { headers }).catch(() => ({ ok: false })),
                ])
                if (appsRes.ok) {
                    const d = await appsRes.json()
                    setApplications(Array.isArray(d) ? d : d.data || [])
                }
                if (notifsRes.ok) {
                    const nd = await notifsRes.json()
                    setNotifications(Array.isArray(nd) ? nd : nd.data || [])
                }
            } catch { /* ignore */ } finally { setIsLoading(false) }
        }
        if (token) load()
        else setIsLoading(false)
    }, [token])

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <PortalNav mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                {/* Mobile topbar */}
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="portal-mobile-bar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>My Applications</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <div style={{ marginBottom: 28 }}>
                        <h1 style={{ fontSize: 'clamp(20px, 2.8vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>My Applications</h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Track all your job applications at OPMW.</p>
                    </div>

                    {/* Applications table */}
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 28 }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
                            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>All Applications</h2>
                        </div>

                        {isLoading ? (
                            <SkeletonDashboard statCount={0} rowCount={6} cols={5} />
                        ) : applications.length === 0 ? (
                            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 12 }}>No applications yet.</p>
                                <Link to="/careers" style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Browse open roles â†’</Link>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['#', 'Role', 'Location', 'Applied Date', 'Status'].map((h) => (
                                                <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app, i) => (
                                            <tr key={app.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 150ms ease' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
                                                <td style={{ padding: '13px 20px', fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-muted)' }}>{i + 1}</td>
                                                <td style={{ padding: '13px 20px', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{app.role}</td>
                                                <td style={{ padding: '13px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{app.location}</td>
                                                <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace' }}>{app.created_at ? new Date(app.created_at).toLocaleDateString('en-IN') : 'â€”'}</td>
                                                <td style={{ padding: '13px 20px' }}><StatusBadge status={app.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Notifications */}
                    {notifications.length > 0 && (
                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
                                <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Status Updates</h2>
                            </div>
                            <div style={{ padding: '8px' }}>
                                {notifications.map((n, i) => (
                                    <div key={n.id || i} style={{ padding: '12px 16px', borderRadius: 8, marginBottom: 4, background: 'rgba(255,255,255,0.02)' }}>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{n.data?.message || JSON.stringify(n.data)}</p>
                                        {n.created_at && <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', marginTop: 4 }}>{new Date(n.created_at).toLocaleDateString('en-IN')}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <style>{`@media(max-width:768px){.portal-mobile-bar{display:flex!important}}`}</style>
        </div>
    )
}

export default MyApplications



