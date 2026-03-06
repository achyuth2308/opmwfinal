/**
 * Skeleton loader components for fast perceived loading performance.
 * Works with CSS animation defined in index.css / App.css.
 */

const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 100%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-shimmer 1.4s ease infinite',
    borderRadius: 8,
}

/** A single skeleton line/block */
export const SkeletonBlock = ({ width = '100%', height = 16, borderRadius = 8, style = {} }) => (
    <div style={{ width, height, borderRadius, ...shimmerStyle, ...style }} />
)

/** Skeleton for a stat card */
export const SkeletonStatCard = () => (
    <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 24px',
    }}>
        <SkeletonBlock width={80} height={10} style={{ marginBottom: 12 }} />
        <SkeletonBlock width={60} height={32} />
    </div>
)

/** Skeleton for a table row */
export const SkeletonTableRow = ({ cols = 4 }) => (
    <tr>
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} style={{ padding: '16px 24px' }}>
                <SkeletonBlock width={i === 0 ? '70%' : '50%'} height={14} />
            </td>
        ))}
    </tr>
)

/** Full admin/portal dashboard skeleton */
export const SkeletonDashboard = ({ statCount = 4, rowCount = 6, cols = 4 }) => (
    <>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
            {Array.from({ length: statCount }).map((_, i) => <SkeletonStatCard key={i} />)}
        </div>

        {/* Table placeholder */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                <SkeletonBlock width={180} height={18} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, i) => (
                        <SkeletonTableRow key={i} cols={cols} />
                    ))}
                </tbody>
            </table>
        </div>
    </>
)

/** Skeleton for a job/role card */
export const SkeletonRoleCard = () => (
    <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 200,
        width: '100%',
    }}>
        <SkeletonBlock width={60} height={10} />
        <SkeletonBlock width="80%" height={22} />
        <SkeletonBlock width="50%" height={14} />
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <SkeletonBlock width={70} height={28} borderRadius={20} />
            <SkeletonBlock width={70} height={28} borderRadius={20} />
        </div>
        <SkeletonBlock width="100%" height={36} borderRadius={8} style={{ marginTop: 'auto' }} />
    </div>
)

/** Skeleton grid for career cards */
export const SkeletonCareerGrid = ({ count = 6 }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
    }}>
        {Array.from({ length: count }).map((_, i) => <SkeletonRoleCard key={i} />)}
    </div>
)

export default SkeletonBlock

