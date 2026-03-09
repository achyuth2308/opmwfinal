/**
 * Centralized SEO configuration for every public route.
 * When you map your custom domain, update SITE_URL below.
 */

export const SITE_URL = 'https://www.opmw.in'
export const SITE_NAME = 'OPMW'
export const DEFAULT_OG_IMAGE = '/logo.png'

const seoConfig = {
    '/': {
        title: 'OPMW — One Platform, Multiple Workforce Dimensions',
        description:
            'OPMW is India\'s integrated execution platform combining BPO, IT & Web Development, and HRMS under one unified brand. 300+ professionals across 5 cities.',
        keywords:
            'OPMW, BPO services India, IT outsourcing, HRMS solutions, workforce management, business process outsourcing, web development India',
    },
    '/about': {
        title: 'About Us | OPMW',
        description:
            'Founded in 2021, OPMW operates across 5 Indian cities with 300+ professionals delivering BPO, IT, and HRMS services to mid-market and enterprise clients.',
        keywords:
            'about OPMW, company overview, Indian BPO company, integrated enterprise platform, workforce solutions',
    },
    '/projects': {
        title: 'Projects & Portfolio | OPMW',
        description:
            'Explore OPMW\'s portfolio of enterprise projects spanning BPO delivery, web applications, ERP systems, and HRMS solutions for leading brands.',
        keywords:
            'OPMW projects, portfolio, enterprise solutions, web applications, BPO case studies, ERP development',
    },
    '/careers': {
        title: 'Careers at OPMW | Join Our Team',
        description:
            'Join OPMW\'s growing team of 300+ professionals. Explore open positions in BPO operations, IT development, HR management, and more across 5 cities.',
        keywords:
            'OPMW careers, jobs at OPMW, BPO jobs India, IT developer jobs, Chennai jobs, career opportunities',
    },
    '/contact': {
        title: 'Contact Us | OPMW',
        description:
            'Get in touch with OPMW for BPO, IT, or HRMS services. Located across 5 Indian cities with our HQ at Tidel Park, Chennai. We respond within 1 business day.',
        keywords:
            'contact OPMW, OPMW Chennai, business enquiry, BPO consultation, IT services contact',
    },
    '/privacy': {
        title: 'Privacy Policy | OPMW',
        description:
            'Read OPMW\'s privacy policy to understand how we collect, use, and protect your personal data across our platform and services.',
        keywords: 'OPMW privacy policy, data protection, personal data, user privacy',
    },
    '/terms': {
        title: 'Terms & Conditions | OPMW',
        description:
            'Review OPMW\'s terms and conditions governing the use of our platform, services, and website.',
        keywords: 'OPMW terms and conditions, terms of service, user agreement, legal terms',
    },
    '/services/bpo': {
        title: 'BPO Services — Voice & Non-Voice | OPMW',
        description:
            'OPMW delivers managed BPO services with 90 dedicated agents across voice and non-voice verticals. KPI-monitored, multi-city delivery with structured SLA governance.',
        keywords:
            'BPO services, voice process, non-voice BPO, outbound sales, inbound support, Amazon seller support, data entry services India',
    },
    '/services/it-web': {
        title: 'IT & Web Application Development | OPMW',
        description:
            'OPMW\'s IT division builds custom web applications, ERP systems, and enterprise platforms using Laravel, React, and .NET Core — practical, scalable, and production-hardened.',
        keywords:
            'IT services, web development, custom web apps, Laravel development, React development, ERP systems, enterprise software India',
    },
    '/services/hrms': {
        title: 'HRMS Solutions — Payroll & Compliance | OPMW',
        description:
            'OPMW HRMS offers end-to-end HR management — payroll processing, attendance tracking, compliance automation, and employee self-service portals for Indian businesses.',
        keywords:
            'HRMS software, HR management system, payroll software India, attendance tracking, compliance automation, employee management',
    },
}

export default seoConfig
