import apiClient from './api'

/**
 * Admin Auth
 */
export const adminLogin = async (email, password) => {
    return apiClient.post('admin/login', { email, password })
}

export const adminLogout = async () => {
    return apiClient.post('admin/logout')
}

/**
 * Admin Dashboard
 */
export const getAdminDashboard = async () => {
    return apiClient.get('admin/dashboard')
}

/**
 * Admin Applications
 */
export const getAdminApplications = async (params = {}) => {
    return apiClient.get('admin/applications', { params })
}

export const getAdminApplication = async (id) => {
    return apiClient.get(`admin/applications/${id}`)
}

export const updateApplicationStatus = async (id, status, admin_notes = '') => {
    return apiClient.patch(`admin/applications/${id}/status`, { status, admin_notes })
}

/**
 * Admin Candidates
 */
export const getAdminCandidates = async (params = {}) => {
    return apiClient.get('admin/candidates', { params })
}

export const getAdminCandidate = async (id) => {
    return apiClient.get(`admin/candidates/${id}`)
}

/**
 * Admin Contacts
 */
export const getAdminContacts = async () => {
    return apiClient.get('admin/contacts')
}

export const markContactAsRead = async (id) => {
    return apiClient.patch(`admin/contacts/${id}/read`)
}

/**
 * Admin Jobs
 */
export const getAdminJobs = async () => {
    return apiClient.get('admin/jobs')
}

export const createAdminJob = async (jobData) => {
    return apiClient.post('admin/jobs', jobData)
}

export const updateAdminJob = async (id, jobData) => {
    return apiClient.patch(`admin/jobs/${id}`, jobData)
}

export const deleteAdminJob = async (id) => {
    return apiClient.delete(`admin/jobs/${id}`)
}
