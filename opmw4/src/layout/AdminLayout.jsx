import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import OPMWLogo from '@/components/shared/OPMWLogo'

const AdminLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-1)' }}>
            <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

            <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {/* Mobile topbar */}
                <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', flexShrink: 0 }} className="admin-mobile-topbar">
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <OPMWLogo size="md" showAnimation={false} />
                    </Link>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <div style={{ flex: 1 }}>
                    <Outlet context={{ mobileMenuOpen, setMobileMenuOpen }} />
                </div>
            </main>

            <style>{`
                @media(max-width:768px) { 
                    .admin-mobile-topbar { display: flex !important; } 
                }
            `}</style>
        </div>
    )
}

export default AdminLayout
