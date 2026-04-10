const EmptyState = ({ title, description, icon: IconComponent = null, actionButton = null }) => {
  return (
    <div className='rounded-[18px] border border-dashed border-[rgba(125,78,57,0.45)] bg-[rgba(255,248,237,0.6)] p-8 text-center'>
      {IconComponent && <div className='mb-3'><IconComponent size={54} className='text-[#bf5b33]' style={{ margin: '0 auto' }} /></div>}
      <h3 className='font-semibold text-[#2e1d17] text-lg'>{title}</h3>
      {description && (
        <p className='mt-2 text-sm text-[#73544a]'>{description}</p>
      )}
      {actionButton && (
        <div className='mt-4'>
          {actionButton}
        </div>
      )}
    </div>
  )
}

export default EmptyState
