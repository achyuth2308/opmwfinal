import { lazy } from 'react'

/**
 * Enhanced lazy loader that retries the import if it fails.
 * This is crucial for handling "Failed to fetch dynamically imported module" errors,
 * which usually happen when a new version is deployed and old chunks are removed.
 */
export const lazyWithRetry = (componentImport) =>
    lazy(async () => {
        const pageHasAlreadyBeenReloaded = JSON.parse(
            window.sessionStorage.getItem('page-has-been-force-reloaded') || 'false'
        )

        try {
            return await componentImport()
        } catch (error) {
            if (!pageHasAlreadyBeenReloaded) {
                // First failure: force a full page reload to get the latest assets
                window.sessionStorage.setItem('page-has-been-force-reloaded', 'true')
                window.location.reload()
                return { default: () => null } // Placeholder while reloading
            }

            // If we already reloaded and it still fails, there's a real error
            throw error
        }
    })
