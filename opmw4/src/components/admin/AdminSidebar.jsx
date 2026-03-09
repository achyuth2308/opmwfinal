import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Mail, LogOut, Menu, X, Shield, Briefcase } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { adminLogout } from '@/services/admin.service'
import OPMWLogo from '@/components/shared/OPMWLogo'

export const STATUS_COLORS = {
    Pending: { color: '#FFB84D', bg: 'rgba(251,176,64,0.15)', border: 'rgba(251,176,64,0.3)' },
    Reviewed: { color: '#7FB3FF', bg: 'rgba(127,179,255,0.15)', border: 'rgba(127,179,255,0.3)' },
    Shortlisted: { color: '#66FF99', bg: 'rgba(102,255,153,0.15)', border: 'rgba(102,255,153,0.3)' },
    Rejected: { color: '#f87171', bg: 'rgba(248,113,113,0.15)', border: 'rgba(248,113,113,0.3)' },
    Selected: { color: '#6EE7FA', bg: 'rgba(110,231,250,0.15)', border: 'rgba(110,231,250,0.3)' },
}

export const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/applications', label: 'Applications', icon: FileText },
    { path: '/admin/candidates', label: 'Candidates', icon: Users },
    { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/admin/demo-requests', label: 'Demo Requests', icon: LayoutDashboard },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
]

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { addToast } = useToast()
    const admin = (() => { try { return JSON.parse(localStorage.getItem('opmw-admin')) } catch { return null } })()

    const handleLogout = async () => {
        try {
            await adminLogout()
        } catch { /* ignore */ }
        localStorage.removeItem('opmw-admin-token')
        localStorage.removeItem('opmw-admin')
        addToast('Admin logged out safely.', 'info')
        navigate('/admin/login')
    }

    const sidebarContent = (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--surface-2)' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '20px 20px', borderBottom: '1px solid var(--border)' }}>
                <OPMWLogo size="md" showAnimation={false} />
            </Link>

            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Shield size={14} style={{ color: 'var(--accent)' }} />
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{admin?.name || 'Admin'}</p>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.email}</p>
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
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', transition: 'all 200ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.06)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}>
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
            <style>{`
                @keyframes adminSlideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
                @media(min-width:769px) { .admin-sidebar-desktop { display: block !important; } }
                @media(max-width:768px) { .admin-sidebar-desktop { display: none !important; } }
            `}</style>
        </>
    )
}
