const impactCards = [
  {
    image: '/figma-assets/impact-left.png',
    alt: 'Fun recycling',
    title: 'Fun Recycling',
    description: 'Description',
    variant: 'side',
  },
  {
    image: '/figma-assets/impact-center.png',
    alt: 'Waste sorted correctly',
    title: 'Waste Sorted Correctly',
    description: 'More sustainable future.',
    variant: 'main',
  },
  {
    image: '/figma-assets/impact-right.png',
    alt: 'Hazardous waste separated',
    title: 'Hazardous Waste Separated',
    description: 'Description',
    variant: 'side',
  },
]

function ImpactSection() {
  return (
    <>
      {/* The empty impact-paper div creates the soft torn/gradient top edge. */}
      <section className="impact-section">
        <div className="impact-paper" />

        <h2>WHY DOES IT MATTER</h2>
        <p>Small actions, better planet.</p>

        <div className="impact-gallery">
          {impactCards.map((card) => (
            <article
              className={`impact-card impact-card-${card.variant}`}
              key={card.title}
            >
              <img src={card.image} alt={card.alt} />

              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default ImpactSection