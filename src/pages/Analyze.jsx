import { useState } from 'react'
import Navbar from '../components/Navbar'
import UploadStep from '../components/analyze/UploadStep'
import ResultStep from '../components/analyze/ResultStep'
import DisposalSteps from '../components/analyze/DisposalSteps'
import NearestDisposal from '../components/analyze/NearestDisposal'
import { classifyWaste } from '../data/wasteData'

/**
 * Analyze page orchestrates the full Sortify flow:
 * 1. Upload a photo
 * 2. Show the classification result
 * 3. Show disposal steps for the detected category
 * 4. Show nearest disposal facilities
 *
 * State is kept here so each sub-step stays presentational / stateless.
 */
function Analyze() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null) // { category, confidence, items }
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileSelected = (selected) => {
    setFile(selected)
    setResult(null)

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setPreviewUrl(selected ? URL.createObjectURL(selected) : null)
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate network/model latency so the loading UI is visible.
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const classification = classifyWaste(file)
    setResult(classification)
    setIsAnalyzing(false)
  }

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setFile(null)
    setPreviewUrl(null)
    setResult(null)
  }

  return (
    <main className="sortify-page analyze-page">
      <Navbar />

      <div className="analyze-container">
        <header className="analyze-header fade-in is-visible">
          <span className="analyze-eyebrow">Main Feature</span>
          <h1>Identify &amp; Sort Your Waste</h1>
          <p>
            Upload a photo of any waste item and Sortify will tell you exactly
            how and where to dispose of it responsibly.
          </p>
        </header>

        <UploadStep
          file={file}
          previewUrl={previewUrl}
          isAnalyzing={isAnalyzing}
          onFileSelected={handleFileSelected}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          hasResult={Boolean(result)}
        />

        {result && (
          <>
            <ResultStep previewUrl={previewUrl} result={result} />
            <DisposalSteps detectedCategory={result.category} />
            <NearestDisposal detectedCategory={result.category} />
          </>
        )}
      </div>
    </main>
  )
}

export default Analyze