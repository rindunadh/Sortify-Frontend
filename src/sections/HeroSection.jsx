import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

/**
 * Hero section: brand navbar, headline, copy, and CTA that routes
 * the user to the main Analyze feature.
 */

function HeroSection() {
  return (
    <section className="hero-section">
      <Navbar />

      <div className="hero-content fade-in">
        <h1>Confused About Waste Sorting?</h1>

        <p>
          Sortify is here to help you by just uploading a photo and let Sortify
          do the rest.
        </p>

        <Link to="/analyze" className="hero-cta">
          Try Now
        </Link>
      </div>
    </section>
  )
}

export default HeroSection