const problemItems = [
  { text: 'Waste volume keeps increasing', side: 'left', size: 'wide' },
  { text: 'Waste is not properly sorted', side: 'left', size: 'small' },
  { text: 'Different waste gets mixed', side: 'left', size: 'medium' },
  { text: 'Recycling becomes ineffective', side: 'right', size: 'wide' },
  { text: 'Hazardous waste is misplaced', side: 'right', size: 'small' },
  { text: 'Environmental pollution increases', side: 'right', size: 'medium' },
]

function ProblemCard({ item }) {
  return (
    <div className={`problem-card problem-card-${item.size}`}>
      <p>{item.text}</p>
    </div>
  )
}

function ProblemSection() {
  // The side value lets us reuse the same data for the left and right columns.
  const leftProblems = problemItems.filter((item) => item.side === 'left')
  const rightProblems = problemItems.filter((item) => item.side === 'right')

  return (
    <section id="about" className="problem-section">
      <h2>The Problem</h2>

      <div className="problem-layout">
        <div className="problem-column problem-column-left">
          {leftProblems.map((item) => (
            <ProblemCard item={item} key={item.text} />
          ))}
        </div>

        <img
          className="problem-image"
          src="/figma-assets/problem-waste.png"
          alt="Mixed waste pile"
        />

        <div className="problem-column problem-column-right">
          {rightProblems.map((item) => (
            <ProblemCard item={item} key={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection