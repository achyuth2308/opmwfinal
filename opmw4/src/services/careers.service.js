import axios from 'axios'

// Build the apply URL once, guaranteeing no double /api/
const RAW_BASE = import.meta.env.VITE_API_URL || 'https://opmwfinal.onrender.com/api'
// Strip trailing slashes, then strip any trailing /api, then add /api/apply
const APPLY_URL = RAW_BASE.replace(/\/+$/, '').replace(/\/api$/, '') + '/api/apply'

export const submitApplication = async (formData) => {
    const token = localStorage.getItem('opmw-token')
    return axios.post(APPLY_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    })
}
