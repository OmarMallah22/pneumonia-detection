import { useState, useRef } from "react";
import axios from "axios";
import { Upload, FileX, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const UploadForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);

  const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    if (!validFileTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, JPG, or PNG)";
    }
    if (file.size > maxFileSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFile = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select an image file");
      toast.error("Please select an image file");
      return;
    }

    try {
      toast.loading("Sending to AI model...", { id: "predict" });
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://my-fastapi-app-1060655421000.us-central1.run.app/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data);
      toast.success("Prediction complete", { id: "predict" });
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Prediction failed";
      setError(errorMessage);
      toast.error(errorMessage, { id: "predict" });
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setError("");
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : error && !selectedFile
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />

          {preview ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-xs max-h-64 rounded-lg shadow-sm mx-auto"
                />
                <button
                  onClick={clearSelection}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <FileX className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="font-semibold">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-gray-400 mx-auto" />
              <p className="text-lg font-semibold">Upload Chest X-ray Image</p>
              <p className="text-gray-600">
                Drag and drop your image here, or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                Choose File
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="btn-primary text-lg px-8 py-4"
          >
            Analyze X-ray
          </button>
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl font-semibold text-center mb-4">
            Diagnosis Result
          </h3>
          <div className="text-center text-lg mb-2">
            <span className="font-medium">Prediction:</span>{" "}
            <span className="font-bold text-blue-600">
              {prediction.predicted_class}
            </span>
          </div>
          <div className="text-center text-md mb-4">
            <span className="font-medium">Confidence:</span>{" "}
            <span className="font-semibold">
              {(prediction.confidence * 100).toFixed(2)}%
            </span>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">All Predictions:</h4>
            <ul className="space-y-1">
              {Object.entries(prediction.all_predictions).map(
                ([label, score]) => (
                  <li
                    key={label}
                    className="flex justify-between border-b py-1 text-sm"
                  >
                    <span>{label}</span>
                    <span className="font-semibold">
                      {(score * 100).toFixed(2)}%
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
