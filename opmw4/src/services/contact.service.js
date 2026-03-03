import apiClient from './api'

export const submitContactForm = async (data) => {
    const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        service_interest: data.service_interest,
        message: data.message,
    }
    return apiClient.post('/api/contact', payload)
}
