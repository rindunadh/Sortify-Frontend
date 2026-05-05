import { useEffect, useState } from 'react'

const impactCards = [
  {
    image: '/figma-assets/impact-left.png',
    alt: 'Fun recycling',
    title: 'Fun Recycling',
    description: 'Recycling made simple and enjoyable for everyone.',
  },
  {
    image: '/figma-assets/impact-center.png',
    alt: 'Waste sorted correctly',
    title: 'Waste Sorted Correctly',
    description: 'Improves accuracy in everyday waste sorting.',
  },
  {
    image: '/figma-assets/impact-right.png',
    alt: 'Hazardous waste separated',
    title: 'Hazardous Waste Separated',
    description: 'Reduces risks through proper hazardous waste handling.',
  },
]

function getImpactPosition(index, activeIndex) {
  if (index === activeIndex) return 'main'

  const offset = (index - activeIndex + impactCards.length) % impactCards.length
  return offset === 1 ? 'right' : 'left'
}

function ImpactSection() {
  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % impactCards.length)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <>
      {/* The empty impact-paper div creates the soft torn/gradient top edge. */}
      <section className="impact-section">
        <div className="impact-paper" />

        <h2>WHY DOES IT MATTER</h2>
        <p>Small actions, better planet.</p>

        <div className="impact-gallery">
          {impactCards.map((card, index) => {
            const position = getImpactPosition(index, activeIndex)

            return (
              <article
                className={`impact-card impact-card-${position}`}
                key={card.title}
                tabIndex="0"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-current={position === 'main' ? 'true' : undefined}
              >
                <img src={card.image} alt={card.alt} />

                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ImpactSection
