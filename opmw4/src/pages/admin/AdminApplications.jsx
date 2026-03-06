import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Menu, ChevronLeft, ChevronRight, FileDown } from 'lucide-react'
import { AdminSidebar, STATUS_COLORS } from './AdminDashboard'
import { getAdminApplications, updateApplicationStatus } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const STATUSES = ['All', 'Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Selected']

const AdminApplications = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 })
    const [isLoading, setIsLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedApp, setSelectedApp] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [adminNotes, setAdminNotes] = useState('')

    const loadApplications = async (page = 1) => {
        setIsLoading(true)
        try {
            const params = { page }
            if (statusFilter !== 'All') params.status = statusFilter
            if (searchQuery.trim()) params.search = searchQuery.trim()
            const result = await getAdminApplications(params)
            setApplications(result.data || [])
            setPagination({ current_page: result.current_page, last_page: result.last_page })
        } catch (err) {
            // Error handled by apiClient interceptor for 401/403
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { loadApplications() }, [statusFilter])

    const handleSearch = (e) => {
        e.preventDefault()
        loadApplications()
    }

    const handleStatusUpdate = async () => {
        if (!newStatus || !selectedApp) return
        setUpdating(true)
        try {
            await updateApplicationStatus(selectedApp.id, newStatus, adminNotes)

            // If the status was Rejected, the backend deleted it, so remove it from state
            if (newStatus === 'Rejected') {
                setApplications(prev => prev.filter(a => a.id !== selectedApp.id))
            } else {
                loadApplications(pagination.current_page)
            }

            setSelectedApp(null)
            setNewStatus('')
            setAdminNotes('')
        } catch (err) {
            alert(err.message || 'Failed to update status.')
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="admin-mobile-topbar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Applications</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 24 }}>Applications</h1>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, flex: '1 1 260px', maxWidth: 360 }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search name, email, role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', padding: '10px 12px 10px 34px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                            <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(110,231,250,0.08)', border: '1px solid rgba(110,231,250,0.2)', color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Search</button>
                        </form>

                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatusFilter(s)}
                                    style={{
                                        padding: '6px 14px', borderRadius: 6, fontSize: 12, fontFamily: 'JetBrains Mono,monospace', fontWeight: 500, cursor: 'pointer', border: '1px solid',
                                        ...(statusFilter === s
                                            ? { background: 'rgba(110,231,250,0.1)', borderColor: 'rgba(110,231,250,0.3)', color: 'var(--accent)' }
                                            : { background: 'transparent', borderColor: 'var(--border)', color: 'var(--text-muted)' }),
                                        transition: 'all 200ms ease',
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table Area */}
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, overflowX: 'auto' }}>
                        {isLoading ? (
                            <SkeletonDashboard statCount={0} rowCount={8} cols={6} />
                        ) : (
                            <>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['Applicant', 'Role', 'Location', 'Status', 'Date', 'Actions'].map((h) => (
                                                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.length === 0 ? (
                                            <tr><td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No applications found.</td></tr>
                                        ) : applications.map((app) => {
                                            const c = STATUS_COLORS[app.status] || STATUS_COLORS.Pending
                                            return (
                                                <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                                    <td style={{ padding: '14px 20px' }}>
                                                        <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{app.applicant_name}</p>
                                                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{app.applicant_email}</p>
                                                    </td>
                                                    <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{app.role}</td>
                                                    <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-muted)' }}>{app.location}</td>
                                                    <td style={{ padding: '14px 20px' }}>
                                                        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', fontWeight: 700, boxShadow: `0 2px 8px ${c.bg}` }}>{app.status}</span>
                                                    </td>
                                                    <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', whiteSpace: 'nowrap' }}>{new Date(app.created_at).toLocaleDateString('en-IN')}</td>
                                                    <td style={{ padding: '14px 20px', display: 'flex', gap: 8 }}>
                                                        <button
                                                            onClick={() => { setSelectedApp(app); setNewStatus(app.status); setAdminNotes(app.admin_notes || '') }}
                                                            style={{ padding: '5px 12px', borderRadius: 6, background: 'rgba(110,231,250,0.06)', border: '1px solid rgba(110,231,250,0.2)', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', transition: 'all 200ms ease' }}
                                                        >
                                                            Manage
                                                        </button>
                                                        {app.resume_path && (
                                                            <a
                                                                href={`${(import.meta.env.VITE_API_URL || 'http://opmwfinal.onrender.com/api').replace('/api', '')}/storage/${app.resume_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{ padding: 6, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                title="View Resume"
                                                            >
                                                                <FileDown size={14} />
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {pagination.last_page > 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
                                        <button onClick={() => loadApplications(pagination.current_page - 1)} disabled={pagination.current_page <= 1} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: pagination.current_page <= 1 ? 'not-allowed' : 'pointer', opacity: pagination.current_page <= 1 ? 0.4 : 1, display: 'flex', alignItems: 'center' }}><ChevronLeft size={14} /></button>
                                        <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-muted)' }}>Page {pagination.current_page} of {pagination.last_page}</span>
                                        <button onClick={() => loadApplications(pagination.current_page + 1)} disabled={pagination.current_page >= pagination.last_page} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: pagination.current_page >= pagination.last_page ? 'not-allowed' : 'pointer', opacity: pagination.current_page >= pagination.last_page ? 0.4 : 1, display: 'flex', alignItems: 'center' }}><ChevronRight size={14} /></button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Status update modal */}
            {selectedApp && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedApp(null)} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Manage Application</h3>
                            <button onClick={() => setSelectedApp(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={14} /></button>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedApp.applicant_name}</p>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{selectedApp.applicant_email}</p>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedApp.role} — {selectedApp.location}</p>
                        </div>

                        <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Select Next Step</p>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                            {['Pending', 'Reviewed', 'Shortlisted', 'Selected', 'Rejected'].map((s) => {
                                const isCurrent = (newStatus || selectedApp.status) === s;
                                const flow = {
                                    'Pending': ['Reviewed', 'Rejected'],
                                    'Reviewed': ['Shortlisted', 'Rejected'],
                                    'Shortlisted': ['Selected', 'Rejected'],
                                    'Rejected': ['Reviewed'],
                                    'Selected': ['Shortlisted']
                                };
                                // Logic for what buttons to show
                                const currentInDb = selectedApp.status;
                                const isPossible = flow[currentInDb]?.includes(s) || currentInDb === s;
                                const c = STATUS_COLORS[s] || STATUS_COLORS.Pending;

                                if (!isPossible) return null;

                                return (
                                    <button
                                        key={s}
                                        onClick={() => setNewStatus(s)}
                                        style={{
                                            padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: '1px solid',
                                            background: isCurrent ? c.bg : 'rgba(255,255,255,0.03)',
                                            borderColor: isCurrent ? c.color : 'var(--border)',
                                            color: isCurrent ? c.color : 'var(--text-muted)',
                                            transition: 'all 200ms ease',
                                            fontFamily: 'JetBrains Mono, monospace'
                                        }}
                                    >
                                        {s} {currentInDb === s && '•'}
                                    </button>
                                );
                            })}
                        </div>
                        {newStatus && newStatus !== selectedApp.status && (
                            <p style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                                Confirm change: <strong>{selectedApp.status}</strong> → <strong>{newStatus}</strong>
                            </p>
                        )}

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Admin Notes</label>
                            <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} placeholder="Optional internal notes..." style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none', resize: 'vertical', minHeight: 80, boxSizing: 'border-box' }} />
                        </div>

                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setSelectedApp(null)} style={{ padding: '10px 20px', borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleStatusUpdate} disabled={updating} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.3)', color: 'var(--accent)', fontSize: 14, fontWeight: 600, cursor: updating ? 'not-allowed' : 'pointer', opacity: updating ? 0.7 : 1 }}>
                                {updating ? 'Updating...' : 'Update Status'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`@media(max-width:768px) { .admin-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default AdminApplications



