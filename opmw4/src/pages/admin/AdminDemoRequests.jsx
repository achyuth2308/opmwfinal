import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Menu, Monitor, Clock, Building, User, Phone, Mail, Users } from 'lucide-react'
import { AdminSidebar } from './AdminDashboard'
import { getAdminDemoRequests, markDemoRequestAsRead } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const AdminDemoRequests = () => {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null)

    const handleSelectRequest = async (request) => {
        setSelectedRequest(request)
        if (!request.is_read) {
            try {
                await markDemoRequestAsRead(request.id)
                // Update local state to show it's read immediately
                setRequests(prev => prev.map(r => r.id === request.id ? { ...r, is_read: true } : r))
            } catch (err) {
                console.error('Failed to mark demo request as read:', err)
            }
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getAdminDemoRequests()
                setRequests(Array.isArray(result) ? result : [])
            } catch (err) {
                console.error(err)
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
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="admin-mobile-topbar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Demo Requests</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <div style={{ marginBottom: 32 }}>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>Demo Requests</h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Manage requests for OPMW HRMS platform demonstrations.</p>
                    </div>

                    {isLoading ? (
                        <SkeletonDashboard statCount={0} rowCount={6} cols={3} />
                    ) : requests.length === 0 ? (
                        <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>No demo requests yet.</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    onClick={() => handleSelectRequest(request)}
                                    style={{
                                        background: 'var(--surface-2)',
                                        border: `1px solid ${request.is_read ? 'var(--border)' : 'rgba(110,231,250,0.2)'}`,
                                        borderRadius: 12,
                                        padding: '24px',
                                        cursor: 'pointer',
                                        transition: 'all 200ms ease',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(110,231,250,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = request.is_read ? 'var(--border)' : 'rgba(110,231,250,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    {!request.is_read && (
                                        <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                                    )}

                                    <div style={{ marginBottom: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <Building size={14} style={{ color: 'var(--accent)' }} />
                                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{request.company_name}</h3>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <User size={13} style={{ color: 'var(--text-muted)' }} />
                                            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{request.contact_name}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px solid var(--border)' }}>
                                            <Users size={12} style={{ color: 'var(--accent)' }} />
                                            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{request.employee_count} employees</span>
                                        </div>
                                    </div>

                                    {request.message && (
                                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            "{request.message}"
                                        </p>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                                        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-muted)' }}>
                                            {new Date(request.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Request detail modal */}
            {selectedRequest && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedRequest(null)} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 580, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', maxHeight: '85vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(110,231,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Monitor size={20} style={{ color: 'var(--accent)' }} />
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Demo Request Details</h3>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={14} /></button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                            {[
                                { label: 'Company Name', value: selectedRequest.company_name, icon: <Building size={13} /> },
                                { label: 'Contact Name', value: selectedRequest.contact_name, icon: <User size={13} /> },
                                { label: 'Work Email', value: selectedRequest.email, icon: <Mail size={13} />, isLink: `mailto:${selectedRequest.email}` },
                                { label: 'Phone', value: selectedRequest.phone, icon: <Phone size={13} />, isLink: `tel:${selectedRequest.phone}` },
                                { label: 'Employee Count', value: selectedRequest.employee_count, icon: <Users size={13} /> },
                                { label: 'Submitted On', value: new Date(selectedRequest.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }), icon: <Clock size={13} /> },
                            ].map((item) => (
                                <div key={item.label} style={{ gridColumn: item.label === 'Submitted On' ? 'span 2' : 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                                        <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.label}</p>
                                    </div>
                                    {item.isLink ? (
                                        <a href={item.isLink} style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}>{item.value}</a>
                                    ) : (
                                        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {selectedRequest.message && (
                            <div style={{ marginBottom: 24 }}>
                                <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Requirements / Message</p>
                                <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                    {selectedRequest.message}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 12 }}>
                            <a
                                href={`mailto:${selectedRequest.email}?subject=Demo Request: OPMW HRMS&body=Hello ${selectedRequest.contact_name},%0D%0A%0D%0AThank you for requesting a demo of OPMW HRMS for ${selectedRequest.company_name}.%0D%0A%0D%0AWe would love to schedule a session with you.`}
                                style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 10, background: 'var(--accent)', color: '#000', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 200ms ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                Schedule Demo
                            </a>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                style={{ flex: 1, padding: '12px 0', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`@media(max-width:768px) { .admin-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default AdminDemoRequests
