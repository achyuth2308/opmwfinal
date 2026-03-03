import { motion } from 'framer-motion'
import { Linkedin, Target, TrendingUp, Award, Globe, Users, Zap, BarChart2 } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'

const LEADERSHIP = [
    { name: 'Founder & CEO', role: 'Strategic Vision & Operations', initials: 'FC' },
    { name: 'Chief Operating Officer', role: 'Delivery & Process Excellence', initials: 'CO' },
    { name: 'Head of Technology', role: 'Engineering & Product', initials: 'HT' },
    { name: 'Head of HR', role: 'Talent & Compliance', initials: 'HH' },
]

const WORKFORCE = [
    { label: 'International Voice Agents', count: 90, color: '#6EE7FA' },
    { label: 'Non-Voice Executives', count: 120, color: '#a78bfa' },
    { label: 'IT Developers', count: 40, color: '#4ade80' },
    { label: 'HR & Payroll Specialists', count: 25, color: '#FBB040' },
    { label: 'Operations & Team Leads', count: 25, color: '#f87171' },
]

const GROWTH_PHASES = [
    { phase: 'Phase 1', title: 'Stabilize 300+ workforce', status: 'current' },
    { phase: 'Phase 2', title: 'Expand to 1000+ staff', status: 'upcoming' },
    { phase: 'Phase 3', title: 'Launch HRMS SaaS nationally', status: 'upcoming' },
    { phase: 'Phase 4', title: 'Global Voice Expansion', status: 'upcoming' },
]

const OPERATIONAL_STEPS = [
    {
        step: 'Onboard',
        description: 'Client briefing, SLA definition, process documentation, and team formation',
    },
    {
        step: 'Deploy',
        description: 'Floor deployment with trained leads, QA coaches, and monitoring dashboards',
    },
    {
        step: 'Scale',
        description: 'Ramping headcount, expanding verticals, and replicating across cities',
    },
]

const MARKET_SEGMENTS = [
    { segment: 'E-Commerce & Retail', share: 35, color: '#6EE7FA' },
    { segment: 'Manufacturing & Industrial', share: 25, color: '#a78bfa' },
    { segment: 'Fintech & BFSI', share: 20, color: '#4ade80' },
    { segment: 'Real Estate & Infra', share: 12, color: '#FBB040' },
    { segment: 'Other Sectors', share: 8, color: '#f87171' },
]

const REVENUE_MODELS = [
    {
        icon: Users,
        title: 'Per-Seat',
        description: 'Client pays per agent deployed on their process. Ideal for BPO voice and non-voice campaigns.',
        badge: 'BPO',
        badgeColor: '#6EE7FA',
    },
    {
        icon: Zap,
        title: 'Project-Based',
        description: 'Fixed-scope IT delivery engagements with milestone-based billing and defined deliverables.',
        badge: 'IT',
        badgeColor: '#a78bfa',
    },
    {
        icon: Globe,
        title: 'SaaS Subscription',
        description: 'Annual or monthly subscription for OPMW HRMS modules — payroll, attendance, compliance.',
        badge: 'HRMS',
        badgeColor: '#4ade80',
    },
    {
        icon: Award,
        title: 'Retainer',
        description: 'Ongoing managed support contracts for clients requiring sustained operational oversight.',
        badge: 'All',
        badgeColor: '#FBB040',
    },
]

const sectionGutter = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 clamp(24px, 5vw, 80px) clamp(64px, 8vw, 100px)',
}

