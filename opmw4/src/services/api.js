import axios from 'axios'

const generateRequestId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 12000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('opmw-token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
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
            window.location.href = '/'
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
