import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import UploadStep from '../components/analyze/UploadStep'
import ResultStep from '../components/analyze/ResultStep'
import DisposalSteps from '../components/analyze/DisposalSteps'
import NearestDisposal from '../components/analyze/NearestDisposal'
import {
  classifyWasteImage,
  fetchClassifierCategories,
  fetchWasteInfo,
} from '../services/sortifyApi'

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

function isSupportedImage(file) {
  const extension = file?.name?.split('.').pop()?.toLowerCase()

  return (
    SUPPORTED_IMAGE_TYPES.includes(file?.type) ||
    SUPPORTED_IMAGE_EXTENSIONS.includes(extension)
  )
}

function getAnalyzeErrorMessage(error) {
  const message = String(error?.message || '').toLowerCase()

  if (
    message.includes('format') ||
    message.includes('unsupported') ||
    message.includes('tidak didukung')
  ) {
    return 'Unsupported file format. Please upload a JPG, PNG, or WEBP image.'
  }

  if (
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('backend') ||
    message.includes('load failed')
  ) {
    return 'Could not fetch data from the backend. Please make sure the backend server is running and try again.'
  }

  return 'Could not analyze this image. Please try again with a clear JPG, PNG, or WEBP photo.'
}

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
  const [wasteInfo, setWasteInfo] = useState({})
  const [categoryOptions, setCategoryOptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    Promise.allSettled([fetchWasteInfo(), fetchClassifierCategories()])
      .then(([infoResult, categoriesResult]) => {
        if (isMounted) {
          setWasteInfo(
            infoResult.status === 'fulfilled' ? infoResult.value : {}
          )
          setCategoryOptions(
            categoriesResult.status === 'fulfilled'
              ? categoriesResult.value
              : []
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleFileSelected = (selected) => {
    setFile(selected)
    setResult(null)
    setError('')

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setPreviewUrl(selected ? URL.createObjectURL(selected) : null)
  }

  const handleAnalyze = async () => {
    if (!file) return

    if (!isSupportedImage(file)) {
      setResult(null)
      setError('Unsupported file format. Please upload a JPG, PNG, or WEBP image.')
      return
    }

    setIsAnalyzing(true)
    setError('')

    try {
      const classification = await classifyWasteImage(file)
      setResult(classification)
    } catch (err) {
      setResult(null)
      setError(getAnalyzeErrorMessage(err))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError('')
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

        {error && (
          <p className="api-status api-status--warning" role="status">
            {error}
          </p>
        )}

        {result && (
          <>
            <ResultStep previewUrl={previewUrl} result={result} />
            <DisposalSteps
              detectedCategory={result.category}
              detectedItem={result.items?.[0]}
              resultRecommendation={result.recommendation}
              wasteInfo={wasteInfo}
              categoryOptions={categoryOptions}
            />
            <NearestDisposal />
          </>
        )}
      </div>
    </main>
  )
}

export default Analyze
