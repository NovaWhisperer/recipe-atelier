import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'

const toSafeId = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')

const FormField = forwardRef(
  ({
    label,
    type = 'text',
    placeholder,
    error,
    required = false,
    hint,
    maxLength,
    minLength,
    step,
    options = [],
    rows,
    ...rest
  }, ref) => {
    const {
      id: providedId,
      name,
      onChange,
      onBlur,
      disabled,
      value,
      defaultValue,
    } = rest

    const [isOpen, setIsOpen] = useState(false)
    const [internalSelectValue, setInternalSelectValue] = useState(defaultValue ?? '')
    const selectWrapperRef = useRef(null)
    const generatedId = useId().replace(/:/g, '')
    const selectValue = value ?? internalSelectValue
    const baseFieldId = providedId || name || (label ? toSafeId(label) : '') || generatedId
    const fieldId = `field-${baseFieldId}`
    const errorId = `${fieldId}-error`
    const hintId = `${fieldId}-hint`

    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectValue) || { value: '', label: 'Select an option' },
      [options, selectValue]
    )

    useEffect(() => {
      if (type !== 'select') return undefined

      const handleClickOutside = (event) => {
        if (selectWrapperRef.current && !selectWrapperRef.current.contains(event.target)) {
          setIsOpen(false)
          if (onBlur && name) {
            onBlur({ target: { name, value: selectValue }, type: 'blur' })
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [type, onBlur, name, selectValue])

    const handleSelectOption = (value) => {
      setInternalSelectValue(value)
      setIsOpen(false)
      if (onChange && name) {
        onChange({ target: { name, value }, type: 'change' })
      }
      if (onBlur && name) {
        onBlur({ target: { name, value }, type: 'blur' })
      }
    }

    const inputClassName =
      'mt-2 w-full rounded-xl border border-[rgba(115,84,74,0.26)] bg-[rgba(255,252,247,0.92)] px-3 py-2.5 text-[0.95rem] text-[#2e1d17] transition focus:border-[rgba(191,91,51,0.65)] focus:outline-none focus:ring-3 focus:ring-[rgba(191,91,51,0.18)] disabled:opacity-50 disabled:cursor-not-allowed'

    const errorClassName = 'mt-1 text-[0.85rem] font-semibold text-red-600'
    const hintClassName = 'mt-1 text-[0.8rem] text-[#8d4a2f]'

    return (
      <div className='flex flex-col'>
        {label && (
          <label htmlFor={fieldId} className='text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#6a4439]'>
            {label}
            {required && <span className='ml-1 text-red-600'>*</span>}
          </label>
        )}

        {type === 'textarea' ? (
          <textarea
            ref={ref}
            id={fieldId}
            name={name || fieldId}
            className={inputClassName}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            aria-label={label}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
        ) : type === 'select' ? (
          <div ref={selectWrapperRef} className='relative isolate mt-2'>
            <input
              ref={ref}
              id={`${fieldId}-value`}
              type='hidden'
              name={name || fieldId}
              value={selectValue}
            />
            <button
              id={fieldId}
              type='button'
              onClick={() => setIsOpen((prev) => !prev)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-left text-[0.95rem] transition focus:outline-none focus:ring-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between ${
                isOpen
                  ? 'border-[rgba(191,91,51,0.45)] bg-[#fffdf9] text-[#2b1a14] shadow-[0_0_0_1px_rgba(191,91,51,0.1),0_10px_24px_rgba(97,60,44,0.12)] focus:ring-[rgba(191,91,51,0.16)]'
                  : 'border-[rgba(191,91,51,0.24)] bg-[rgba(255,252,247,0.92)] text-[#2e1d17] hover:border-[rgba(191,91,51,0.34)] focus:border-[rgba(191,91,51,0.65)] focus:ring-[rgba(191,91,51,0.18)]'
              }`}
              aria-label={label}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              disabled={disabled}
            >
              <span className={selectValue ? 'font-medium text-[#2e1d17]' : 'text-[#7f665a]'}>{selectedOption.label}</span>
              <RiArrowDownSLine
                size={18}
                className={`text-[#8f4a2f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className='absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[rgba(191,91,51,0.2)] bg-[rgba(255,252,247,0.96)] backdrop-blur-md shadow-[0_18px_36px_rgba(97,60,44,0.18)]'>
                <ul role='listbox' className='max-h-60 overflow-auto p-1.5'>
                  <li>
                    <button
                      type='button'
                      onClick={() => handleSelectOption('')}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition flex items-center justify-between ${
                        selectValue === ''
                          ? 'bg-[rgba(191,91,51,0.16)] text-[#7a371f] font-semibold shadow-[inset_0_0_0_1px_rgba(191,91,51,0.2)]'
                          : 'text-[#46312a] hover:bg-[rgba(191,91,51,0.08)] hover:text-[#3a251e]'
                      }`}
                      role='option'
                      aria-selected={selectValue === ''}
                    >
                      <span>Select an option</span>
                      {selectValue === '' && <RiCheckLine size={16} />}
                    </button>
                  </li>

                  {options.map((option) => {
                    const isSelected = option.value === selectValue
                    return (
                      <li key={option.value}>
                        <button
                          type='button'
                          onClick={() => handleSelectOption(option.value)}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-[rgba(191,91,51,0.16)] text-[#7a371f] font-semibold shadow-[inset_0_0_0_1px_rgba(191,91,51,0.2)]'
                              : 'text-[#46312a] hover:bg-[rgba(191,91,51,0.08)] hover:text-[#3a251e]'
                          }`}
                          role='option'
                          aria-selected={isSelected}
                        >
                          <span>{option.label}</span>
                          {isSelected && <RiCheckLine size={16} />}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <input
            ref={ref}
            id={fieldId}
            name={name || fieldId}
            type={type}
            className={inputClassName}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            step={step}
            aria-label={label}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...rest}
          />
        )}

        {error && (
          <small className={errorClassName} id={errorId}>
            {error.message || error}
          </small>
        )}

        {hint && !error && (
          <small className={hintClassName} id={hintId}>
            {hint}
          </small>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField
