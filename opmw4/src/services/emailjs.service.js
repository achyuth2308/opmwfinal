import emailjs from '@emailjs/browser'

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// Replace the placeholder values below with your actual EmailJS keys.
// You can find these in your EmailJS dashboard: https://dashboard.emailjs.com
// ─────────────────────────────────────────────────────────────────────────────

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'apJtNeeRZ2-ZlxILN'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mvgbcfw'

// Template IDs — create one per use-case in the EmailJS dashboard
const TEMPLATE_FORGOT_PASSWORD = import.meta.env.VITE_EMAILJS_TEMPLATE_FORGOT_PASSWORD || 'template_h1bakct'
const TEMPLATE_JOB_APPLICATION = import.meta.env.VITE_EMAILJS_TEMPLATE_JOB_APPLICATION || 'template_tv5wil8'

/**
 * Initialise EmailJS once (idempotent — safe to call multiple times).
 */
export const initEmailJS = () => {
    emailjs.init({ publicKey: 'apJtNeeRZ2-ZlxILN' })
}

// ─── Forgot Password Email ───────────────────────────────────────────────────
/**
 * Send a password-reset link email.
 * @param {object} params
 * @param {string} params.to_email   - Recipient email address
 * @param {string} params.to_name    - Recipient display name
 * @param {string} params.reset_link - The full password-reset URL
 */
export const sendForgotPasswordEmail = async ({ to_email, to_name, reset_link }) => {
    console.log('--- EmailJS: Sending Forgot Password Email ---')
    console.log('To:', to_email)
    console.log('Params:', { to_email, to_name, reset_link })

    return emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_FORGOT_PASSWORD,
        {
            to_email,
            to_name: to_name || to_email,
            reset_link,
            app_name: 'OPMW',
            reply_to: 'noreply@opmw.in',
        },
        EMAILJS_PUBLIC_KEY // Passing public key directly
    )
}

// ─── Job Application Confirmation Email ─────────────────────────────────────
/**
 * Send a job-application confirmation email to the applicant.
 * @param {object} params
 * @param {string} params.to_email      - Applicant email address
 * @param {string} params.to_name       - Applicant full name
 * @param {string} params.position      - Job title applied for
 * @param {string} params.location      - Preferred city
 * @param {string} params.submitted_on  - Human-readable submission date
 */
export const sendJobApplicationEmail = async ({ to_email, to_name, position, location, submitted_on }) => {
    console.log('--- EmailJS: Sending Job Application Email ---')
    console.log('To:', to_email)
    console.log('Params:', { to_email, to_name, position, location, submitted_on })

    return emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_JOB_APPLICATION,
        {
            to_email,
            to_name,
            position,
            location,
            submitted_on: submitted_on || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            app_name: 'OPMW',
            portal_link: `${window.location.origin}/portal/applications`,
            reply_to: 'careers@opmw.in',
        },
        EMAILJS_PUBLIC_KEY // Passing public key directly
    )
}
