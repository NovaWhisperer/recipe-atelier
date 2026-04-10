import { IMAGE_CONFIG } from '../constants/appSettings'

// Image Loading States
export const ImageLoadStates = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
}

// Check if URL is valid image
export const isValidImageUrl = async (url) => {
  if (!url) return false
  
  try {
    // Check URL format
    new URL(url)
    
    // Perform a HEAD request with no-cors mode
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
    })
    
    return response.ok || response.status === 0 // 0 for CORS blocked but likely valid
  } catch {
    return false
  }
}

// Preload image
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

// Get optimized image URL (using query params for common CDNs)
export const getOptimizedImageUrl = (url, width = 400, height = 300) => {
  if (!url) return IMAGE_CONFIG.placeholderUrl
  
  try {
    const urlObj = new URL(url)
    
    // Handle Unsplash
    if (urlObj.hostname.includes('unsplash.com')) {
      return `${url}?w=${width}&h=${height}&fit=crop&q=80`
    }
    
    // Handle other CDNs similarly if needed
    return url
  } catch {
    return IMAGE_CONFIG.placeholderUrl
  }
}

// Generate image srcSet for responsive images
export const generateImageSrcSet = (url) => {
  if (!url) return ''
  
  try {
    const baseUrl = new URL(url)
    
    if (baseUrl.hostname.includes('unsplash.com')) {
      return [
        `${url}?w=300 300w`,
        `${url}?w=600 600w`,
        `${url}?w=1000 1000w`,
      ].join(', ')
    }
    
    return ''
  } catch {
    return ''
  }
}

// Calculate image dimensions with aspect ratio
export const getAspectRatioDimensions = (width, aspectRatio = 4 / 3) => {
  return {
    width,
    height: Math.round(width / aspectRatio),
  }
}

// Compress image URL check
export const isImageUrlAccessible = async (url, timeout = 5000) => {
  return Promise.race([
    isValidImageUrl(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Image check timeout')), timeout)
    ),
  ]).catch(() => true) // Return true if timeout (assume valid)
}
