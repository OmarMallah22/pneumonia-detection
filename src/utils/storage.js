/**
 * LocalStorage utilities for managing diagnosis results
 */

const STORAGE_KEY = 'pneumonia_diagnosis_results'
const MAX_RESULTS = 50 // Maximum number of results to store

/**
 * Get all stored diagnosis results
 * @returns {Array} Array of diagnosis results
 */
export const getStoredResults = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const results = JSON.parse(stored)
    return Array.isArray(results) ? results : []
  } catch (error) {
    console.error('Error reading stored results:', error)
    return []
  }
}

/**
 * Save a new diagnosis result
 * @param {Object} result - The diagnosis result to save
 */
export const saveResult = (result) => {
  try {
    const existing = getStoredResults()
    
    // Add unique ID if not present
    if (!result.id) {
      result.id = Date.now().toString()
    }
    
    // Add timestamp if not present
    if (!result.timestamp) {
      result.timestamp = new Date().toISOString()
    }
    
    // Add to beginning of array (newest first)
    const updated = [result, ...existing]
    
    // Keep only the most recent results
    const trimmed = updated.slice(0, MAX_RESULTS)
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    
    console.log('Result saved successfully:', result.id)
  } catch (error) {
    console.error('Error saving result:', error)
    // If localStorage is full, try to clear some old results
    if (error.name === 'QuotaExceededError') {
      try {
        const existing = getStoredResults()
        const reduced = existing.slice(0, Math.floor(MAX_RESULTS / 2))
        localStorage.setItem(STORAGE_KEY, JSON.stringify([result, ...reduced]))
        console.log('Saved result after clearing storage')
      } catch (secondError) {
        console.error('Failed to save even after clearing storage:', secondError)
      }
    }
  }
}

/**
 * Remove a specific result by ID
 * @param {string} resultId - The ID of the result to remove
 */
export const removeResult = (resultId) => {
  try {
    const existing = getStoredResults()
    const filtered = existing.filter(result => result.id !== resultId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    console.log('Result removed successfully:', resultId)
  } catch (error) {
    console.error('Error removing result:', error)
  }
}

/**
 * Clear all stored results
 */
export const clearAllResults = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('All results cleared successfully')
  } catch (error) {
    console.error('Error clearing results:', error)
  }
}

/**
 * Get storage usage information
 * @returns {Object} Storage usage statistics
 */
export const getStorageInfo = () => {
  try {
    const results = getStoredResults()
    const storageData = localStorage.getItem(STORAGE_KEY) || ''
    const sizeInBytes = new Blob([storageData]).size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    
    return {
      count: results.length,
      sizeBytes: sizeInBytes,
      sizeKB: sizeInKB,
      maxResults: MAX_RESULTS
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return {
      count: 0,
      sizeBytes: 0,
      sizeKB: '0.00',
      maxResults: MAX_RESULTS
    }
  }
}

/**
 * Export all results as JSON
 * @returns {string} JSON string of all results
 */
export const exportResults = () => {
  try {
    const results = getStoredResults()
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      totalResults: results.length,
      results: results
    }
    
    return JSON.stringify(exportData, null, 2)
  } catch (error) {
    console.error('Error exporting results:', error)
    return null
  }
}

/**
 * Import results from JSON string
 * @param {string} jsonString - JSON string containing results
 * @returns {boolean} Success status
 */
export const importResults = (jsonString) => {
  try {
    const importData = JSON.parse(jsonString)
    
    if (!importData.results || !Array.isArray(importData.results)) {
      throw new Error('Invalid import format')
    }
    
    const existing = getStoredResults()
    const imported = importData.results
    
    // Merge with existing results, avoiding duplicates
    const merged = [...imported, ...existing]
    const unique = merged.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    )
    
    // Keep only the most recent results
    const trimmed = unique.slice(0, MAX_RESULTS)
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    console.log(`Imported ${imported.length} results successfully`)
    
    return true
  } catch (error) {
    console.error('Error importing results:', error)
    return false
  }
}