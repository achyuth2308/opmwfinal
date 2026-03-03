import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectModal from '@/components/projects/ProjectModal'
import FilterBar from '@/components/projects/FilterBar'
import { PROJECTS, PROJECT_FILTERS } from '@/constants/projects'

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [selectedProject, setSelectedProject] = useState(null)

    const filtered = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter)

    return (
        <>
            {/* Hero */}
            <section
                style={{
                    padding: 'clamp(60px, 8vw, 110px) clamp(24px, 5vw, 80px) clamp(40px, 5vw, 64px)',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        height: 400,
                        background: 'radial-gradient(ellipse, rgba(110,231,250,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="pill-badge" style={{ marginBottom: 24, display: 'inline-flex' }}>
                            Our Work
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(36px, 5.5vw, 72px)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            color: 'var(--text-primary)',
                            marginBottom: 16,
                        }}
                    >
                        Projects that deliver
                        <span style={{ color: 'var(--accent)' }}>.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18 }}
                        style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}
                    >
                        A selection of real-world engagements across BPO, IT, and HRMS verticals.
                    </motion.p>
                </div>
            </section>

            {/* Main content */}
            <SectionWrapper className="section-gutter">
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 120px)',
                    }}
                >
                    {/* Filter bar */}
                    <div style={{ marginBottom: 36 }}>
                        <FilterBar
                            filters={PROJECT_FILTERS}
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                    </div>

                    {/* Cards grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
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
                            {filtered.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    style={{ height: '100%' }}
                                >
                                    <ProjectCard
                                        project={project}
                                        onClick={(p) => setSelectedProject(p)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </SectionWrapper>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    )
}

export default Projects
