import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, ChevronRight } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import PageHero from '@/components/shared/PageHero'
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
                const url = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
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
            {/* Premium Hero via shared component */}
            <PageHero
                badge="Careers"
                title="Join the Execution"
                titleAccent="Layer"
                subtitle="We're building India's most integrated operations platform. Come build it with us."
            >
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { icon: Briefcase, label: `${CAREERS.length}+ Open Roles` },
                        { icon: MapPin, label: '5 Cities' },
                    ].map(({ icon: Icon, label }) => (
                        <span key={label} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '8px 16px', borderRadius: 9999,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--border)',
                            fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--text-secondary)', letterSpacing: '0.05em',
                        }}>
                            <Icon size={13} color="var(--accent)" />
                            {label}
                        </span>
                    ))}
                </div>
            </PageHero>

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
