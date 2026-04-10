import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { RiSearchLine, RiCloseLine, RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { RECIPE_CATEGORIES } from '../constants/appSettings'

const CustomDropdown = ({
  id,
  label,
  value,
  options,
  onChange,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) || options[0],
    [options, value]
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className='relative isolate'>
      {label ? <label htmlFor={id} className='sr-only'>{label}</label> : null}
      <button
        id={id}
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full rounded-xl border px-4 py-2.5 text-left text-[0.95rem] transition-all duration-200 focus:outline-none focus:ring-3 flex items-center justify-between ${
          isOpen
            ? 'border-[rgba(191,91,51,0.45)] bg-[#fffdf9] text-[#2b1a14] shadow-[0_0_0_1px_rgba(191,91,51,0.1),0_10px_24px_rgba(97,60,44,0.12)] focus:ring-[rgba(191,91,51,0.16)]'
            : 'border-[rgba(191,91,51,0.22)] bg-white/75 text-[#2e1d17] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] hover:border-[rgba(191,91,51,0.34)] hover:bg-white focus:border-[rgba(191,91,51,0.5)] focus:ring-[rgba(191,91,51,0.1)]'
        }`}
        aria-label={ariaLabel}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className='font-medium'>{selectedOption.label}</span>
        <RiArrowDownSLine
          size={18}
          className={`text-[#8f4a2f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[rgba(191,91,51,0.2)] bg-[rgba(255,252,247,0.96)] backdrop-blur-md shadow-[0_18px_36px_rgba(97,60,44,0.18)]'>
          <ul role='listbox' className='max-h-60 overflow-auto p-1.5'>
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li key={option.value || 'all'}>
                  <button
                    type='button'
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
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
  )
}

const SearchAndFilterBar = ({
  onSearch,
  onFilter,
  onSort,
  showSort = true,
  placeholder = 'Search recipes by name, ingredient, or chef...',
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'All Categories' },
      ...RECIPE_CATEGORIES.map((cat) => ({ value: cat.value, label: cat.label })),
    ],
    []
  )

  const sortOptions = useMemo(
    () => [
      { value: 'newest', label: 'Newest First' },
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'price-asc', label: 'Price (Low to High)' },
      { value: 'price-desc', label: 'Price (High to Low)' },
    ],
    []
  )

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value
      setSearchTerm(value)
      if (onSearch) {
        onSearch(value)
      }
    },
    [onSearch]
  )

  const handleCategoryChange = useCallback(
    (value) => {
      setSelectedCategory(value)
      if (onFilter) {
        onFilter(value)
      }
    },
    [onFilter]
  )

  const handleSortChange = useCallback(
    (value) => {
      setSortBy(value)
      if (onSort) {
        onSort(value)
      }
    },
    [onSort]
  )

  const handleClearSearches = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('newest')
    if (onSearch) onSearch('')
    if (onFilter) onFilter('')
    if (onSort) onSort('newest')
  }, [onSearch, onFilter, onSort])

  const isFiltered = searchTerm || selectedCategory || sortBy !== 'newest'

  return (
    <div className='rounded-2xl border border-[rgba(191,91,51,0.15)] bg-linear-to-b from-[rgba(255,252,250,0.92)] to-[rgba(255,249,246,0.88)] p-4 space-y-4 shadow-[0_4px_12px_rgba(191,91,51,0.08)]'>
      {/* Search Input */}
      <div className='relative'>
        <label htmlFor='recipe-search' className='sr-only'>Search recipes</label>
        <input
          id='recipe-search'
          name='recipeSearch'
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className='w-full rounded-xl border border-[rgba(191,91,51,0.2)] bg-white/60 backdrop-blur-sm pl-11 pr-11 py-2.5 text-[0.95rem] text-[#2e1d17] transition-all duration-200 placeholder:text-[#a08070] focus:border-[rgba(191,91,51,0.5)] focus:outline-none focus:ring-3 focus:ring-[rgba(191,91,51,0.1)] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
          aria-label='Search recipes'
        />
        
        {/* Search Icon */}
        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bf5b33] pointer-events-none'>
          <RiSearchLine size={18} />
        </span>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('')
              if (onSearch) onSearch('')
            }}
            className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bf5b33] hover:scale-110 hover:text-[#a74925] transition-all duration-200'
            aria-label='Clear search'
          >
            <RiCloseLine size={18} />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className='flex flex-col md:flex-row gap-3'>
        {/* Category Filter */}
        <div className='flex-1'>
          <CustomDropdown
            id='recipe-category-filter'
            label='Filter by category'
            value={selectedCategory}
            options={categoryOptions}
            onChange={handleCategoryChange}
            aria-label='Filter by category'
          />
        </div>

        {/* Sort Filter */}
        {showSort && (
          <div className='flex-1'>
            <CustomDropdown
              id='recipe-sort-order'
              label='Sort recipes'
              value={sortBy}
              options={sortOptions}
              onChange={handleSortChange}
              aria-label='Sort recipes'
            />
          </div>
        )}

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            onClick={handleClearSearches}
            className='rounded-lg bg-linear-to-r from-[rgba(191,91,51,0.12)] to-[rgba(191,91,51,0.08)] px-4 py-2.5 font-semibold text-[#bf5b33] hover:from-[rgba(191,91,51,0.18)] hover:to-[rgba(191,91,51,0.12)] transition-all duration-200 border border-[rgba(191,91,51,0.2)] hover:border-[rgba(191,91,51,0.3)]'
            aria-label='Clear all filters'
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilterBar
