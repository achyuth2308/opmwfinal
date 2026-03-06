import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from '@/layout/RootLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Public pages
const Home = lazy(() => import('@/pages/Home'))
const Projects = lazy(() => import('@/pages/Projects'))
const About = lazy(() => import('@/pages/About'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))

// Services
const BPOServices = lazy(() => import('@/pages/services/BPOServices'))
const ITWeb = lazy(() => import('@/pages/services/ITWeb'))
const HRMS = lazy(() => import('@/pages/services/HRMS'))

// Auth pages (no Navbar/Footer)
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

// Candidate portal (protected, no Navbar/Footer)
const Dashboard = lazy(() => import('@/pages/portal/Dashboard'))
const MyApplications = lazy(() => import('@/pages/portal/MyApplications'))
const Profile = lazy(() => import('@/pages/portal/Profile'))

// Admin pages (no Navbar/Footer)
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminApplications = lazy(() => import('@/pages/admin/AdminApplications'))
const AdminCandidates = lazy(() => import('@/pages/admin/AdminCandidates'))
const AdminContacts = lazy(() => import('@/pages/admin/AdminContacts'))
const AdminJobs = lazy(() => import('@/pages/admin/AdminJobs'))

const PageLoader = () => (
    <div
        style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <div
            style={{
                width: 32,
                height: 32,
                border: '2px solid rgba(110,231,250,0.15)',
                borderTop: '2px solid var(--accent)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
)

const NotFound = () => (
    <div
        style={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 40,
        }}
    >
        <p
            style={{
                fontSize: 80,
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(110,231,250,0.12)',
                lineHeight: 1,
                marginBottom: 16,
            }}
        >
            404
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
            Page not found
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 28 }}>
            The page you're looking for doesn't exist or has been moved.
        </p>
        <a
            href="/"
            style={{
                padding: '10px 24px',
                borderRadius: 8,
                background: 'rgba(110,231,250,0.08)',
                border: '1px solid rgba(110,231,250,0.25)',
                color: 'var(--accent)',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 200ms ease',
            }}
        >
            Back to Home
        </a>
    </div>
)

const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {/* ——— Auth routes (no Navbar/Footer) — must be before layout catch-all ——— */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ——— Portal routes (protected, no Navbar/Footer) ——— */}
            <Route
                path="/portal"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
                path="/portal/applications"
                element={<ProtectedRoute><MyApplications /></ProtectedRoute>}
            />
            <Route
                path="/portal/profile"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />

            {/* ——— Admin routes (no Navbar/Footer) ——— */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/candidates" element={<AdminCandidates />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />

            {/* ——— Public routes (with Navbar + Footer via RootLayout) ——— */}
            <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/services/bpo" element={<BPOServices />} />
                <Route path="/services/it-web" element={<ITWeb />} />
                <Route path="/services/it" element={<Navigate to="/services/it-web" replace />} />
                <Route path="/services/it_web" element={<Navigate to="/services/it-web" replace />} />
                <Route path="/services/hrms" element={<HRMS />} />
            </Route>

            {/* â”€â”€â”€ 404 catch-all (must be LAST, outside any layout group) â”€â”€â”€ */}
            <Route path="*" element={<RootLayout />}>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </Suspense>
)

export default AppRouter

