import apiClient from './api'

export const submitContactForm = async (data) => {
    const payload = {
        name: data.name,
        email: data.email,
        subject: data.service_interest || data.subject || 'General Inquiry',
        message: data.message,
    }
    return apiClient.post('/contact', payload)
}
