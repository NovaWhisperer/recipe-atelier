import { useEffect } from 'react'
import { RiAlertLine, RiCloseLine } from 'react-icons/ri'

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger', // 'danger' | 'warning'
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  const confirmBtnClass = variant === 'danger'
    ? 'bg-[#a7412c] hover:bg-[#893321] text-[#ffefe8]'
    : 'bg-[#bf5b33] hover:bg-[#a74925] text-[#ffefe8]'

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onCancel}
        aria-hidden='true'
      />

      {/* Modal */}
      <div className='relative w-full max-w-md rounded-2xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.98)] p-6 shadow-[0_24px_60px_rgba(91,60,43,0.22)]'>
        <button
          onClick={onCancel}
          className='absolute right-4 top-4 rounded-lg p-1.5 text-[#73544a] hover:bg-[rgba(191,91,51,0.08)] transition'
          aria-label='Close modal'
        >
          <RiCloseLine size={20} />
        </button>

        <div className='flex items-start gap-4'>
          <div className={`shrink-0 rounded-xl p-2.5 ${variant === 'danger' ? 'bg-red-100' : 'bg-amber-100'}`}>
            <RiAlertLine size={22} className={variant === 'danger' ? 'text-red-600' : 'text-amber-600'} />
          </div>
          <div className='flex-1 min-w-0'>
            <h2 id='modal-title' className="font-['Fraunces'] text-lg text-[#2e1d17]">{title}</h2>
            <p className='mt-2 text-sm text-[#73544a] leading-relaxed'>{message}</p>
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='rounded-xl border border-[rgba(99,54,42,0.22)] px-5 py-2.5 text-sm font-bold text-[#63362a] transition hover:bg-[rgba(255,248,238,0.85)]'
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${confirmBtnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal