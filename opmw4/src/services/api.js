import axios from 'axios'

const generateRequestId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const getBaseURL = () => {
    let url = import.meta.env.VITE_API_URL || 'https://opmwfinal.onrender.com'
    // Normalize: ensure exactly one trailing slash
    return url.replace(/\/+$/, '') + '/'
}

const apiClient = axios.create({
    baseURL: getBaseURL(),
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

apiClient.interceptors.request.use(
    (config) => {
        // --- Defensive URL Normalization ---
        // 1. Remove leading slash from the relative URL if present
        if (config.url.startsWith('/')) {
            config.url = config.url.substring(1)
        }

        // 2. Prevent "api/api" doubling
        // If baseURL ends with "/api/" and config.url starts with "api/", strip it from config.url
        if (config.baseURL.toLowerCase().endsWith('/api/') && config.url.toLowerCase().startsWith('api/')) {
            config.url = config.url.substring(4)
        }
        // ------------------------------------

        // Support both candidate and admin tokens
        const token = localStorage.getItem('opmw-token')
        const adminToken = localStorage.getItem('opmw-admin-token')

        // If it's an admin route, prioritize admin token
        if (config.url.includes('admin/') && adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else if (adminToken) {
            // Fallback to admin token if only that exists
            config.headers.Authorization = `Bearer ${adminToken}`
        }
        config.headers['X-Request-ID'] = generateRequestId()
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (!error.response) {
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                type: 'network',
            })
        }

        const { status, data } = error.response

        if (status === 401) {
            localStorage.removeItem('opmw-token')
            localStorage.removeItem('opmw-user')
            localStorage.removeItem('opmw-admin-token')
            localStorage.removeItem('opmw-admin')

            // Redirect based on current path
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/admin/login'
            } else {
                window.location.href = '/'
            }
            return Promise.reject({ message: 'Session expired. Please try again.', type: 'auth' })
        }

        if (status === 422) {
            const fieldErrors = {}
            if (data.errors) {
                Object.keys(data.errors).forEach((field) => {
                    fieldErrors[field] = Array.isArray(data.errors[field])
                        ? data.errors[field][0]
                        : data.errors[field]
                })
            }
            return Promise.reject({
                message: data.message || 'Validation failed.',
                type: 'validation',
                fieldErrors,
            })
        }

        if (status === 500) {
            return Promise.reject({
                message: 'An unexpected server error occurred. Please try again later.',
                type: 'server',
            })
        }

        return Promise.reject({
            message: data?.message || 'Something went wrong. Please try again.',
            type: 'error',
            status,
        })
    }
)

export default apiClient


