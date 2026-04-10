import { memo } from 'react'

const PaginationControls = memo(({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-4 rounded-lg bg-[rgba(255,250,243,0.86)] p-4 border border-[rgba(97,60,44,0.2)]'>
      {/* Info Text */}
      <p className='text-sm text-[#73544a]'>
        Showing <span className='font-semibold'>{startItem}</span> to{' '}
        <span className='font-semibold'>{endItem}</span> of{' '}
        <span className='font-semibold'>{totalItems}</span> recipes
      </p>

      {/* Pagination Buttons */}
      <div className='flex items-center gap-2'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='rounded-lg border border-[rgba(115,84,74,0.26)] bg-[rgba(255,252,247,0.92)] px-3 py-2 font-semibold text-[#2e1d17] transition hover:bg-[#fff4e5] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Previous page'
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        <div className='flex items-center gap-1'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-lg font-semibold transition ${
                page === currentPage
                  ? 'bg-[#bf5b33] text-white'
                  : 'border border-[rgba(115,84,74,0.26)] bg-[rgba(255,252,247,0.92)] text-[#2e1d17] hover:bg-[#fff4e5]'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='rounded-lg border border-[rgba(115,84,74,0.26)] bg-[rgba(255,252,247,0.92)] px-3 py-2 font-semibold text-[#2e1d17] transition hover:bg-[#fff4e5] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Next page'
        >
          Next →
        </button>
      </div>
    </div>
  )
})

PaginationControls.displayName = 'PaginationControls'

export default PaginationControls
