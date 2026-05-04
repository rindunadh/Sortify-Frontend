import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

/**
 * Simple About page — placeholder content describing Sortify's mission.
 */
function About() {
  return (
    <main className="sortify-page about-page">
      <Navbar />

      <div className="about-container fade-in is-visible">
        <h1>About Sortify</h1>

        <p className="about-lead">
          Sortify is an AI-powered web application that turns waste
          identification and sorting into a simple photo-based action.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>📸 Snap</h3>
            <p>Take a photo or upload an image of the waste item.</p>
          </div>

          <div className="about-card">
            <h3>🤖 Classify</h3>
            <p>
              Our AI sorts the item into Organic, Plastic, Paper, Glass, or
              Hazardous.
            </p>
          </div>

          <div className="about-card">
            <h3>♻️ Dispose</h3>
            <p>
              Get step-by-step disposal guidance tailored to the waste type.
            </p>
          </div>

          <div className="about-card">
            <h3>📍 Locate</h3>
            <p>
              Find the nearest Bank Sampah or TPS with a one-tap navigation
              link.
            </p>
          </div>
        </div>

        <Link to="/analyze" className="about-cta">
          Try Sortify Now
        </Link>
      </div>
    </main>
  )
}

export default About