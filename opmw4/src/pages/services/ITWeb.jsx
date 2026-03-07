import {
    Globe,
    Code2,
    Layers,
    Database,
    MonitorSmartphone,
} from 'lucide-react'
import ServiceHero from '@/components/services/ServiceHero'
import FeatureGrid from '@/components/services/FeatureGrid'
import SectionWrapper from '@/components/shared/SectionWrapper'
import CTASection from '@/components/home/CTASection'
import { motion } from 'framer-motion'

const IT_FEATURES = [
    {
        id: 'custom-web',
        icon: MonitorSmartphone,
        title: 'Custom Web Application Development',
        description:
            'Full-stack enterprise web apps built with Laravel, React, and .NET Core — responsive, scalable, and production-hardened.',
    },
    {
        id: 'brick',
        icon: Layers,
        title: 'Brick-Oriented Enterprise Platforms',
        description:
            'Modular, infrastructure-aware platforms designed for real-time monitoring and multi-site operations.',
    },
    {
        id: 'corporate-sites',
        icon: Globe,
        title: 'Corporate Website Development',
        description:
            'High-performance corporate websites built for conversion, SEO, and brand excellence.',
    },
    {
        id: 'erp',
        icon: Database,
        title: 'ERP & Workflow Systems',
        description:
            'End-to-end ERP platforms with role-based access, audit trails, and workflow automation for SME and enterprise clients.',
    },
    {
        id: 'mnc',
        icon: Code2,
        title: 'MNC Collaborative Technology Projects',
        description:
            'Engineering partnerships with large enterprises — white-label development, capacity augmentation, and project delivery.',
    },
]

const STACK_ITEMS = [
    { label: 'PHP / Laravel', color: 'rgba(255,91,31,0.7)' },
    { label: '.NET Core', color: 'rgba(102,51,204,0.8)' },
    { label: 'React', color: 'rgba(97,218,251,0.8)' },
    { label: 'Angular', color: 'rgba(221,0,49,0.7)' },
    { label: 'MySQL', color: 'rgba(0,113,176,0.8)' },
    { label: 'SQL Server', color: 'rgba(200,42,42,0.7)' },
]

const ITWeb = () => {
    return (
        <>
            <ServiceHero
                label="IT & Web Application Division"
                headline="Systems that actually work."
                subtext="Not every business needs complex software. Our IT division develops web-based applications tailored to your specific workflow — delivering practical, scalable, and long-term solutions."
                ctaLabel="Talk to Our Engineering Team"
                ctaHref="/contact#contact-form"
                // trustItems={['40 IT Developers', 'Laravel · React · .NET', 'MNC Collaborations']}
                image="/opmw-images/it-division.png"
            />

            <FeatureGrid
                sectionLabel="Our Services"
                headline="From prototypes to production systems"
                subtext="We build software that runs real businesses — reliable, maintainable, and designed to grow with you."
                features={IT_FEATURES}
            />

            <CTASection />
        </>
    )
}

export default ITWeb

