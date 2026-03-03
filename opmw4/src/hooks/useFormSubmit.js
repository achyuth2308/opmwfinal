import { useState, useCallback } from 'react'

const useFormSubmit = (submitFn, { onSuccess, onError, resetOnSuccess = true } = {}) => {
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
                if (resetOnSuccess && formReset) {
                    formReset()
                }
                if (onSuccess) {
                    onSuccess(result)
                }
            } catch (err) {
                if (err.type === 'validation' && err.fieldErrors) {
                    setFieldErrors(err.fieldErrors)
                    setError(err.message || 'Please fix the errors below.')
                } else {
                    setError(err.message || 'Something went wrong. Please try again.')
                }
                if (onError) {
                    onError(err)
                }
            } finally {
                setIsLoading(false)
            }
        },
        [submitFn, onSuccess, onError, resetOnSuccess]
    )

    return { handleSubmit, isLoading, error, success, fieldErrors }
}

export default useFormSubmit
