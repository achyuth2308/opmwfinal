import apiClient from './api'

export const getOpenRoles = async (filters = {}) => {
    const params = {}
    if (filters.city && filters.city !== 'All') params.city = filters.city
    if (filters.department && filters.department !== 'All') params.department = filters.department
    return apiClient.get('/api/careers/roles', { params })
}

export const submitApplication = async (formData) => {
    return apiClient.post('/api/careers/apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}
