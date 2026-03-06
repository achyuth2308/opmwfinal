import apiClient from './api'

export const requestDemo = async (data) => {
    const payload = {
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone,
        employee_count: data.employee_count,
        message: data.message,
    }
    return apiClient.post('demo/request', payload)
}

