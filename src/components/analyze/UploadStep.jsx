import { useRef, useState } from 'react'

/**
 * Step 1 – Upload: drag-and-drop area + file input + preview + analyze CTA.
 * Fully controlled: all state is owned by the parent Analyze page.
 */
function UploadStep({
  file,
  previewUrl,
  isAnalyzing,
  onFileSelected,
  onAnalyze,
  onReset,
  hasResult,
}) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const openPicker = () => inputRef.current?.click()

  const handleChange = (e) => {
    const f = e.target.files?.[0]
    if (f) onFileSelected(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const f = e.dataTransfer.files?.[0]
    if (f && f.type.startsWith('image/')) {
      onFileSelected(f)
    }
  }

  return (
    <section className="analyze-card fade-in is-visible">
      <div className="analyze-step-head">
        <span className="step-badge">Step 1</span>
        <h2>Upload Your Waste Photo</h2>
      </div>

      {!previewUrl && (
        <div
          className={`upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openPicker()
            }
          }}
        >
          <div className="upload-icon" aria-hidden="true">
            📷
          </div>

          <p className="upload-primary">
            Drag & drop an image here, or click to browse
          </p>

          <p className="upload-secondary">
            Supports JPG, PNG, WEBP — up to 10 MB
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            hidden
          />
        </div>
      )}

      {previewUrl && (
        <div className="upload-preview">
          <img src={previewUrl} alt="Uploaded waste preview" />

          <div className="upload-preview-meta">
            <p className="upload-filename">{file.name}</p>
            <p className="upload-filesize">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : ''}
            </p>
          </div>

          <div className="upload-actions">
            {!hasResult && (
              <button
                type="button"
                className="btn-primary"
                onClick={onAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span
                      className="spinner"
                      aria-hidden="true"
                    />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </button>
            )}

            <button
              type="button"
              className="btn-secondary"
              onClick={onReset}
              disabled={isAnalyzing}
            >
              {hasResult ? 'Start Over' : 'Change Photo'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default UploadStep
