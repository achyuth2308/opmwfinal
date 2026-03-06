import HeroSection from '@/components/home/HeroSection'
import CorporatePositioning from '@/components/home/CorporatePositioning'
import AboutOPMW from '@/components/home/AboutOPMW'
import DivisionsGrid from '@/components/home/DivisionsGrid'
import StatsCounter from '@/components/home/StatsCounter'
import LocationsSection from '@/components/home/LocationsSection'
import WhyOPMW from '@/components/home/WhyOPMW'
import CTASection from '@/components/home/CTASection'

const Home = () => {
    return (
        <>
            <HeroSection />
            <CorporatePositioning />
            <AboutOPMW />
            <DivisionsGrid />
            <StatsCounter />
            <LocationsSection />
            <WhyOPMW />
            <CTASection />
        </>
    )
}

export default Home

