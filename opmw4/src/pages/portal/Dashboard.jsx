import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, User, LogOut, Menu, X, Star } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

import apiClient from '@/services/api'

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
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            {status === 'Selected' && <Star size={9} />}
            {status}
        </span>
    )
}

const PortalSidebar = ({ mobileOpen, setMobileOpen }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await apiClient.post('logout')
        } catch { /* ignore */ }
        logout()
        navigate('/login')
    }

    const sidebarContent = (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>CP</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Candidate Portal</span>
            </Link>

            {/* User info */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{user?.name || 'Candidate'}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: '12px 8px' }}>
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path
                    return (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMobileOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500, color: isActive ? 'var(--accent)' : 'var(--text-secondary)', background: isActive ? 'rgba(110,231,250,0.08)' : 'transparent', marginBottom: 2, transition: 'all 200ms ease' }}
                            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', transition: 'all 200ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.06)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside style={{ width: 240, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }} className="portal-sidebar-desktop">
                {sidebarContent}
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} onClick={() => setMobileOpen(false)} />
                    <aside style={{ width: 260, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', position: 'relative', zIndex: 1, overflowY: 'auto', animation: 'slideIn 0.2s ease' }}>
                        {sidebarContent}
                    </aside>
                </div>
            )}
            <style>{`@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } @media(min-width:769px) { .portal-sidebar-desktop { display: block !important; } } @media(max-width:768px) { .portal-sidebar-desktop { display: none !important; } }`}</style>
        </>
    )
}

const Dashboard = () => {
    const { token } = useAuth()
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiClient.get('applications')
                setApplications(data)
            } catch { /* ignore */ } finally {
                setIsLoading(false)
            }
        }
        if (token) load()
        else setIsLoading(false)
    }, [token])

    const stats = {
        total: applications.length,
        pending: applications.filter((a) => a.status === 'Pending').length,
        latest: applications[0]?.status || 'â€”',
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <PortalSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                {/* Mobile topbar */}
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="portal-mobile-topbar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>OPMW Portal</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    {/* Welcome banner */}
                    <div style={{ marginBottom: 32 }}>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                            Candidate Dashboard
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Welcome back, {user?.name?.split(' ')[0] || 'there'}! Here's a summary of your OPMW applications.</p>
                    </div>

                    {isLoading ? (
                        <SkeletonDashboard statCount={3} rowCount={5} cols={4} />
                    ) : (
                        <>
                            {/* Stat cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
                                {[
                                    { label: 'Total Applications', value: stats.total, color: '#6EE7FA' },
                                    { label: 'Pending Review', value: stats.pending, color: '#FBB040' },
                                    { label: 'Latest Status', value: stats.latest, color: STATUS_COLORS[stats.latest]?.color || 'var(--text-muted)', isText: true },
                                ].map((card) => (
                                    <div key={card.label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
                                        <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{card.label}</p>
                                        <p style={{ fontSize: card.isText ? 18 : 32, fontWeight: 700, color: card.color, fontFamily: card.isText ? 'inherit' : 'JetBrains Mono,monospace', letterSpacing: card.isText ? '-0.01em' : '-0.02em' }}>{card.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent applications */}
                            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Recent Applications</h2>
                                    <Link to="/portal/applications" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>View all â†’</Link>
                                </div>

                                {applications.length === 0 ? (
                                    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 12 }}>No applications yet.</p>
                                        <Link to="/careers" style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none' }}>Browse open roles â†’</Link>
                                    </div>
                                ) : (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                                    {['Role', 'Location', 'Date', 'Status'].map((h) => (
                                                        <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {applications.slice(0, 5).map((app, i) => (
                                                    <tr key={app.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                                        <td style={{ padding: '14px 24px', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{app.role}</td>
                                                        <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--text-secondary)' }}>{app.location}</td>
                                                        <td style={{ padding: '14px 24px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace' }}>{app.created_at ? new Date(app.created_at).toLocaleDateString('en-IN') : 'â€”'}</td>
                                                        <td style={{ padding: '14px 24px' }}><StatusBadge status={app.status} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <style>{`@media(max-width:768px) { .portal-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default Dashboard



