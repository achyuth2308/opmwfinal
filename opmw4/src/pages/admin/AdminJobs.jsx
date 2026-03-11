import { useState, useEffect } from 'react'
import { Plus, Trash2, X, MapPin, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAdminJobs, createAdminJob, deleteAdminJob } from '@/services/admin.service'
import { SkeletonCareerGrid } from '@/components/shared/Skeleton'

const AdminJobs = () => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 })

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        department: 'BPO',
        type: 'Full-time',
        experience: '02 years',
        cities: [],
        description: ''
    })
    const [cityInput, setCityInput] = useState('')

    const loadJobs = async (page = 1) => {
        if (isLoading && page !== 1) return
        setIsLoading(true)
        try {
            const result = await getAdminJobs({ page: Number(page) })
            if (result.data) {
                setJobs(result.data)
                setPagination({
                    current_page: Number(result.current_page || 1),
                    last_page: Number(result.last_page || 1)
                })
            } else {
                setJobs(Array.isArray(result) ? result : [])
                setPagination({ current_page: 1, last_page: 1 })
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { loadJobs() }, [])

    const handleAddCity = (e) => {
        if (e.key === 'Enter' && cityInput.trim()) {
            e.preventDefault()
            const newCities = cityInput.split(',').map(c => c.trim()).filter(c => c !== '' && !formData.cities.includes(c))
            if (newCities.length > 0) {
                setFormData({ ...formData, cities: [...formData.cities, ...newCities] })
            }
            setCityInput('')
        }
    }

    const removeCity = (city) => {
        setFormData({ ...formData, cities: formData.cities.filter(c => c !== city) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let currentCities = [...formData.cities]
        if (cityInput.trim()) {
            const pendingCities = cityInput.split(',').map(c => c.trim()).filter(c => c !== '' && !currentCities.includes(c))
            currentCities = [...currentCities, ...pendingCities]
        }
        if (currentCities.length === 0) { alert('Please add at least one city'); return }

        setIsSubmitting(true)
        try {
            await createAdminJob({ ...formData, cities: currentCities })
            setShowAddForm(false)
            setFormData({ title: '', department: 'BPO', type: 'Full-time', experience: '02 years', cities: [], description: '' })
            setCityInput('')
            loadJobs()
        } catch (err) {
            alert(err.message || 'Failed to create job')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return
        try {
            await deleteAdminJob(id)
            loadJobs()
        } catch (err) {
            alert(err.message || 'Failed to delete job')
        }
    }

    return (
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Job Management</h1>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Create and manage job listings for your company.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, background: 'rgba(110,231,250,0.1)', border: '1px solid rgba(110,231,250,0.25)', color: 'var(--accent)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                >
                    <Plus size={18} /> Add New Job
                </button>
            </div>

            {isLoading ? (
                <SkeletonCareerGrid count={4} />
            ) : jobs.length === 0 ? (
                <div style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--surface-2)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <Briefcase size={40} style={{ color: 'var(--text-secondary)', marginBottom: 16, opacity: 0.5 }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 20 }}>No jobs listed yet. Start by adding one!</p>
                    <button onClick={() => setShowAddForm(true)} style={{ padding: '10px 24px', borderRadius: 8, background: 'var(--accent)', color: '#000', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add First Job</button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                        {jobs.map((job) => (
                            <div key={job.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(110,231,250,0.08)', padding: '2px 8px', borderRadius: 4, marginBottom: 8, display: 'inline-block' }}>{job.department}</span>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{job.title}</h3>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{job.type} • {job.experience}</p>
                                    </div>
                                    <button onClick={() => handleDelete(job.id)} style={{ padding: 8, borderRadius: 8, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', cursor: 'pointer' }} title="Delete Job">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {job.cities.map(city => (
                                        <span key={city} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6, border: '1px solid var(--border)' }}>
                                            <MapPin size={10} /> {city}
                                        </span>
                                    ))}
                                </div>

                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px 20px', marginTop: 20 }}>
                            <button
                                onClick={() => {
                                    if (pagination.current_page > 1 && !isLoading) {
                                        loadJobs(pagination.current_page - 1);
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
                                        loadJobs(pagination.current_page + 1);
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
                </>
            )}

            {showAddForm && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={() => setShowAddForm(false)} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 540, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)', overflowY: 'auto', maxHeight: '90vh' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Add New Job</h2>
                            <button onClick={() => setShowAddForm(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>Job Title</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Web Developer (Full Stack)" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>Department</label>
                                    <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}>
                                        {['BPO', 'IT', 'HR', 'Operations', 'Finance', 'Marketing'].map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>Experience</label>
                                    <input required type="text" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} placeholder="e.g. 0–2 years" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>Cities (Add multiple with commas or Enter)</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                    {formData.cities.map(city => (
                                        <span key={city} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', background: 'rgba(110,231,250,0.08)', padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(110,231,250,0.2)' }}>
                                            {city}
                                            <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeCity(city)} />
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={cityInput}
                                    onChange={e => setCityInput(e.target.value)}
                                    onKeyDown={handleAddCity}
                                    placeholder="e.g. Hyderabad, Chennai"
                                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>Description</label>
                                <textarea required rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Job description and requirements..." style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <button type="button" onClick={() => setShowAddForm(false)} style={{ flex: 1, padding: '14px', borderRadius: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '14px', borderRadius: 12, background: 'var(--accent)', border: 'none', color: '#000', fontSize: 15, fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                                    {isSubmitting ? 'Creating...' : 'Create Job Listing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminJobs
