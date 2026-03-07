import { useState, useCallback } from 'react'
import { useToast } from '@/context/ToastContext'

const useFormSubmit = (submitFn, { onSuccess, onError, resetOnSuccess = true } = {}) => {
    const { addToast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    const handleSubmit = useCallback(
        async (data, formReset) => {
            setIsLoading(true)
            setError(null)
            setSuccess(false)
            setFieldErrors({})

            try {
                const result = await submitFn(data)
                setSuccess(true)

                // Show success toast - prefer result.message from backend response
                addToast(result.message || result.data?.message || 'Form submitted successfully!', 'success')

                if (resetOnSuccess && formReset) {
                    formReset()
                }
                if (onSuccess) {
                    onSuccess(result)
                }
            } catch (err) {
                const errorMessage = err.message || 'Something went wrong. Please try again.'

                if (err.type === 'validation' && err.fieldErrors) {
                    setFieldErrors(err.fieldErrors)
                    setError(err.message || 'Please fix the errors below.')
                    addToast('Please check the form for errors.', 'error')
                } else {
                    setError(errorMessage)
                    addToast(errorMessage, 'error')
                }
                if (onError) {
                    onError(err)
                }
            } finally {
                setIsLoading(false)
            }
        },
        [submitFn, onSuccess, onError, resetOnSuccess, addToast]
    )

    return { handleSubmit, isLoading, error, success, fieldErrors }
}

export default useFormSubmit

