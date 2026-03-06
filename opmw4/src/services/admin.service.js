import apiClient from './api'

const API_BASE = import.meta.env.VITE_API_URL || 'http://opmwfinal.onrender.com'

/**
 * Admin Auth
 */
export const adminLogin = async (email, password) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw { message: data.message || data.errors?.email?.[0] || 'Login failed.', status: res.status }
    return data
}

export const adminLogout = async (token) => {
    await fetch(`${API_BASE}/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
}

/**
 * Admin Dashboard
 */
export const getAdminDashboard = async (token) => {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load dashboard.', status: res.status }
    return res.json()
}

/**
 * Admin Applications
 */
export const getAdminApplications = async (token, params = {}) => {
    const qs = new URLSearchParams()
    if (params.status) qs.set('status', params.status)
    if (params.search) qs.set('search', params.search)
    if (params.page) qs.set('page', params.page)
    const res = await fetch(`${API_BASE}/admin/applications?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load applications.', status: res.status }
    return res.json()
}

export const getAdminApplication = async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load application.', status: res.status }
    return res.json()
}

export const updateApplicationStatus = async (token, id, status, admin_notes = '') => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: JSON.stringify({ status, admin_notes }),
    })
    if (!res.ok) throw { message: 'Failed to update status.', status: res.status }
    return res.json()
}

/**
 * Admin Candidates
 */
export const getAdminCandidates = async (token, params = {}) => {
    const qs = new URLSearchParams()
    if (params.search) qs.set('search', params.search)
    if (params.page) qs.set('page', params.page)
    const res = await fetch(`${API_BASE}/admin/candidates?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load candidates.', status: res.status }
    return res.json()
}

export const getAdminCandidate = async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/candidates/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load candidate.', status: res.status }
    return res.json()
}

/**
 * Admin Contacts
 */
export const getAdminContacts = async (token) => {
    const res = await fetch(`${API_BASE}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load contacts.', status: res.status }
    return res.json()
}
/**
 * Admin Jobs
 */
export const getAdminJobs = async (token) => {
    const res = await fetch(`${API_BASE}/admin/jobs`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to load jobs.', status: res.status }
    return res.json()
}

export const createAdminJob = async (token, jobData) => {
    const res = await fetch(`${API_BASE}/admin/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: JSON.stringify(jobData),
    })
    if (!res.ok) throw { message: 'Failed to create job.', status: res.status }
    return res.json()
}

export const updateAdminJob = async (token, id, jobData) => {
    const res = await fetch(`${API_BASE}/admin/jobs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        body: JSON.stringify(jobData),
    })
    if (!res.ok) throw { message: 'Failed to update job.', status: res.status }
    return res.json()
}

export const deleteAdminJob = async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
    if (!res.ok) throw { message: 'Failed to delete job.', status: res.status }
    return true
}


