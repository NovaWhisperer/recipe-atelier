const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 py-8'>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-[rgba(191,91,51,0.2)] border-t-[#bf5b33]`}
      />
      {text && <p className='text-sm text-[#73544a]'>{text}</p>}
    </div>
  )
}

export default LoadingSpinner
