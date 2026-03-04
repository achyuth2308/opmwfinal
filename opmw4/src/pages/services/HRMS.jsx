import {
    CreditCard,
    Clock,
    Calendar,
    LayoutDashboard,
    FileText,
    Lock,
} from 'lucide-react'
import ServiceHero from '@/components/services/ServiceHero'
import FeatureGrid from '@/components/services/FeatureGrid'
import DemoRequestForm from '@/components/services/DemoRequestForm'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { motion } from 'framer-motion'

const HRMS_FEATURES = [
    {
        id: 'payroll',
        icon: CreditCard,
        title: 'Payroll Automation',
        description:
            'Automated payroll processing with tax calculations, net salary computation, payslip generation, and bank disbursement integration.',
    },
    {
        id: 'attendance',
        icon: Clock,
        title: 'Attendance & Shift Management',
        description:
            'Biometric integration, shift scheduling, late/early tracking, and real-time attendance dashboards.',
    },
    {
        id: 'leave',
        icon: Calendar,
        title: 'Leave & Performance Tracking',
        description:
            'Employee leave management with approval workflows, accrual policies, and performance review modules.',
    },
    {
        id: 'dashboard',
        icon: LayoutDashboard,
        title: 'Multi-Location Dashboard',
        description:
            'Unified HR dashboard across all branches — role-based access with location-specific data visibility.',
    },
    {
        id: 'compliance',
        icon: FileText,
        title: 'Compliance Reporting',
        description:
            'Automated ESI, PF, PT, and TDS reports. Statutory compliance built directly into the payroll cycle.',
    },
    {
        id: 'access',
        icon: Lock,
        title: 'Multi-Branch Access Control',
        description:
            'Granular permissions engine — control what each HR manager, Finance lead, and Department Head can view or edit.',
    },
]

const PRICING_TIERS = [
    {
        id: 'starter',
        name: 'Starter',
        desc: 'Up to 50 employees',
        features: ['Payroll & Attendance', 'Leave Management', 'Email Support', '1 Location'],
        popular: false,
    },
    {
        id: 'growth',
        name: 'Growth',
        desc: 'Up to 300 employees',
        features: ['Everything in Starter', 'Performance Tracking', 'Compliance Reports', 'Multi-Location', 'Priority Support'],
        popular: true,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        desc: 'Unlimited + custom',
        features: ['Everything in Growth', 'Custom Integrations', 'Dedicated Account Manager', 'SLA-backed Uptime', 'On-prem option'],
        popular: false,
    },
]

const HRMSDashboardMockup = () => (
    <div
        style={{
            background: '#0A0D12',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            overflow: 'hidden',
            width: '100%',
            maxWidth: 760,
            margin: '0 auto',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}
    >
        {/* Header bar */}
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                gap: 16,
            }}
        >
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                OPMW HRMS
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                Dashboard · Q1 2025
            </span>
        </div>

        <div style={{ display: 'flex', minHeight: 300 }}>
            {/* Sidebar — Hidden on mobile */}
            <div
                className="hidden-mobile"
                style={{
                    width: 160,
                    background: 'rgba(255,255,255,0.02)',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px 0',
                    flexShrink: 0,
                }}
            >
                {['Dashboard', 'Employees', 'Payroll', 'Attendance', 'Leave', 'Reports'].map((item, i) => (
                    <div
                        key={item}
                        style={{
                            padding: '8px 16px',
                            fontSize: 12,
                            color: i === 0 ? 'var(--accent)' : 'var(--text-muted)',
                            background: i === 0 ? 'rgba(110,231,250,0.08)' : 'transparent',
                            borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: i === 0 ? 600 : 400,
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: '20px clamp(12px, 3vw, 24px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Responsive Metric cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12
                }}>
                    {[
                        { label: 'Total Employees', value: '248' },
                        { label: 'On Leave Today', value: '12' },
                        { label: 'Payroll Due', value: '₹ 28.4L' },
                    ].map((metric) => (
                        <div
                            key={metric.label}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 8,
                                padding: 14,
                            }}
                        >
                            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
                                {metric.value}
                            </p>
                            <p style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Attendance Chart — Stays visible but shrinks */}
                <div>
                    <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>
                        WEEKLY ATTENDANCE TREND
                    </p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
                        {[85, 92, 88, 95, 91].map((pct, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    height: `${(pct / 100) * 80}px`,
                                    background: `rgba(110,231,250,${0.3 + i * 0.1})`,
                                    borderRadius: '4px 4px 0 0',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ position: 'absolute', top: -14, left: 0, right: 0, textAlign: 'center', fontSize: 8, color: 'var(--text-muted)' }}>{pct}%</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                            <span key={d} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <style>{`
            @media (max-width: 640px) {
                .hidden-mobile { display: none !important; }
            }
        `}</style>
    </div>
)


const HRMS = () => {
    return (
        <>
            <ServiceHero
                label="OPMW HRMS"
                headline="Your Workforce. One Dashboard."
                subtext="A proprietary cloud HRMS built from real operational experience across 200+ employees. Payroll, attendance, multi-branch access, and compliance — under one platform."
                ctaLabel="Request a Free Demo"
                ctaHref="#demo"
                trustItems={['200+ Employees Managed', 'Multi-Branch Ready', 'Payroll Automation', 'Compliance Built-In']}
                image="/OPMW Images/HRMS–ProprietaryProduct.png"
            />

            {/* Dashboard mockup */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 clamp(24px, 5vw, 80px) clamp(48px, 6vw, 80px)',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <HRMSDashboardMockup />
                    </motion.div>
                </div>
            </SectionWrapper>

            <FeatureGrid
                sectionLabel="Platform Features"
                headline="Everything HR needs, nothing it doesn't"
                features={HRMS_FEATURES}
            />

            {/* Pricing */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Pricing</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Simple, transparent pricing
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: 20,
                        }}
                    >
                        {PRICING_TIERS.map((tier, i) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`pricing-card${tier.popular ? ' popular' : ''}`}
                            >
                                {tier.popular && (
                                    <div
                                        style={{
                                            fontSize: 10,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            letterSpacing: '0.14em',
                                            textTransform: 'uppercase',
                                            color: 'var(--accent)',
                                            background: 'rgba(110,231,250,0.1)',
                                            border: '1px solid rgba(110,231,250,0.25)',
                                            borderRadius: 4,
                                            padding: '2px 10px',
                                            display: 'inline-block',
                                            marginBottom: 16,
                                        }}
                                    >
                                        Most Popular
                                    </div>
                                )}
                                <h3
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        marginBottom: 4,
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {tier.name}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: 'var(--text-secondary)',
                                        marginBottom: 24,
                                        fontFamily: 'JetBrains Mono, monospace',
                                    }}
                                >
                                    {tier.desc}
                                </p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                                    {tier.features.map((f) => (
                                        <li
                                            key={f}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                fontSize: 14,
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: '50%',
                                                    background: 'var(--accent)',
                                                    flexShrink: 0,
                                                }}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#demo"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px 20px',
                                        borderRadius: 8,
                                        background: tier.popular ? 'rgba(110,231,250,0.12)' : 'rgba(255,255,255,0.04)',
                                        border: tier.popular ? '1px solid rgba(110,231,250,0.3)' : '1px solid var(--border)',
                                        color: tier.popular ? 'var(--accent)' : 'var(--text-secondary)',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'all 200ms ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                                >
                                    Request Demo
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Demo form */}
            <div id="demo">
                <DemoRequestForm />
            </div>
        </>
    )
}

export default HRMS
