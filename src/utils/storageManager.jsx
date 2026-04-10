// LocalStorage Utilities with Error Handling
export const safeStorageGet = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    if (!item) return defaultValue
    
    const parsed = JSON.parse(item)
    return parsed
  } catch (error) {
    console.error(`Error retrieving from localStorage (${key}):`, error)
    return defaultValue
  }
}

export const safeStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error)
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Clearing old data may be needed.')
    }
    
    return false
  }
}

export const safeStorageRemove = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
    return false
  }
}

export const safeStorageClear = () => {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}

export const isStorageAvailable = () => {
  try {
    const testKey = '__storage-test__'
    localStorage.setItem(testKey, 'true')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export const getStorageSize = () => {
  let total = 0
  for (let key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += localStorage[key].length + key.length
    }
  }
  return (total / 1024).toFixed(2) // KB
}
