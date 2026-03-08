import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Menu, Mail, Clock } from 'lucide-react'
import { AdminSidebar } from './AdminDashboard'
import { getAdminContacts, markContactAsRead } from '@/services/admin.service'
import { SkeletonDashboard } from '@/components/shared/Skeleton'

const AdminContacts = () => {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState(null)

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact)
        if (!contact.is_read) {
            try {
                await markContactAsRead(contact.id)
                // Update local state to show it's read immediately
                setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, is_read: true } : c))
            } catch (err) {
                console.error('Failed to mark contact as read:', err)
            }
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getAdminContacts()
                setContacts(Array.isArray(result) ? result : [])
            } catch (err) {
                // Error handled by apiClient interceptor
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
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Contacts</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>Contact Submissions</h1>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>Messages received from the website contact form.</p>

                    {isLoading ? (
                        <SkeletonDashboard statCount={0} rowCount={6} cols={3} />
                    ) : contacts.length === 0 ? (
                        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>No contact submissions yet.</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => handleSelectContact(contact)}
                                    style={{
                                        background: 'var(--surface-2)',
                                        border: `1px solid ${contact.is_read ? 'var(--border)' : 'rgba(110,231,250,0.2)'}`,
                                        borderRadius: 12,
                                        padding: '20px 24px',
                                        cursor: 'pointer',
                                        transition: 'all 200ms ease',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(110,231,250,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = contact.is_read ? 'var(--border)' : 'rgba(110,231,250,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    {!contact.is_read && (
                                        <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Mail size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.name}</p>
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.email}</p>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 6 }}>{contact.subject}</p>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{contact.message}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
                                        <Clock size={11} style={{ color: 'var(--text-secondary)' }} />
                                        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-secondary)' }}>
                                            {new Date(contact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Contact detail modal */}
            {selectedContact && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedContact(null)} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 520, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)', maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Contact Message</h3>
                            <button onClick={() => setSelectedContact(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={14} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'Name', value: selectedContact.name },
                                { label: 'Email', value: selectedContact.email, isLink: true },
                                { label: 'Subject', value: selectedContact.subject },
                                { label: 'Received', value: new Date(selectedContact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 4 }}>{item.label}</p>
                                    {item.isLink ? (
                                        <a href={`mailto:${item.value}`} style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none' }}>{item.value}</a>
                                    ) : (
                                        <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{item.value}</p>
                                    )}
                                </div>
                            ))}
                            <div>
                                <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 4 }}>Message</p>
                                <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                            <a
                                href={`mailto:${selectedContact.email}?subject=RE: ${encodeURIComponent(selectedContact.subject)}&body=${encodeURIComponent(`\n\n\n--- Original Message from ${selectedContact.name} ---\n${selectedContact.message}`)}`}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: 10,
                                    background: 'rgba(110,231,250,0.1)',
                                    border: '1px solid rgba(110,231,250,0.25)',
                                    color: 'var(--accent)',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    transition: 'all 200ms ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(110,231,250,0.18)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(110,231,250,0.1)'}
                            >
                                <Mail size={15} /> Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style>{`@media(max-width:768px) { .admin-mobile-topbar { display: flex !important; } }`}</style>
        </div>
    )
}

export default AdminContacts

