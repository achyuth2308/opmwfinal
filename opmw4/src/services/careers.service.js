import apiClient from './api'

export const submitApplication = async (formData) => {
    return apiClient.post('apply', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
