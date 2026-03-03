export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    {
        label: 'Services',
        href: '/services/bpo',
        children: [
            { label: 'BPO Services', href: '/services/bpo' },
            { label: 'IT & Web', href: '/services/it-web' },
            { label: 'HRMS Product', href: '/services/hrms' },
        ],
    },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
]

export const FOOTER_LINKS = {
    company: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' },
    ],
    services: [
        { label: 'BPO Services', href: '/services/bpo' },
        { label: 'IT & Web', href: '/services/it-web' },
        { label: 'HRMS Product', href: '/services/hrms' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
    ],
}
