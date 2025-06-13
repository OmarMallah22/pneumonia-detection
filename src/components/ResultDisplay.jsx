import { useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, RotateCcw, Download, Share } from 'lucide-react'

const ResultDisplay = ({ result, onNewDiagnosis }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getResultIcon = (classification) => {
    switch (classification?.toLowerCase()) {
      case 'normal':
        return <CheckCircle className="w-16 h-16 text-green-600" />
      case 'bacterial pneumonia':
      case 'bacterial':
        return <AlertTriangle className="w-16 h-16 text-yellow-600" />
      case 'viral pneumonia':
      case 'viral':
        return <XCircle className="w-16 h-16 text-red-600" />
      default:
        return <AlertTriangle className="w-16 h-16 text-gray-600" />
    }
  }

  const getResultColor = (classification) => {
    switch (classification?.toLowerCase()) {
      case 'normal':
        return 'text-green-800 bg-green-100 border-green-200'
      case 'bacterial pneumonia':
      case 'bacterial':
        return 'text-yellow-800 bg-yellow-100 border-yellow-200'
      case 'viral pneumonia':
      case 'viral':
        return 'text-red-800 bg-red-100 border-red-200'
      default:
        return 'text-gray-800 bg-gray-100 border-gray-200'
    }
  }

  const getRecommendation = (classification) => {
    switch (classification?.toLowerCase()) {
      case 'normal':
        return 'The chest X-ray appears normal with no signs of pneumonia. Continue regular monitoring as appropriate.'
      case 'bacterial pneumonia':
      case 'bacterial':
        return 'Bacterial pneumonia detected. Consider antibiotic treatment and follow-up imaging. Consult with a specialist if needed.'
      case 'viral pneumonia':
      case 'viral':
        return 'Viral pneumonia detected. Supportive care is typically recommended. Monitor symptoms and consider follow-up evaluation.'
      default:
        return 'Please consult with a healthcare professional for proper interpretation of these results.'
    }
  }

  const downloadResult = () => {
    const data = {
      ...result,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diagnosis-result-${result.id || Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Chest X-ray Diagnosis Result',
          text: `Diagnosis: ${result.classification} (${result.confidence}% confidence)`,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  return (
    <div className="space-y-6 fade-in-up">
      {/* Main Result Card */}
      <div className={`card border-2 ${getResultColor(result.classification)}`}>
        <div className="text-center">
          <div className="mb-6">
            {getResultIcon(result.classification)}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Diagnosis Result
          </h2>
          
          <div className="mb-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {result.classification}
            </div>
            <div className="text-lg text-gray-600">
              Confidence: <span className="font-bold">{result.confidence}%</span>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full progress-fill ${
                  result.confidence >= 80 
                    ? 'bg-green-500' 
                    : result.confidence >= 60 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
            <p className="text-gray-700 text-sm">
              {getRecommendation(result.classification)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onNewDiagnosis}
              className="btn-primary inline-flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Analysis
            </button>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="btn-secondary inline-flex items-center justify-center"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="card fade-in-up">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Analysis Details</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Classification:</dt>
                  <dd className="font-medium">{result.classification}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Confidence Score:</dt>
                  <dd className="font-medium">{result.confidence}%</dd>
                </div>
                {result.model && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Model Used:</dt>
                    <dd className="font-medium">{result.model}</dd>
                  </div>
                )}
                {result.timestamp && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Analysis Time:</dt>
                    <dd className="font-medium">
                      {new Date(result.timestamp).toLocaleString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Image Information</h4>
              <dl className="space-y-2">
                {result.filename && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Filename:</dt>
                    <dd className="font-medium text-sm">{result.filename}</dd>
                  </div>
                )}
                {result.fileSize && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">File Size:</dt>
                    <dd className="font-medium">
                      {(result.fileSize / 1024 / 1024).toFixed(2)} MB
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={downloadResult}
              className="btn-secondary inline-flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Result
            </button>
            
            {navigator.share && (
              <button
                onClick={shareResult}
                className="btn-secondary inline-flex items-center justify-center"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Result
              </button>
            )}
          </div>
        </div>
      )}

      {/* Medical Disclaimer */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Medical Disclaimer</h4>
            <p className="text-gray-700 text-sm">
              This AI analysis is for educational and assistive purposes only. 
              It should not replace professional medical diagnosis or treatment. 
              Always consult with qualified healthcare providers for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay