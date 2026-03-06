import apiClient from './api'

export const submitApplication = async (formData) => {
    const token = localStorage.getItem('opmw-token')
    return apiClient.post('apply', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    })
}
