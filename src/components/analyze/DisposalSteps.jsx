import { useState } from 'react'
import {
  CATEGORY_LIST,
  WASTE_CATEGORIES,
  DISPOSAL_STEPS,
  TUTORIAL_LINKS,
} from '../../data/wasteData'
import { normalizeCategory } from '../../services/sortifyApi'

function toArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

function getHandlingMedia(handling) {
  return toArray(handling).flatMap((item, itemIndex) => {
    const label = item?.label || item?.jenis || 'Tutorial'
    const description = item?.description || ''
    const videos = toArray(item?.video_url).map((url, index) => ({
      type: 'video',
      url,
      label,
      description,
      id: `video-${itemIndex}-${index}`,
    }))
    const articles = toArray(item?.article_url).map((url, index) => ({
      type: 'article',
      url,
      label,
      description,
      id: `article-${itemIndex}-${index}`,
    }))

    return [...videos, ...articles]
  })
}

function dedupeTutorials(tutorials) {
  const seen = new Set()
  return tutorials.filter((tutorial) => {
    const key = `${tutorial.type}:${tutorial.url}`
    if (!tutorial.url || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const ITEM_LABELS = {
  battery: 'battery',
  biological: 'organic waste',
  cardboard: 'cardboard',
  paper: 'paper',
  clothes: 'clothes',
  shoes: 'shoes',
  glass: 'glass',
  metal: 'metal',
  plastic: 'plastic',
  trash: 'residual waste',
}

/**
 * Step 3 - Disposal guide: category filter pills + numbered instructions
 * for the currently selected category. Defaults to the AI-detected one.
 */
function DisposalSteps({
  detectedCategory,
  detectedItem,
  resultRecommendation,
  wasteInfo = {},
  categoryOptions = [],
}) {
  const [selected, setSelected] = useState(detectedCategory)

  const selectedRecommendation =
    resultRecommendation &&
    normalizeCategory(resultRecommendation.category) === selected
      ? resultRecommendation
      : null
  const category = {
    ...WASTE_CATEGORIES[selected],
    ...wasteInfo[selected],
    color: WASTE_CATEGORIES[selected]?.color || WASTE_CATEGORIES.residual.color,
  }
  const categories =
    categoryOptions.length > 0
      ? categoryOptions.map((option) => ({
          ...option,
          ...wasteInfo[option.id],
          color:
            WASTE_CATEGORIES[option.id]?.color ||
            option.color ||
            WASTE_CATEGORIES.residual.color,
        }))
      : CATEGORY_LIST
  const steps =
    selectedRecommendation?.disposal_instructions ||
    wasteInfo[selected]?.steps ||
    DISPOSAL_STEPS[selected] ||
    []
  const handling = Array.isArray(selectedRecommendation?.penanganan)
    ? selectedRecommendation.penanganan
    : selectedRecommendation?.penanganan || selectedRecommendation?.mandiri
  const recommendationTutorials = getHandlingMedia(handling)
  const backendTutorials = dedupeTutorials(
    recommendationTutorials.length > 0
      ? recommendationTutorials
      : wasteInfo[selected]?.tutorials || []
  )
  const tutorialItems =
    backendTutorials.length > 0
      ? backendTutorials
      : [
          {
            id: 'fallback-tutorial',
            type: 'article',
            url: wasteInfo[selected]?.tutorialUrl || TUTORIAL_LINKS[selected],
            label: `Tutorial for ${category.label}`,
          },
        ].filter((item) => item.url)
  const videoTutorials = tutorialItems.filter((item) => item.type === 'video')
  const articleTutorials = tutorialItems.filter((item) => item.type === 'article')
  const tutorialSubject =
    selectedRecommendation && detectedItem
      ? ITEM_LABELS[detectedItem] || detectedItem
      : category.label

  return (
    <section className="analyze-card fade-in is-visible">
      <div className="analyze-step-head">
        <span className="step-badge">Step 3</span>
        <h2>How to Dispose</h2>
      </div>

      <div className="pills-row">
        {categories.map((cat) => {
          const active = cat.id === selected

          return (
            <button
              key={cat.id}
              type="button"
              className={`pill ${active ? 'pill--active' : ''}`}
              style={active ? { background: cat.color, color: '#fff' } : {}}
              onClick={() => setSelected(cat.id)}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      <div className="steps-header">
        <span className="category-tag" style={{ background: category.color }}>
          {category.label}
        </span>

        <span className="steps-count">{steps.length} steps</span>
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

      {(videoTutorials.length > 0 || articleTutorials.length > 0) && (
        <div className="tutorial-section">
          <div className="tutorial-section-head">
            <span>Watch creative reuse tutorials for {tutorialSubject}</span>
          </div>

          {videoTutorials.length > 0 && (
            <div className="tutorial-video-grid">
              {videoTutorials.map((tutorial, index) => (
                <article className="tutorial-video-item" key={tutorial.id}>
                  <iframe
                    src={tutorial.url}
                    title={`${tutorial.label} ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="tutorial-video-copy">
                    <strong>{tutorial.label}</strong>
                    {tutorial.description && <p>{tutorial.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}

          {articleTutorials.length > 0 && (
            <div className="tutorial-article-row">
              {articleTutorials.map((tutorial) => (
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noreferrer"
                  className="tutorial-link"
                  key={tutorial.id}
                >
                  Read article: {tutorial.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default DisposalSteps
