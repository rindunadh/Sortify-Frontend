const useSteps = [
  'Take a photo of your waste item or upload an existing image through the platform.',
  'Sortify identifies the waste category, such as plastic, paper, or organic waste.',
  'Select how you want to dispose of the waste: waste bank, temporary disposal site (TPS), or self-processing.',
  'Receive clear instructions and recommendations based on your choice.',
]

function HowToUseSection() {
  return (
    // The index controls both the visible number and the matching card rotation.
    <section id="analyze" className="steps-section">
      <h2>How to Use Sortify</h2>

      <div className="steps-list">
        {useSteps.map((step, index) => (
          <article className={`step-card step-card-${index + 1}`} key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowToUseSection
