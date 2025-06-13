import axios from 'axios'

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TIMEOUT = 30000 // 30 seconds

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// Request interceptor for auth and logging
api.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
      return Promise.reject(new Error('Session expired. Please login again.'))
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.')
    }
    
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        throw new Error(data?.message || 'Invalid request. Please check your image.')
      case 413:
        throw new Error('File too large. Please upload a smaller image.')
      case 415:
        throw new Error('Unsupported file type. Please upload a JPEG or PNG image.')
      case 500:
        throw new Error('Server error. Please try again later.')
      case 503:
        throw new Error('Service temporarily unavailable. Please try again.')
      default:
        throw new Error(data?.message || `Server error (${status}). Please try again.`)
    }
  }
)

/**
 * Upload image for pneumonia diagnosis
 * @param {File} imageFile - The chest X-ray image file
 * @returns {Promise<Object>} Diagnosis result with classification and confidence
 */
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    // For development/demo purposes, we'll simulate the API response
    // In production, uncomment the line below and remove the simulation
    // const response = await api.post('/upload', formData)

    // DEMO SIMULATION - Remove in production
    const simulatedResponse = await simulateApiCall(imageFile)
    return simulatedResponse

    // PRODUCTION CODE - Uncomment when backend is available
    // return {
    //   id: Date.now().toString(),
    //   classification: response.data.classification,
    //   confidence: response.data.confidence,
    //   gradCam: response.data.gradCam, // Optional Grad-CAM visualization
    //   processingTime: response.data.processingTime
    // }
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}

// DEMO SIMULATION FUNCTION - Remove in production
const simulateApiCall = (imageFile) => {
  return new Promise((resolve) => {
    // Simulate API processing time
    setTimeout(() => {
      // Mock different results based on image name or random
      const classifications = ['Normal', 'Bacterial Pneumonia', 'Viral Pneumonia']
      const randomClassification = classifications[Math.floor(Math.random() * classifications.length)]
      
      // Generate realistic confidence scores based on classification
      let confidence
      switch (randomClassification) {
        case 'Normal':
          confidence = Math.floor(Math.random() * 15) + 85 // 85-100%
          break
        case 'Bacterial Pneumonia':
          confidence = Math.floor(Math.random() * 20) + 75 // 75-95%
          break
        case 'Viral Pneumonia':
          confidence = Math.floor(Math.random() * 25) + 70 // 70-95%
          break
        default:
          confidence = Math.floor(Math.random() * 30) + 60 // 60-90%
      }

      resolve({
        id: Date.now().toString(),
        classification: randomClassification,
        confidence: confidence,
        processingTime: Math.floor(Math.random() * 3000) + 1000, // 1-4 seconds
        timestamp: new Date().toISOString()
      })
    }, Math.floor(Math.random() * 2000) + 1500) // 1.5-3.5 seconds delay
  })
}

export default api