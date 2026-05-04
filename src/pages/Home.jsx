import { useEffect } from 'react'
// import HeroSection from './sections/HeroSection'
// import ProblemSection from './sections/ProblemSection'
// import SolutionSection from './sections/SolutionSection'
// import HowToUseSection from './sections/HowToUseSection'
// import ImpactSection from './sections/ImpactSection'
// the correct import
import HeroSection from "../sections/HeroSection";
import ProblemSection from "../sections/ProblemSection";
import SolutionSection from "../sections/SolutionSection";
import HowToUseSection from '../sections/HowToUseSection'
import ImpactSection from '../sections/ImpactSection'

/**
 * Home page: wraps the 5 landing sections and sets up a scroll-triggered
 * fade-in observer for any element tagged with `.fade-in`.
 */
function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const els = document.querySelectorAll('.fade-in')
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="sortify-page">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowToUseSection />
      <ImpactSection />
    </main>
  )
}

export default Home
