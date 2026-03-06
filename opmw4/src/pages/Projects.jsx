import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import PageHero from '@/components/shared/PageHero'
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
            {/* Premium Hero */}
            <PageHero
                badge="Our Work"
                title="Projects that"
                titleAccent="deliver"
                subtitle="A selection of real-world engagements across BPO, IT, and HRMS verticals."
            >
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 9999,
                    background: 'rgba(110,231,250,0.06)',
                    border: '1px solid rgba(110,231,250,0.18)',
                    fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--text-muted)', letterSpacing: '0.06em',
                }}>
                    {PROJECTS.length} projects · {PROJECT_FILTERS.length - 1} categories
                </div>
            </PageHero>


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
