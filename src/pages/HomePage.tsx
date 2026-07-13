import HeroSection from './home/HeroSection'
import StatsBar from './home/StatsBar'
import DocumentTypesSection from './home/DocumentTypesSection'
import StepsSection from './home/StepsSection'
import BenefitsSection from './home/BenefitsSection'
import FinalCtaSection from './home/FinalCtaSection'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-275 px-5 pb-20 max-[768px]:px-4">
      <HeroSection />
      <StatsBar />
      <DocumentTypesSection />
      <StepsSection />
      <BenefitsSection />
      <FinalCtaSection />
    </div>
  )
}
