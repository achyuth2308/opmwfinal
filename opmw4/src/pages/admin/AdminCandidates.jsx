import { useState, useEffect } from 'react'
import { Users, Search, ChevronLeft, ChevronRight, Mail, Phone, Calendar, ArrowRight } from 'lucide-react'
import { getAdminCandidates } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const AdminCandidates = () => {
    const [candidates, setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 })

    const loadCandidates = async (page = 1) => {
        if (isLoading && page !== 1) return
        setIsLoading(true)
        try {
            const params = { page: Number(page) }
            if (searchQuery.trim()) params.search = searchQuery.trim()
            const result = await getAdminCandidates(params)
            setCandidates(result.data || [])
            setPagination({
                current_page: Number(result.current_page || 1),
                last_page: Number(result.last_page || 1)
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { loadCandidates() }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        loadCandidates(1)
    }

    return (
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Registered Candidates</h1>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>View and manage users registered on the platform.</p>
                </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} style={{ maxWidth: 500, marginBottom: 24, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    placeholder="Search candidates by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px 12px 40px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                />
            </form>

            {isLoading ? (
                <SkeletonDashboard statCount={0} rowCount={8} cols={4} />
            ) : candidates.length === 0 ? (
                <div style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--surface-2)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <Users size={40} style={{ color: 'var(--text-secondary)', marginBottom: 16, opacity: 0.5 }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>No candidates found.</p>
                </div>
            ) : (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                                    {['Candidate Details', 'Contact Information', 'Joined Date', 'Status'].map((h) => (
                                        <th key={h} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 200ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
                                                    {candidate.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{candidate.name}</p>
                                                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono,monospace' }}>ID: {candidate.id.split('-')[0]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-primary)' }}>
                                                    <Mail size={12} style={{ color: 'var(--text-secondary)' }} /> {candidate.email}
                                                </div>
                                                {candidate.phone && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                                                        <Phone size={12} /> {candidate.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                                                <Calendar size={13} />
                                                {new Date(candidate.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 4, padding: '2px 8px' }}>Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px 20px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                            <button
                                onClick={() => {
                                    if (pagination.current_page > 1 && !isLoading) {
                                        loadCandidates(pagination.current_page - 1);
                                        window.scrollTo({ top: 0, behavior: 'auto' });
                                    }
                                }}
                                disabled={pagination.current_page <= 1 || isLoading}
                                style={{
                                    padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                                    cursor: (pagination.current_page <= 1 || isLoading) ? 'not-allowed' : 'pointer', opacity: (pagination.current_page <= 1 || isLoading) ? 0.4 : 1, display: 'flex', alignItems: 'center'
                                }}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono,monospace' }}>{pagination.current_page}</span>
                                <span style={{ fontSize: 13, color: 'var(--text-secondary)', opacity: 0.5 }}>/</span>
                                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono,monospace' }}>{pagination.last_page}</span>
                            </div>
                            <button
                                onClick={() => {
                                    if (pagination.current_page < pagination.last_page && !isLoading) {
                                        loadCandidates(pagination.current_page + 1);
                                        window.scrollTo({ top: 0, behavior: 'auto' });
                                    }
                                }}
                                disabled={pagination.current_page >= pagination.last_page || isLoading}
                                style={{
                                    padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                                    cursor: (pagination.current_page >= pagination.last_page || isLoading) ? 'not-allowed' : 'pointer', opacity: (pagination.current_page >= pagination.last_page || isLoading) ? 0.4 : 1, display: 'flex', alignItems: 'center'
                                }}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminCandidates
