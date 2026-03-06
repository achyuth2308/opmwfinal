import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'
import TypewriterText from '@/components/shared/TypewriterText'
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
                            <span className="pill-badge">Our Work</span>
                        </motion.div>
                        <motion.h1
                            style={{
                                fontSize: 'clamp(36px, 5.5vw, 72px)',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.08,
                                color: 'var(--text-primary)',
                                maxWidth: 640,
                                marginBottom: 20,
                            }}
                        >
                            <TypewriterText
                                text={[
                                    { text: 'Projects that deliver' }
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
                            A selection of real-world engagements across BPO, IT, and HRMS verticals.
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
                                src="/opmw-images/projects.png"
                                alt="OPMW Projects"
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
                                gridAutoRows: '1fr',
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

