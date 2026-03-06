import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Menu, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { AdminSidebar } from './AdminDashboard'
import { getAdminCandidates } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const AdminCandidates = () => {
    const navigate = useNavigate()
    const [candidates, setCandidates] = useState([])
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 })
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const loadCandidates = async (page = 1) => {
        setIsLoading(true)
        try {
            const params = { page }
            if (searchQuery.trim()) params.search = searchQuery.trim()
            const result = await getAdminCandidates(params)
            setCandidates(result.data || [])
            setPagination({ current_page: result.current_page, last_page: result.last_page })
        } catch (err) {
            // Error handled by apiClient interceptor
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { loadCandidates() }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        loadCandidates()
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="admin-mobile-topbar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Candidates</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 24 }}>Candidates</h1>

                    {/* Search */}
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 400 }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search name, email, cityâ€¦"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px 10px 34px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                        <button type="submit" style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(110,231,250,0.08)', border: '1px solid rgba(110,231,250,0.2)', color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Search</button>
                    </form>

                    {/* Table */}
                    {isLoading ? (
                        <SkeletonDashboard statCount={0} rowCount={8} cols={5} />
                    ) : (
                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                        {['Candidate', 'Phone', 'City', 'Applications', 'Joined'].map((h) => (
                                            <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.length === 0 ? (
                                        <tr><td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No candidates found.</td></tr>
                                    ) : candidates.map((user) => (
                                        <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <td style={{ padding: '14px 20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <User size={14} style={{ color: 'var(--accent)' }} />
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{user.name}</p>
                                                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{user.phone || 'â€”'}</td>
                                            <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>{user.city || 'â€”'}</td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', fontFamily: 'JetBrains Mono,monospace' }}>{user.applications_count}</span>
                                            </td>
                                            <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', whiteSpace: 'nowrap' }}>{new Date(user.created_at).toLocaleDateString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {pagination.last_page > 1 && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
                                    <button onClick={() => loadCandidates(pagination.current_page - 1)} disabled={pagination.current_page <= 1} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: pagination.current_page <= 1 ? 'not-allowed' : 'pointer', opacity: pagination.current_page <= 1 ? 0.4 : 1, display: 'flex', alignItems: 'center' }}><ChevronLeft size={14} /></button>
                                    <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-muted)' }}>Page {pagination.current_page} of {pagination.last_page}</span>
                                    <button onClick={() => loadCandidates(pagination.current_page + 1)} disabled={pagination.current_page >= pagination.last_page} style={{ padding: '6px 10px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: pagination.current_page >= pagination.last_page ? 'not-allowed' : 'pointer', opacity: pagination.current_page >= pagination.last_page ? 0.4 : 1, display: 'flex', alignItems: 'center' }}><ChevronRight size={14} /></button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <style>{`@media(max-width:768px) { .admin-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default AdminCandidates

