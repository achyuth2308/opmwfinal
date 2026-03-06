import { Headphones, Monitor, LayoutDashboard } from 'lucide-react'

export const DIVISIONS = [
    {
        id: 'bpo',
        icon: Headphones,
        title: 'BPO & International Voice',
        description:
            '90-agent dedicated international campaign with structured KPI monitoring and multi-city delivery capability.',
        tags: ['Non-Voice', 'Voice', 'Amazon'],
        href: '/services/bpo',
        accentColor: 'rgba(110,231,250,0.12)',
        image: '/OPMW Images/BPO & Process Management.png',
    },
    {
        id: 'it',
        icon: Monitor,
        title: 'IT & Web Applications',
        description:
            'Custom enterprise web applications, ERP systems, brick-oriented platforms built for scale and reliability.',
        tags: ['Laravel', 'React', '.NET'],
        href: '/services/it-web',
        accentColor: 'rgba(110,231,250,0.12)',
        image: '/OPMW Images/IT&WebApplicationDivision.png',
    },
    {
        id: 'hrms',
        icon: LayoutDashboard,
        title: 'OPMW HRMS',
        description:
            'Proprietary cloud-based HRMS with payroll, attendance, multi-branch access, and compliance reporting.',
        tags: ['SaaS', 'Cloud', 'Enterprise'],
        href: '/services/hrms',
        accentColor: 'rgba(110,231,250,0.12)',
        image: '/OPMW Images/HRMSâ€“ProprietaryProduct.png',
    },
]

