import { WASTE_CATEGORIES } from '../../data/wasteData'
import { normalizeCategory } from '../../services/sortifyApi'

/**
 * Step 2 – Result: displays the preview alongside the detected category,
 * confidence score, and detected items as colored tags.
 */
function ResultStep({ previewUrl, result }) {
  const category = WASTE_CATEGORIES[result.category] || WASTE_CATEGORIES.residual
  const recommendation = result.recommendation
  const recommendationCategory = recommendation?.category
    ? normalizeCategory(recommendation.category)
    : ''
  const detectedLabel =
    WASTE_CATEGORIES[recommendationCategory]?.label || category.label
  const description = recommendation?.description || category.description
  const confidencePct = Math.round(result.confidence * 100)

  return (
    <section className="analyze-card fade-in is-visible">
      <div className="analyze-step-head">
        <span className="step-badge">Step 2</span>
        <h2>Classification Result</h2>
      </div>

      <div className="result-grid">
        <div className="result-image">
          <img src={previewUrl} alt="Analyzed waste" />
        </div>

        <div className="result-info">
          <div className="result-confidence">
            <span>AI Confidence</span>

            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${confidencePct}%`,
                  background: category.color,
                }}
              />
            </div>

            <span className="confidence-value">
              {confidencePct}%
            </span>
          </div>

          <div className="result-category">
            <span className="result-label-text">
              Detected Category
            </span>

            <span
              className="category-tag category-tag--large"
              style={{ background: category.color }}
            >
              {detectedLabel}
            </span>
          </div>

          <p className="result-description">
            {description}
          </p>

          <div className="result-items">
            <span className="result-label-text">
              Detected Items
            </span>

            <div className="result-items-list">
              {result.items.map((item) => (
                <span
                  key={item}
                  className="category-tag"
                  style={{ background: category.color }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultStep
