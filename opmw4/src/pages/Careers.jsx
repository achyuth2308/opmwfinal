import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import TypewriterText from '@/components/shared/TypewriterText'
import RoleCard from '@/components/careers/RoleCard'
import FilterBar from '@/components/projects/FilterBar'
import ApplyForm from '@/components/careers/ApplyForm'
import { SkeletonCareerGrid } from '@/components/shared/Skeleton'
import { CAREERS, CAREER_CITY_FILTERS, CAREER_DEPT_FILTERS } from '@/constants/careers'

const Careers = () => {
    const [jobs, setJobs] = useState(CAREERS)
    const [isLoading, setIsLoading] = useState(true)
    const [cityFilter, setCityFilter] = useState('All')
    const [deptFilter, setDeptFilter] = useState('All')
    const [selectedRole, setSelectedRole] = useState(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const url = import.meta.env.VITE_API_URL || 'http://opmwfinal.onrender.com/api'
                const res = await fetch(`${url}/jobs`)
                if (res.ok) {
                    const data = await res.json()
                    setJobs(data)
                }
            } catch (err) {
                console.error('Failed to fetch jobs:', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchJobs()
    }, [])

    const filtered = jobs.filter((role) => {
        const cityMatch = cityFilter === 'All' || role.cities.includes(cityFilter)
        const deptMatch = deptFilter === 'All' || role.department === deptFilter
        return cityMatch && deptMatch
    })

    return (
        <>
            {/* Hero */}
            <section
                style={{
                    padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(48px, 6vw, 80px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '-5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 600,
                        height: 400,
                        background: 'radial-gradient(ellipse, rgba(110,231,250,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 64,
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Content Left */}
                    <div style={{ flex: '1 1 500px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ marginBottom: 20 }}
                        >
                            <span className="pill-badge">Careers</span>
                        </motion.div>
                        <motion.h1
                            style={{
                                fontSize: 'clamp(36px, 5.5vw, 72px)',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.08,
                                color: 'var(--text-primary)',
                                maxWidth: 720,
                                marginBottom: 20,
                                overflowWrap: 'break-word',
                            }}
                        >
                            <TypewriterText
                                text={[
                                    { text: 'Join the Execution Layer' }
                                ]}
                                delay={0.2}
                            />
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            style={{
                                fontSize: 17,
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                                maxWidth: 540,
                            }}
                        >
                            We're building India's most integrated operations platform. Come build it with us.
                        </motion.p>
                    </div>

                    {/* Image Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 32, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            flex: '1 1 400px',
                            maxWidth: 500,
                            height: 'clamp(280px, 35vw, 420px)',
                            borderRadius: 24,
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)',
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                }}
                            />
                            <img
                                src="/OPMW Images/Careers.png"
                                alt="Careers at OPMW"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Filters + cards */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 120px)',
                    }}
                >
                    {/* Dual filter row */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 20,
                            marginBottom: 36,
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div>
                            <p className="text-label" style={{ color: 'var(--text-muted)', marginBottom: 8 }}>City</p>
                            <FilterBar
                                filters={CAREER_CITY_FILTERS}
                                activeFilter={cityFilter}
                                onFilterChange={setCityFilter}
                            />
                        </div>
                        <div>
                            <p className="text-label" style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Department</p>
                            <FilterBar
                                filters={CAREER_DEPT_FILTERS}
                                activeFilter={deptFilter}
                                onFilterChange={setDeptFilter}
                            />
                        </div>
                    </div>

                    {/* Role count */}
                    <p
                        style={{
                            fontSize: 12,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--text-muted)',
                            marginBottom: 20,
                            letterSpacing: '0.06em',
                        }}
                    >
                        Showing {filtered.length} of {jobs.length} positions
                    </p>

                    {/* Cards */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${cityFilter}-${deptFilter}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: 20,
                            }}
                        >
                            {isLoading ? (
                                <SkeletonCareerGrid count={6} />
                            ) : filtered.map((role, i) => (
                                <motion.div
                                    key={role.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    style={{ display: 'flex' }}
                                >
                                    <RoleCard role={role} onApply={(r) => setSelectedRole(r)} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                            <p style={{ fontSize: 16 }}>No positions match the selected filters.</p>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* Apply Form Drawer */}
            {selectedRole && (
                <ApplyForm role={selectedRole} onClose={() => setSelectedRole(null)} />
            )}
        </>
    )
}

export default Careers



