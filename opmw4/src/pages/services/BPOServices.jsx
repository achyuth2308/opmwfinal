import {
    PhoneCall,
    Database,
    Users,
    BarChart2,
    Package,
} from 'lucide-react'
import ServiceHero from '@/components/services/ServiceHero'
import FeatureGrid from '@/components/services/FeatureGrid'
import ProcessSteps from '@/components/services/ProcessSteps'
import CTASection from '@/components/home/CTASection'

const BPO_FEATURES = [
    {
        id: 'non-voice',
        icon: Database,
        title: 'Non-Voice Data Projects',
        description:
            'High-accuracy data entry, catalog management, and document processing by trained executives.',
    },
    {
        id: 'inbound',
        icon: PhoneCall,
        title: 'Inbound Customer Support',
        description:
            'Structured inbound support across channels with SLA-driven quality monitoring.',
    },
    {
        id: 'outbound',
        icon: Users,
        title: 'Outbound Sales Campaigns',
        description:
            'Goal-driven outbound teams with daily KPI tracking, floor leads, and quality coaches.',
    },
    {
        id: 'amazon',
        icon: Package,
        title: 'Amazon Seller & Backend Support',
        description:
            'Dedicated teams handling Amazon catalog, seller support, and marketplace case management.',
    },
    {
        id: 'intl-voice',
        icon: BarChart2,
        title: 'International Voice Process',
        description:
            '90-agent international voice capacity with multilingual capability and compliance-led frameworks.',
    },
]

const BPO_STEPS = [
    { id: 'onboard', title: 'Onboard', description: 'Client briefing, process documentation, SLA definition' },
    { id: 'train', title: 'Train', description: 'Structured training program, QA calibrations' },
    { id: 'deploy', title: 'Deploy', description: 'Floor deployment with team leads and QA monitors' },
    { id: 'monitor', title: 'Monitor', description: 'KPI tracking, daily reports, client dashboards' },
    { id: 'scale', title: 'Scale', description: 'Ramp headcount, add verticals, expand geography' },
]

const BPOServices = () => {
    return (
        <>
            <ServiceHero
                label="BPO Services"
                headline="Built for Scale. Driven by Performance."
                subtext="OPMW delivers managed BPO services across voice and non-voice verticals — with 90 dedicated agents, structured KPI governance, and multi-city delivery capacity."
                ctaLabel="Request a Consultation"
                ctaHref="/contact"
                trustItems={['90 Dedicated Agents', '5 Operational Cities', 'KPI-Monitored', 'GST & MSME Registered']}
                image="/OPMW Images/BPO & Process Management.png"
            />

            <FeatureGrid
                sectionLabel="Our Capabilities"
                headline="End-to-end process coverage"
                subtext="From international voice campaigns to non-voice data operations — we run the full BPO spectrum under one management layer."
                features={BPO_FEATURES}
            />

            <ProcessSteps
                sectionLabel="How We Work"
                headline="From brief to execution in five steps"
                steps={BPO_STEPS}
            />

            <CTASection />
        </>
    )
}

export default BPOServices

