import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Mail, LogOut, Menu, X, Shield, Briefcase } from 'lucide-react'
import { getAdminDashboard, adminLogout } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const STATUS_COLORS = {
    Pending: { color: '#FBB040', bg: 'rgba(251,176,64,0.1)', border: 'rgba(251,176,64,0.25)' },
    Reviewed: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
    Shortlisted: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)' },
    Rejected: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
    Selected: { color: '#6EE7FA', bg: 'rgba(110,231,250,0.1)', border: 'rgba(110,231,250,0.25)' },
}

const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/applications', label: 'Applications', icon: FileText },
    { path: '/admin/candidates', label: 'Candidates', icon: Users },
    { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
]

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const admin = (() => { try { return JSON.parse(localStorage.getItem('opmw-admin')) } catch { return null } })()

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('opmw-admin-token')
            await adminLogout(token)
        } catch { /* ignore */ }
        localStorage.removeItem('opmw-admin-token')
        localStorage.removeItem('opmw-admin')
        navigate('/admin/login')
    }

    const sidebarContent = (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>OP</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>OPMW Admin</span>
            </Link>

            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Shield size={14} style={{ color: 'var(--accent)' }} />
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{admin?.name || 'Admin'}</p>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.email}</p>
            </div>

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

            <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', transition: 'all 200ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.06)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    )

    return (
        <>
            <aside style={{ width: 240, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }} className="admin-sidebar-desktop">
                {sidebarContent}
            </aside>
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} onClick={() => setMobileOpen(false)} />
                    <aside style={{ width: 260, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', position: 'relative', zIndex: 1, overflowY: 'auto', animation: 'adminSlideIn 0.2s ease' }}>
                        {sidebarContent}
                    </aside>
                </div>
            )}
            <style>{`@keyframes adminSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } @media(min-width:769px) { .admin-sidebar-desktop { display: block !important; } } @media(max-width:768px) { .admin-sidebar-desktop { display: none !important; } }`}</style>
        </>
    )
}

export { AdminSidebar, NAV_ITEMS, STATUS_COLORS }

const AdminDashboard = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem('opmw-admin-token')
            if (!token) { navigate('/admin/login', { replace: true }); return }
            try {
                const result = await getAdminDashboard(token)
                setData(result)
            } catch (err) {
                if (err.status === 401 || err.status === 403) {
                    localStorage.removeItem('opmw-admin-token')
                    localStorage.removeItem('opmw-admin')
                    navigate('/admin/login', { replace: true })
                    return
                }
                setError(err.message || 'Failed to load dashboard.')
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [navigate])

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                {/* Mobile topbar */}
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="admin-mobile-topbar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>OPMW Admin</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <div style={{ marginBottom: 32 }}>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                            Admin Dashboard
                        </h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Overview of OPMW platform activity.</p>
                    </div>

                    {isLoading ? (
                        <SkeletonDashboard statCount={4} rowCount={6} cols={4} />
                    ) : error ? (
                        <div style={{ padding: '20px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 12, color: 'rgba(248,113,113,0.9)', fontSize: 14 }}>{error}</div>
                    ) : data && (
                        <>
                            {/* Stat cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
                                {[
                                    { label: 'Total Users', value: data.total_users, color: '#6EE7FA' },
                                    { label: 'Total Applications', value: data.total_applications, color: '#4ade80' },
                                    { label: 'Pending Review', value: data.pending_applications, color: '#FBB040' },
                                    { label: 'Unread Contacts', value: data.unread_contacts, color: '#f87171' },
                                ].map((card) => (
                                    <div key={card.label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
                                        <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{card.label}</p>
                                        <p style={{ fontSize: 32, fontWeight: 700, color: card.color, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '-0.02em' }}>{card.value}</p>
                                    </div>
                                ))}
                            </div>


                            {/* Recent applications */}
                            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Recent Applications</h2>
                                    <Link to="/admin/applications" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>View all →</Link>
                                </div>
                                {data.recent_applications && data.recent_applications.length > 0 ? (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                                    {['Applicant', 'Role', 'Status', 'Date'].map((h) => (
                                                        <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.recent_applications.map((app) => {
                                                    const c = STATUS_COLORS[app.status] || STATUS_COLORS.Pending
                                                    return (
                                                        <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                                            <td style={{ padding: '14px 24px' }}>
                                                                <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{app.applicant_name}</p>
                                                                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{app.applicant_email}</p>
                                                            </td>
                                                            <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--text-secondary)' }}>{app.role}</td>
                                                            <td style={{ padding: '14px 24px' }}>
                                                                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px' }}>
                                                                    {app.status}
                                                                </span>
                                                            </td>
                                                            <td style={{ padding: '14px 24px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace' }}>
                                                                {new Date(app.created_at).toLocaleDateString('en-IN')}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No applications yet.</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <style>{`@media(max-width:768px) { .admin-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default AdminDashboard
