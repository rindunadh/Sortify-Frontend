import { useState } from 'react'
import {
  CATEGORY_LIST,
  WASTE_CATEGORIES,
  DISPOSAL_STEPS,
  TUTORIAL_LINKS,
} from '../../data/wasteData'

/**
 * Step 3 – Disposal guide: category filter pills + numbered instructions
 * for the currently selected category. Defaults to the AI-detected one.
 */
function DisposalSteps({ detectedCategory }) {
  const [selected, setSelected] = useState(detectedCategory)

  const category = WASTE_CATEGORIES[selected]
  const steps = DISPOSAL_STEPS[selected] || []

  return (
    <section className="analyze-card fade-in is-visible">
      <div className="analyze-step-head">
        <span className="step-badge">Step 3</span>
        <h2>How to Dispose</h2>
      </div>

      <div className="pills-row">
        {CATEGORY_LIST.map((cat) => {
          const active = cat.id === selected

          return (
            <button
              key={cat.id}
              type="button"
              className={`pill ${active ? 'pill--active' : ''}`}
              style={
                active
                  ? { background: cat.color, color: '#fff' }
                  : {}
              }
              onClick={() => setSelected(cat.id)}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      <div className="steps-header">
        <span
          className="category-tag"
          style={{ background: category.color }}
        >
          {category.label}
        </span>

        <span className="steps-count">
          {steps.length} steps
        </span>
      </div>

      <ol className="steps-list">
        {steps.map((step, idx) => (
          <li key={idx} className="steps-item">
            <span
              className="steps-number"
              style={{ background: category.color }}
            >
              {idx + 1}
            </span>

            <span className="steps-text">{step}</span>
          </li>
        ))}
      </ol>

      <a
        href={TUTORIAL_LINKS[selected]}
        target="_blank"
        rel="noreferrer"
        className="tutorial-link"
      >
        ▶ Watch creative reuse tutorials for {category.label}
      </a>
    </section>
  )
}

export default DisposalSteps