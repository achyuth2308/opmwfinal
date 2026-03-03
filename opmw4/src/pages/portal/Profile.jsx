import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, User, LogOut, Menu, X, Camera, Upload, Lock, Save, CheckCircle2, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const CITIES = ['Chennai', 'Hyderabad', 'Bangalore', 'Noida', 'Indore']

const fieldStyle = {
    width: '100%',
    padding: '11px 13px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: 'Inter, system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 200ms ease',
    boxSizing: 'border-box',
}

const NAV_ITEMS = [
    { path: '/portal', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/portal/applications', label: 'My Applications', icon: FileText },
    { path: '/portal/profile', label: 'My Profile', icon: User },
]

const PortalNav = ({ mobileOpen, setMobileOpen }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const loc = window.location.pathname

    const handleLogout = async () => {
        try {
            const tk = localStorage.getItem('opmw-token')
            await fetch(`${API_BASE}/logout`, { method: 'POST', headers: { Authorization: `Bearer ${tk}`, Accept: 'application/json' } })
        } catch { /* ignore */ }
        logout()
        navigate('/login')
    }

    const sidebarContent = (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>OP</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>OPMW</span>
            </Link>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(110,231,250,0.1)', border: '1.5px solid rgba(110,231,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', marginBottom: 8 }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{user?.name || 'Candidate'}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>
            <nav style={{ flex: 1, padding: '8px' }}>
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                    const active = loc === path
                    return (
                        <Link key={path} to={path} onClick={() => setMobileOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500, color: active ? 'var(--accent)' : 'var(--text-secondary)', background: active ? 'rgba(110,231,250,0.08)' : 'transparent', marginBottom: 2, transition: 'all 200ms ease' }}
                            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' } }}>
                            <Icon size={15} />{label}
                        </Link>
                    )
                })}
            </nav>
            <div style={{ padding: '8px', borderTop: '1px solid var(--border)' }}>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', transition: 'all 200ms ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}>
                    <LogOut size={15} />Logout
                </button>
            </div>
        </div>
    )

    return (
        <>
            <aside style={{ width: 230, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }} className="portal-sidebar-desk">{sidebarContent}</aside>
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
                    <aside style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 250, background: 'var(--surface-2)', borderRight: '1px solid var(--border)', overflowY: 'auto' }}>{sidebarContent}</aside>
                </div>
            )}
            <style>{`@media(min-width:769px){.portal-sidebar-desk{display:flex!important;flex-direction:column}}@media(max-width:768px){.portal-sidebar-desk{display:none!important}}`}</style>
        </>
    )
}

const SectionCard = ({ children, style }) => (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, ...style }}>{children}</div>
)

const Profile = () => {
    const { user, token, login } = useAuth()
    const photoInputRef = useRef(null)
    const resumeInputRef = useRef(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '', city: user?.city || '' })
    const [photoPreview, setPhotoPreview] = useState(user?.profile_photo ? `${API_BASE.replace('/api', '')}/storage/${user.profile_photo}` : null)
    const [resumeName, setResumeName] = useState(user?.resume_path ? user.resume_path.split('/').pop() : null)

    const [profileSaving, setProfileSaving] = useState(false)
    const [profileSuccess, setProfileSuccess] = useState(false)
    const [profileError, setProfileError] = useState('')

    const [pwForm, setPwForm] = useState({ current_password: '', password: '', password_confirmation: '' })
    const [pwSaving, setPwSaving] = useState(false)
    const [pwSuccess, setPwSuccess] = useState(false)
    const [pwError, setPwError] = useState('')

    const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' }

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfileForm((prev) => ({ ...prev, [name]: value }))
        setProfileError('')
    }

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setProfileSaving(true)
        setProfileError('')
        setProfileSuccess(false)
        try {
            const res = await fetch(`${API_BASE}/profile`, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(profileForm),
            })
            const data = await res.json()
            if (!res.ok) { setProfileError(data.message || 'Failed to save changes.'); return }
            login(data, token)
            setProfileSuccess(true)
            setTimeout(() => setProfileSuccess(false), 3000)
        } catch { setProfileError('Network error.') } finally { setProfileSaving(false) }
    }

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        const form = new FormData()
        form.append('photo', file)
        try {
            const res = await fetch(`${API_BASE}/profile/photo`, { method: 'POST', headers, body: form })
            const data = await res.json()
            if (res.ok && data.path) login({ ...user, profile_photo: data.path }, token)
        } catch { /* ignore */ }
    }

    const handleResumeChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setResumeName(file.name)
        const form = new FormData()
        form.append('resume', file)
        try {
            const res = await fetch(`${API_BASE}/profile/resume`, { method: 'POST', headers, body: form })
            const data = await res.json()
            if (res.ok && data.path) login({ ...user, resume_path: data.path }, token)
        } catch { /* ignore */ }
    }

    const handlePwChange = (e) => {
        const { name, value } = e.target
        setPwForm((prev) => ({ ...prev, [name]: value }))
        setPwError('')
    }

    const handlePwSave = async (e) => {
        e.preventDefault()
        if (pwForm.password !== pwForm.password_confirmation) { setPwError('Passwords do not match.'); return }
        setPwSaving(true)
        setPwError('')
        setPwSuccess(false)
        try {
            const res = await fetch(`${API_BASE}/profile/password`, {
                method: 'PATCH',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(pwForm),
            })
            const data = await res.json()
            if (!res.ok) { setPwError(data.message || 'Failed to change password.'); return }
            setPwSuccess(true)
            setPwForm({ current_password: '', password: '', password_confirmation: '' })
            setTimeout(() => setPwSuccess(false), 3000)
        } catch { setPwError('Network error.') } finally { setPwSaving(false) }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <PortalNav mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }} className="profile-mobile-bar">
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>My Profile</span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>
                    <div>
                        <h1 style={{ fontSize: 'clamp(20px, 2.8vw, 28px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>My Profile</h1>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Manage your personal information and resume.</p>
                    </div>

                    {/* Profile info */}
                    <SectionCard>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <User size={16} style={{ color: 'var(--accent)' }} />
                            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Profile Information</h2>
                        </div>
                        <div style={{ padding: 24 }}>
                            {/* Profile photo */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(110,231,250,0.1)', border: '2px solid rgba(110,231,250,0.2)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => photoInputRef.current?.click()}
                                        style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--surface-1)', border: '1.5px solid rgba(110,231,250,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Change photo"
                                    >
                                        <Camera size={12} style={{ color: 'var(--accent)' }} />
                                    </button>
                                    <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{user?.name}</p>
                                    <button onClick={() => photoInputRef.current?.click()} style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                                        Change photo
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Full Name</label>
                                        <input name="name" type="text" value={profileForm.name} onChange={handleProfileChange} style={fieldStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Email (read-only)</label>
                                        <input type="email" value={user?.email || ''} readOnly style={{ ...fieldStyle, opacity: 0.5, cursor: 'not-allowed' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Phone</label>
                                        <input name="phone" type="tel" value={profileForm.phone} onChange={handleProfileChange} style={fieldStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>City</label>
                                        <select name="city" value={profileForm.city} onChange={handleProfileChange} style={fieldStyle} onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }}>
                                            <option value="">Select city</option>
                                            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Resume upload */}
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Resume (PDF)</label>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                        <button type="button" onClick={() => resumeInputRef.current?.click()}
                                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', transition: 'all 200ms ease' }}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(110,231,250,0.3)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                                            <Upload size={14} /> Upload Resume
                                        </button>
                                        {resumeName && <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'JetBrains Mono,monospace' }}>{resumeName}</span>}
                                        <input ref={resumeInputRef} type="file" accept=".pdf" onChange={handleResumeChange} style={{ display: 'none' }} />
                                    </div>
                                </div>

                                {profileError && <p style={{ fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>{profileError}</p>}

                                <button type="submit" disabled={profileSaving}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.3)', color: profileSuccess ? '#4ade80' : 'var(--accent)', fontSize: 14, fontWeight: 600, cursor: profileSaving ? 'not-allowed' : 'pointer', transition: 'all 200ms ease', opacity: profileSaving ? 0.7 : 1, alignSelf: 'flex-start' }}
                                    onMouseEnter={(e) => { if (!profileSaving) e.currentTarget.style.background = 'rgba(110,231,250,0.18)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.1)' }}>
                                    {profileSaving ? <><Loader2 size={15} className="spin" /> Saving…</> : profileSuccess ? <><CheckCircle2 size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
                                </button>
                            </form>
                        </div>
                    </SectionCard>

                    {/* Password change */}
                    <SectionCard>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Lock size={16} style={{ color: 'var(--accent)' }} />
                            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Account Security</h2>
                        </div>
                        <div style={{ padding: 24 }}>
                            <form onSubmit={handlePwSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {['current_password', 'password', 'password_confirmation'].map((field) => {
                                    const labels = { current_password: 'Current Password', password: 'New Password', password_confirmation: 'Confirm New Password' }
                                    return (
                                        <div key={field}>
                                            <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{labels[field]}</label>
                                            <input name={field} type="password" value={pwForm[field]} onChange={handlePwChange} placeholder="••••••••"
                                                style={{ ...fieldStyle, maxWidth: 360 }}
                                                onFocus={(e) => { e.target.style.borderColor = 'rgba(110,231,250,0.4)' }}
                                                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)' }} />
                                        </div>
                                    )
                                })}
                                {pwError && <p style={{ fontSize: 13, color: 'rgba(248,113,113,0.9)' }}>{pwError}</p>}
                                <button type="submit" disabled={pwSaving}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.3)', color: pwSuccess ? '#4ade80' : 'var(--accent)', fontSize: 14, fontWeight: 600, cursor: pwSaving ? 'not-allowed' : 'pointer', transition: 'all 200ms ease', opacity: pwSaving ? 0.7 : 1, alignSelf: 'flex-start' }}
                                    onMouseEnter={(e) => { if (!pwSaving) e.currentTarget.style.background = 'rgba(110,231,250,0.18)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(110,231,250,0.1)' }}>
                                    {pwSaving ? <><Loader2 size={15} className="spin" /> Saving…</> : pwSuccess ? <><CheckCircle2 size={15} /> Updated!</> : <><Lock size={15} /> Change Password</>}
                                </button>
                            </form>
                        </div>
                    </SectionCard>
                </div>
            </main>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin 0.9s linear infinite}@media(max-width:768px){.profile-mobile-bar{display:flex!important}}`}</style>
        </div>
    )
}

export default Profile
