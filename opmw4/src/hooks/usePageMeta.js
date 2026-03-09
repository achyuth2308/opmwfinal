import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoConfig, { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/constants/seoConfig'

/**
 * Lightweight hook that sets page-level <title>, meta, OG, Twitter, and canonical tags.
 * Call once per page component:  usePageMeta('/about')
 *
 * No external dependencies — manipulates document.head directly.
 */
export function usePageMeta(routeKey) {
    const { pathname } = useLocation()

    useEffect(() => {
        const config = seoConfig[routeKey]
        if (!config) return

        const { title, description, keywords } = config
        const fullUrl = `${SITE_URL}${routeKey === '/' ? '' : routeKey}`
        const ogImage = `${SITE_URL}${config.ogImage || DEFAULT_OG_IMAGE}`

        // ── Title ──────────────────────────────────────────────
        document.title = title

        // ── Helper: create-or-update a <meta> tag ─────────────
        const setMeta = (attr, key, content) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`)
            if (!el) {
                el = document.createElement('meta')
                el.setAttribute(attr, key)
                document.head.appendChild(el)
            }
            el.setAttribute('content', content)
        }

        // ── Standard meta ─────────────────────────────────────
        setMeta('name', 'description', description)
        if (keywords) setMeta('name', 'keywords', keywords)

        // ── Open Graph ────────────────────────────────────────
        setMeta('property', 'og:title', title)
        setMeta('property', 'og:description', description)
        setMeta('property', 'og:url', fullUrl)
        setMeta('property', 'og:image', ogImage)
        setMeta('property', 'og:type', 'website')
        setMeta('property', 'og:site_name', SITE_NAME)

        // ── Twitter Card ──────────────────────────────────────
        setMeta('name', 'twitter:card', 'summary_large_image')
        setMeta('name', 'twitter:title', title)
        setMeta('name', 'twitter:description', description)
        setMeta('name', 'twitter:image', ogImage)

        // ── Canonical ─────────────────────────────────────────
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', fullUrl)
    }, [routeKey, pathname])
}
