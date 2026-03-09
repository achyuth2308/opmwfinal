import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAdminDashboard } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'
import { STATUS_COLORS } from '@/components/admin/AdminSidebar'

const AdminDashboard = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getAdminDashboard()
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
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                    Admin Dashboard
                </h1>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Overview of OPMW platform activity.</p>
            </div>

            {isLoading ? (
                <SkeletonDashboard statCount={5} rowCount={6} cols={4} />
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
                            { label: 'Demo Requests', value: data.unread_demo_requests, color: '#6EE7FA' },
                            { label: 'Unread Contacts', value: data.unread_contacts, color: '#f87171' },
                        ].map((card) => (
                            <div key={card.label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
                                <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>{card.label}</p>
                                <p style={{ fontSize: 32, fontWeight: 700, color: card.color, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '-0.02em' }}>{card.value}</p>
                            </div>
                        ))}
                    </div>


                    {/* Recent applications */}
                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Recent Applications</h2>
                            <Link to="/admin/applications" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>View all</Link>
                        </div>
                        {data.recent_applications && data.recent_applications.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['Applicant', 'Role', 'Status', 'Date'].map((h) => (
                                                <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>{h}</th>
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
                                                        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.applicant_email}</p>
                                                    </td>
                                                    <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--text-secondary)' }}>{app.role}</td>
                                                    <td style={{ padding: '14px 24px' }}>
                                                        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px' }}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 24px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono,monospace' }}>
                                                        {new Date(app.created_at).toLocaleDateString('en-IN')}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>No applications yet.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminDashboard
