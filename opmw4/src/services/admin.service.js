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

export const updateApplicationStatus = async (id, status) => {
    return apiClient.patch(`admin/applications/${id}/status`, { status })
}

export const addAdminNote = async (id, admin_notes) => {
    return apiClient.patch(`admin/applications/${id}/notes`, { admin_notes })
}

export const deleteAdminApplication = async (id) => {
    return apiClient.delete(`admin/applications/${id}`)
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
export const getAdminContacts = async (params = {}) => {
    return apiClient.get('admin/contacts', { params })
}

export const markContactAsRead = async (id) => {
    return apiClient.patch(`admin/contacts/${id}/read`)
}

/**
 * Admin Jobs
 */
export const getAdminJobs = async (params = {}) => {
    return apiClient.get('admin/jobs', { params })
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

/**
 * Admin Demo Requests
 */
export const getAdminDemoRequests = async (params = {}) => {
    return apiClient.get('admin/demo-requests', { params })
}

export const markDemoRequestAsRead = async (id) => {
    return apiClient.patch(`admin/demo-requests/${id}/read`)
}
