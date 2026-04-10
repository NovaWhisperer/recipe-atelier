import { useState } from 'react'
import { FiImage } from 'react-icons/fi'
import { IMAGE_CONFIG } from '../constants/appSettings'
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageOptimization'

const ImageWithFallback = ({
  src,
  alt = 'Recipe image',
  className = 'w-full h-full object-cover',
  width = 400,
  height = 300,
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const imageSrc = hasError ? IMAGE_CONFIG.placeholderUrl : getOptimizedImageUrl(src, width, height)
  const srcSet = generateImageSrcSet(imageSrc)

  return (
    <div className='relative overflow-hidden bg-linear-to-br from-gray-200 to-gray-300'>
      {/* Skeleton/Loading State */}
      {isLoading && (
        <div className='absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200' />
      )}

      {/* Image */}
      <img
        src={imageSrc}
        srcSet={srcSet}
        sizes='(max-width: 640px) 400px, (max-width: 1024px) 600px, 1000px'
        alt={alt}
        className={className}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        aria-label={alt}
      />

      {/* Error Badge */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
          <RiImageAddFill size={40} className='text-white' />
        </div>
      )}
    </div>
  )
}

export default ImageWithFallback
