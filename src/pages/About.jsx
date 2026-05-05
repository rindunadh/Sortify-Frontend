import Navbar from '../components/Navbar'

function About() {
  return (
    <main className="sortify-page about-page-new">
      <Navbar />

      <section className="about-new-hero fade-in is-visible">
        <div className="about-new-hero-top" />

        <div className="about-new-hero-content">
          <h1>About this Project</h1>
          <p>
            Sortify is a web based platform created to support better waste
            management by helping individuals make more responsible disposal
            decisions. The project focuses on reducing confusion around waste
            classification and encouraging proper waste sorting at the household
            level. By making waste related information easier to access and
            understand, Sortify aims to promote sustainable habits, reduce
            environmental impact, and support more efficient waste management
            systems within communities.
          </p>
        </div>

        <div className="about-new-hero-bottom" />
      </section>

      <section className="about-new-scope">
        <div className="about-new-scope-circle" />
        <div className="about-new-scope-content">
          <h2>Project scope &amp; Limitation</h2>
          <p>
            Sortify focuses on helping household users identify common waste
            types and make better disposal decisions. The platform covers
            everyday waste such as plastic, paper, organic, and basic hazardous
            waste to encourage proper sorting at the source.
          </p>
          <p>
            The system&apos;s accuracy depends on image quality and available
            data. Disposal recommendations may be limited by location coverage,
            and Sortify serves as a supporting tool rather than a replacement
            for official waste management services.
          </p>
        </div>
      </section>

      <section className="about-new-how">
        <h2>How it works</h2>
        <p className="about-new-how-subtitle">3 Simple Steps</p>

        <div className="about-new-how-wrapper">
          <svg
            className="about-new-wave-text"
            aria-hidden="true"
            viewBox="0 0 1440 280"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="about-wave-path"
                d="M -120 170 C 100 56 260 244 438 164 C 620 82 748 218 908 154 C 1088 82 1196 248 1560 106"
              />
            </defs>
            <text>
              <textPath href="#about-wave-path" startOffset="-16%">
                SORT WISELY CREATE BETTER OUTCOMES SORT WISELY CREATE BETTER OUTCOMES
                <animate
                  attributeName="startOffset"
                  dur="14s"
                  from="-16%"
                  repeatCount="indefinite"
                  to="28%"
                />
              </textPath>
            </text>
          </svg>

          <div className="about-new-cards">
            <article className="about-new-card about-new-card-1">
              <div className="about-new-card-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="74"
                  height="74"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                  <path d="M4 6h3" />
                  <path d="M18 10h.01" />
                </svg>
              </div>
              <h3>1. Capture &amp; Upload</h3>
              <p>Scan the Waste</p>
            </article>

            <article className="about-new-card about-new-card-2">
              <div className="about-new-card-icon about-new-card-icon-ai">
                <span className="ai-text">AI</span>
                <span className="sparkle sparkle-1" />
                <span className="sparkle sparkle-2" />
              </div>
              <h3>2. AI Analysis</h3>
              <p>Smart Detection</p>
            </article>

            <article className="about-new-card about-new-card-3">
              <div className="about-new-card-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="78"
                  height="78"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                >
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5 9.5V21h14V9.5" />
                  <path d="M9 21v-7h6v7" />
                  <path d="M9.8 10.8a3.4 3.4 0 0 1 4.4 0" />
                  <path d="m8.8 14.5 2.1.1-.8 1.9" />
                  <path d="m15.2 14.5-2.1.1.8 1.9" />
                </svg>
              </div>
              <h3>3. Disposal Guide</h3>
              <p>Get sorting tips</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About