const About = () => {
    return (
        <>
            {/* ─── Company Overview ─── */}
            <section
                style={{
                    padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(48px, 6vw, 72px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(110,231,250,0.05) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'clamp(40px, 6vw, 80px)',
                        alignItems: 'flex-start'
                    }}>
                        {/* Content side */}
                        <div style={{ flex: '1 1 500px' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ marginBottom: 20 }}
                            >
                                <span className="pill-badge">About OPMW</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.1 }}
                                style={{
                                    fontSize: 'clamp(36px, 5.5vw, 72px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.08,
                                    color: 'var(--text-primary)',
                                    marginBottom: 28,
                                }}
                            >
                                One Platform.
                                <br />
                                Multiple dimensions of execution.
                            </motion.h1>

                            {/* Company overview cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: 16,
                                    marginTop: 8,
                                }}
                            >
                                {[
                                    { label: 'Founded', value: '2021', detail: 'Chennai, India' },
                                    { label: 'Workforce', value: '300+', detail: 'Professionals' },
                                    { label: 'Cities', value: '5', detail: 'Active locations' },
                                    { label: 'Sectors', value: '3', detail: 'BPO · IT · HRMS' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        style={{
                                            background: 'var(--surface-2)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 12,
                                            padding: '20px 24px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                letterSpacing: '0.12em',
                                                textTransform: 'uppercase',
                                                color: 'var(--text-muted)',
                                                marginBottom: 6,
                                            }}
                                        >
                                            {stat.label}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 28,
                                                fontWeight: 800,
                                                color: 'var(--accent)',
                                                fontFamily: 'JetBrains Mono, monospace',
                                                letterSpacing: '-0.02em',
                                                lineHeight: 1,
                                                marginBottom: 4,
                                            }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stat.detail}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                style={{
                                    fontSize: 'clamp(15px, 1.6vw, 17px)',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.8,
                                    marginTop: 28,
                                }}
                            >
                                OPMW was built to solve a fragmented problem — enterprises juggling separate vendors for
                                BPO, IT, and HR. We built a single integrated execution platform that handles all three
                                under one unified governance model, spanning 5 cities with 300+ multi-skilled professionals.
                            </motion.p>
                        </div>

                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                flex: '1 1 420px',
                                position: 'relative',
                                borderRadius: 32,
                                overflow: 'hidden',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                            >
                                <img
                                    src="/OPMW Images/company overview.png"
                                    alt="OPMW Overview"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(9,9,11,0.6) 0%, transparent 60%)',
                                    pointerEvents: 'none'
                                }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Vision & Mission ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                            Vision & Mission
                        </p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Where we stand. Where we're going.
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 24,
                        }}
                    >
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{
                                background: 'var(--surface-2)',
                                border: '1px solid rgba(110,231,250,0.15)',
                                borderRadius: 14,
                                padding: 'clamp(24px, 3vw, 40px)',
                            }}
                        >
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 10,
                                    background: 'rgba(110,231,250,0.08)',
                                    border: '1px solid rgba(110,231,250,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <Target size={20} style={{ color: 'var(--accent)' }} />
                            </div>
                            <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                                Our Vision
                            </p>
                            <h3
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: 14,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                India's most integrated execution platform
                            </h3>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                To be India's most integrated execution platform — combining process outsourcing,
                                technology, and HR innovation under one unified brand that enterprises trust
                                for mission-critical operations.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            style={{
                                background: 'var(--surface-2)',
                                border: '1px solid rgba(167,139,250,0.15)',
                                borderRadius: 14,
                                padding: 'clamp(24px, 3vw, 40px)',
                            }}
                        >
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 10,
                                    background: 'rgba(167,139,250,0.08)',
                                    border: '1px solid rgba(167,139,250,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <TrendingUp size={20} style={{ color: '#a78bfa' }} />
                            </div>
                            <p
                                className="text-label"
                                style={{ color: '#a78bfa', marginBottom: 12 }}
                            >
                                Our Mission
                            </p>
                            <h3
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: 14,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Deliver execution that enterprises can rely on
                            </h3>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                To provide scalable, compliance-first operations across BPO, IT, and HRMS
                                verticals — enabling businesses to grow without the friction of internal
                                infrastructure bottlenecks.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Operational Model ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Operational Model</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            How OPMW operates
                        </h2>
                    </div>

                    <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {OPERATIONAL_STEPS.map((item, i) => (
                            <div
                                key={item.step}
                                style={{ display: 'flex', alignItems: 'flex-start', flex: '1 1 220px' }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                    style={{
                                        textAlign: 'center',
                                        flex: 1,
                                        padding: 'clamp(20px, 2vw, 32px)',
                                        background: 'var(--surface-2)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 12,
                                        margin: '0 8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            border: '1.5px solid rgba(110,231,250,0.3)',
                                            background: 'rgba(110,231,250,0.07)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 16px',
                                            fontSize: 12,
                                            fontWeight: 700,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                            marginBottom: 10,
                                        }}
                                    >
                                        {item.step}
                                    </h3>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                                        {item.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Workforce Breakdown ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: 40,
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <div className="section-divider" style={{ marginBottom: 16 }} />
                            <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Workforce Strength</p>
                            <h2
                                style={{
                                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.03em',
                                    color: 'var(--text-primary)',
                                    marginBottom: 16,
                                }}
                            >
                                300+ professionals across 5 cities
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>
                                Built organically from ground up, OPMW's workforce spans voice operations, technology, HR, and management.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {WORKFORCE.map((item, i) => {
                                const total = WORKFORCE.reduce((a, b) => a + b.count, 0)
                                const pct = Math.round((item.count / total) * 100)
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                                            <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: item.color, fontWeight: 700 }}>
                                                {item.count}
                                            </span>
                                        </div>
                                        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
                                                style={{ height: '100%', background: item.color, borderRadius: 2 }}
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Market Positioning ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Market Positioning</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                                marginBottom: 12,
                            }}
                        >
                            Who we serve
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 540, margin: '0 auto' }}>
                            OPMW targets mid-market and enterprise clients across high-growth Indian industries.
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: 16,
                        }}
                    >
                        {MARKET_SEGMENTS.map((seg, i) => (
                            <motion.div
                                key={seg.segment}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: '20px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                }}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 10,
                                        background: `${seg.color}14`,
                                        border: `1px solid ${seg.color}30`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <BarChart2 size={20} style={{ color: seg.color }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                                        {seg.segment}
                                    </p>
                                    <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${seg.share}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: 'easeOut' }}
                                            style={{ height: '100%', background: seg.color, borderRadius: 2 }}
                                        />
                                    </div>
                                    <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: seg.color, marginTop: 4 }}>
                                        {seg.share}% of client base
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Growth Roadmap ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Growth Roadmap</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Where we're headed
                        </h2>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap-reverse',
                        gap: 64,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{
                                flex: '1 1 400px',
                                borderRadius: 28,
                                overflow: 'hidden',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                                <img
                                    src="/OPMW Images/growth plan.png"
                                    alt="OPMW Growth Plan"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Timeline side */}
                        <div style={{ flex: '1 1 450px', maxWidth: 600 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {GROWTH_PHASES.map((phase, i) => (
                                    <motion.div
                                        key={phase.phase}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="timeline-item"
                                        style={{ paddingBottom: i < GROWTH_PHASES.length - 1 ? 32 : 0 }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    fontFamily: 'JetBrains Mono, monospace',
                                                    letterSpacing: '0.14em',
                                                    textTransform: 'uppercase',
                                                    color: phase.status === 'current' ? 'var(--accent)' : 'var(--text-muted)',
                                                    background: phase.status === 'current' ? 'rgba(110,231,250,0.1)' : 'rgba(255,255,255,0.04)',
                                                    border: `1px solid ${phase.status === 'current' ? 'rgba(110,231,250,0.25)' : 'var(--border)'}`,
                                                    borderRadius: 6,
                                                    padding: '4px 10px',
                                                }}
                                            >
                                                {phase.phase}
                                                {phase.status === 'current' && ' · Active'}
                                            </span>
                                            <strong
                                                style={{
                                                    fontSize: 'clamp(15px, 1.8vw, 17px)',
                                                    fontWeight: 600,
                                                    color: phase.status === 'current' ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                }}
                                            >
                                                {phase.title}
                                            </strong>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Leadership ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Leadership</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            The team at the helm
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 20,
                        }}
                    >
                        {LEADERSHIP.map((person, i) => (
                            <motion.div
                                key={person.role}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                style={{
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 12,
                                    padding: 24,
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        background: 'rgba(110,231,250,0.1)',
                                        border: '1.5px solid rgba(110,231,250,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 16,
                                        fontWeight: 700,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {person.initials}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                                        {person.name}
                                    </h4>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                                        {person.role}
                                    </p>
                                </div>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${person.name} LinkedIn`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        color: 'var(--text-muted)',
                                        fontSize: 12,
                                        textDecoration: 'none',
                                        transition: 'color 200ms ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
                                >
                                    <Linkedin size={14} />
                                    LinkedIn
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Revenue Model ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-divider" style={{ margin: '0 auto 16px' }} />
                        <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 12 }}>Revenue Model</p>
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 3.5vw, 44px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                                marginBottom: 12,
                            }}
                        >
                            How we structure engagements
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
                            Flexible commercial models tailored to each client's operational structure.
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 20,
                        }}
                    >
                        {REVENUE_MODELS.map((model, i) => {
                            const Icon = model.icon
                            return (
                                <motion.div
                                    key={model.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    style={{
                                        background: 'var(--surface-2)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 12,
                                        padding: 'clamp(20px, 2.5vw, 32px)',
                                        transition: 'border-color 200ms ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(110,231,250,0.2)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <div
                                            style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: 10,
                                                background: 'rgba(110,231,250,0.07)',
                                                border: '1px solid rgba(110,231,250,0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Icon size={18} style={{ color: 'var(--accent)' }} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: 10,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: model.badgeColor,
                                                background: `${model.badgeColor}14`,
                                                border: `1px solid ${model.badgeColor}30`,
                                                borderRadius: 4,
                                                padding: '2px 8px',
                                            }}
                                        >
                                            {model.badge}
                                        </span>
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: 17,
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                            marginBottom: 10,
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        {model.title}
                                    </h3>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {model.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </SectionWrapper>

            {/* ─── Compliance ─── */}
            <SectionWrapper className="section-gutter">
                <div style={sectionGutter}>
                    <div
                        style={{
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border)',
                            borderRadius: 14,
                            padding: 'clamp(28px, 4vw, 44px)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <p className="text-label" style={{ color: 'var(--accent)', marginBottom: 8 }}>Compliance & Registration</p>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                                Operating with full legal standing
                            </h3>
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                { label: 'GST Registered', status: 'active' },
                                { label: 'MSME Registered', status: 'active' },
                                { label: 'ISO 9001', status: 'planned' },
                                { label: 'ISO 27001', status: 'planned' },
                            ].map((badge) => (
                                <div
                                    key={badge.label}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        border: badge.status === 'active' ? '1px solid rgba(110,231,250,0.25)' : '1px solid var(--border)',
                                        background: badge.status === 'active' ? 'rgba(110,231,250,0.06)' : 'transparent',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <span style={{ fontSize: 13, fontWeight: 600, color: badge.status === 'active' ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                        {badge.label}
                                    </span>
                                    <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', color: badge.status === 'active' ? 'var(--accent)' : 'var(--text-muted)' }}>
                                        {badge.status === 'active' ? 'ACTIVE' : 'PLANNED'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </>
    )
}

export default About
