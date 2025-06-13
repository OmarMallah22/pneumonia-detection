import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultDisplay from "../components/ResultDisplay";

const Diagnosis = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnosisComplete = (diagnosisResult) => {
    setResult(diagnosisResult);
    setLoading(false);
  };

  const handleLoadingStart = () => {
    setLoading(true);
    setResult(null);
  };

  const handleNewDiagnosis = () => {
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chest X-Ray Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a chest X-ray image to receive an AI-powered diagnosis for
            pneumonia detection. Our system will analyze the image and provide
            classification with confidence scores.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!result && !loading && (
            <UploadForm
              onLoadingStart={handleLoadingStart}
              onDiagnosisComplete={handleDiagnosisComplete}
            />
          )}

          {loading && (
            <div className="card text-center py-16">
              <div className="loading-spinner w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analyzing X-ray...
              </h3>
              <p className="text-gray-600">
                Our AI model is processing your image. This may take a few
                seconds.
              </p>
            </div>
          )}

          {result && (
            <ResultDisplay
              result={result}
              onNewDiagnosis={handleNewDiagnosis}
            />
          )}
        </div>

        {/* Information Panel */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Supported Image Formats
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• JPEG (.jpg, .jpeg)</li>
              <li>• PNG (.png)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Recommended resolution: 224x224 or higher</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Classification Types
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <span className="text-green-600 font-medium">Normal</span> -
                Healthy chest X-ray
              </li>
              <li>
                • <span className="text-yellow-600 font-medium">Lung-Opacity</span>{" "}
                - Lung-Opacity pneumonia
              </li>
              <li>
                • <span className="text-red-600 font-medium">Viral</span> -
                Viral pneumonia
              </li>
              <li>
                • <span className="text-blue-600 font-medium">COVID</span> -
                COVID-19 related pneumonia
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
