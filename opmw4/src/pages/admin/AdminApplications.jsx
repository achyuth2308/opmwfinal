import { useState, useEffect } from 'react'
import { FileText, Search, Filter, ChevronRight, ChevronLeft, Trash2, Eye, Mail, Phone, Download, Clock } from 'lucide-react'
import { getAdminApplications, updateApplicationStatus, addAdminNote, deleteAdminApplication } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'
import { STATUS_COLORS } from '@/components/admin/AdminSidebar'

const AdminApplications = () => {
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 })
    const [selectedApplication, setSelectedApplication] = useState(null)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
    const [adminNotes, setAdminNotes] = useState('')

    const loadApplications = async (page = 1) => {
        if (isLoading && page !== 1) return; // Prevent redundant clicks, unless it's a reset load
        setIsLoading(true)
        try {
            const params = { page: Number(page) }
            if (statusFilter !== 'All') params.status = statusFilter
            if (searchQuery.trim()) params.search = searchQuery.trim()
            const result = await getAdminApplications(params)
            setApplications(result.data || [])
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

    useEffect(() => { loadApplications() }, [statusFilter])

    const handleSearch = (e) => { e.preventDefault(); loadApplications(1) }

    const handleStatusUpdate = async (id, newStatus) => {
        setIsUpdatingStatus(true)
        try {
            await updateApplicationStatus(id, newStatus)
            loadApplications(pagination.current_page)
        } catch (err) {
            alert('Failed to update status')
        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const handleAddNote = async (e) => {
        e.preventDefault()
        if (!adminNotes.trim()) return
        try {
            await addAdminNote(selectedApplication.id, adminNotes)
            // Update local state is faster
            const updatedApps = applications.map(app =>
                app.id === selectedApplication.id
                    ? { ...app, admin_notes: adminNotes }
                    : app
            )
            setApplications(updatedApps)
            setSelectedApplication({ ...selectedApplication, admin_notes: adminNotes })
            setAdminNotes('')
        } catch (err) {
            alert('Failed to add note')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application? This cannot be undone.')) return
        try {
            await deleteAdminApplication(id)
            loadApplications(pagination.current_page)
            if (selectedApplication?.id === id) setSelectedApplication(null)
        } catch (err) {
            alert('Failed to delete')
        }
    }

    return (
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Job Applications</h1>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Review and manage candidate applications.</p>
                </div>
            </div>

            {/* Filter bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                <form onSubmit={handleSearch} style={{ flex: 1, minWidth: 280, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search by name, role or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px 12px 40px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                    />
                </form>
                <div style={{ display: 'flex', gap: 8 }}>
                    {['All', 'Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Selected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            style={{
                                padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                                background: statusFilter === status ? 'rgba(110,231,250,0.1)' : 'var(--surface-2)',
                                border: `1px solid ${statusFilter === status ? 'var(--accent)' : 'var(--border)'}`,
                                color: statusFilter === status ? 'var(--accent)' : 'var(--text-secondary)',
                                transition: 'all 200ms ease'
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <SkeletonDashboard statCount={0} rowCount={8} cols={4} />
            ) : applications.length === 0 ? (
                <div style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--surface-2)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <FileText size={40} style={{ color: 'var(--text-secondary)', marginBottom: 16, opacity: 0.5 }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>No applications found matching your criteria.</p>
                </div>
            ) : (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                                    {['Candidate', 'Applied For', 'Status', 'Date', 'Actions'].map((h) => (
                                        <th key={h} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => {
                                    const c = STATUS_COLORS[app.status] || STATUS_COLORS.Pending
                                    return (
                                        <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 200ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{app.applicant_name}</span>
                                                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.applicant_email}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{app.role}</span>
                                                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{app.experience} EXP</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: '2px 8px' }}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono,monospace' }}>
                                                {new Date(app.created_at).toLocaleDateString('en-IN')}
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', gap: 8 }}>
                                                    <button onClick={() => setSelectedApplication(app)} style={{ padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }} title="View Details"><Eye size={16} /></button>
                                                    <button onClick={() => handleDelete(app.id)} style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(248,113,113,0.15)', background: 'transparent', color: '#f87171', cursor: 'pointer' }} title="Delete"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px 20px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                            <button
                                onClick={() => {
                                    if (pagination.current_page > 1 && !isLoading) {
                                        loadApplications(pagination.current_page - 1);
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
                                        loadApplications(pagination.current_page + 1);
                                        window.scrollTo({ top: 0, behavior: 'auto' }); // Smooth might be confusing for repeated clicks
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

            {/* Application Detail Modal */}
            {selectedApplication && (
                <div style={{ position: 'fixed', inset: 0, zize: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedApplication(null)} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 720, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                        {/* Modal Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Application Details</h2>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>ID: #{selectedApplication.id.split('-')[0]}</p>
                            </div>
                            <button onClick={() => setSelectedApplication(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', padding: 8, borderRadius: 10, cursor: 'pointer', color: 'var(--text-secondary)' }}><ChevronRight style={{ transform: 'rotate(90deg)' }} size={20} /></button>
                        </div>

                        {/* Modal Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32, marginBottom: 40 }}>
                                <div>
                                    <h3 style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Applicant Information</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                                <FileText size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedApplication.applicant_name}</p>
                                                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Candidate</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <Mail size={14} style={{ color: 'var(--text-secondary)' }} />
                                            <a href={`mailto:${selectedApplication.applicant_email}`} style={{ fontSize: 14, color: 'var(--text-primary)', textDecoration: 'none' }}>{selectedApplication.applicant_email}</a>
                                        </div>
                                        {selectedApplication.phone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <Phone size={14} style={{ color: 'var(--text-secondary)' }} />
                                                <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{selectedApplication.phone}</p>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Applied on {new Date(selectedApplication.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Applied Role</h3>
                                    <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12 }}>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{selectedApplication.role}</p>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{selectedApplication.job_type} • {selectedApplication.experience} Experience</p>
                                        <a href={selectedApplication.resume_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.25)', borderRadius: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 600, textDecoration: 'none', width: 'fit-content' }}>
                                            <Download size={14} /> View Resume
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 32 }}>
                                <h3 style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Current Status</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Selected'].map(status => {
                                        const isActive = selectedApplication.status === status
                                        const c = STATUS_COLORS[status]
                                        return (
                                            <button
                                                key={status}
                                                disabled={isUpdatingStatus}
                                                onClick={() => handleStatusUpdate(selectedApplication.id, status)}
                                                style={{
                                                    padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                                    background: isActive ? c.bg : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid ${isActive ? c.border : 'var(--border)'}`,
                                                    color: isActive ? c.color : 'var(--text-secondary)',
                                                    transition: 'all 200ms ease',
                                                    opacity: isUpdatingStatus ? 0.6 : 1
                                                }}
                                            >
                                                {status}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Internal Admin Notes</h3>
                                <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder={selectedApplication.admin_notes || "Add internal notes about this candidate..."}
                                        style={{ width: '100%', minHeight: 100, padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 14, outline: 'none', resize: 'vertical' }}
                                    />
                                    <button type="submit" style={{ alignSelf: 'flex-end', padding: '10px 20px', background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                                        Save Notes
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminApplications
