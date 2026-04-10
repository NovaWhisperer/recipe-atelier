import { memo, useState, useMemo, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RiSearchLine } from 'react-icons/ri'
import RecipeCard from '../components/RecipeCard'
import SearchAndFilterBar from '../components/SearchAndFilterBar'
import PaginationControls from '../components/PaginationControls'
import EmptyState from '../components/EmptyState'
import ErrorBoundary from '../components/ErrorBoundary'
import RecipeContextState from '../context/RecipeContextState'
import { searchRecipes, filterRecipesByCategory, sortRecipes } from '../utils/recipeOperations'
import { PAGINATION_CONFIG } from '../constants/appSettings'

const RecipesList = () => {
  const { recipes, toggleFavorite, isFavorite } = useContext(RecipeContextState)
  
  // Search, filter, sort state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    let results = recipes

    // Apply search
    if (searchTerm) {
      results = searchRecipes(results, searchTerm)
    }

    // Apply category filter
    if (selectedCategory) {
      results = filterRecipesByCategory(results, selectedCategory)
    }

    // Apply sorting
    results = sortRecipes(results, sortBy)

    return results
  }, [recipes, searchTerm, selectedCategory, sortBy])

  // Pagination calculations
  const paginationData = useMemo(() => {
    const itemsPerPage = PAGINATION_CONFIG.itemsPerPage
    const totalItems = filteredRecipes.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const validCurrentPage = currentPage > totalPages && totalPages > 0 ? 1 : currentPage
    const startIndex = (validCurrentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = filteredRecipes.slice(startIndex, endIndex)

    return {
      currentItems,
      currentPage: validCurrentPage,
      totalPages,
      totalItems,
      itemsPerPage,
    }
  }, [filteredRecipes, currentPage])

  // Handler for search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  // Handler for filter
  const handleFilter = useCallback((category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }, [])

  // Handler for sort
  const handleSort = useCallback((sort) => {
    setSortBy(sort)
    setCurrentPage(1)
  }, [])

  // Handler for pagination
  const goToPage = useCallback((page) => {
    const validPage = Math.max(1, Math.min(page, paginationData.totalPages))
    setCurrentPage(validPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [paginationData.totalPages])

  const handleFavoriteClick = (recipeId) => {
    toggleFavorite(recipeId)
    const isFav = isFavorite(recipeId)
    toast.success(isFav ? 'Removed from favorites!' : 'Added to favorites!')
  }

  return (
    <ErrorBoundary>
      <section className='flex flex-col gap-5'>
        {/* Header */}
        <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-5 backdrop-blur-[2px]'>
          <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f]'>
            Recipe Library
          </p>
          <h1 className="mt-2 font-['Fraunces'] text-[clamp(1.25rem,3.2vw,1.8rem)]">
            Explore every dish in your collection
          </h1>
          <p className='mt-2 text-[#73544a]'>
            {paginationData.totalItems} recipe(s) found. Search, filter, and discover your favorite dishes.
          </p>
        </div>

        {/* Search & Filter */}
        <SearchAndFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
        />

        {/* Recipe Grid */}
        {paginationData.currentItems.length > 0 ? (
          <>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
              {paginationData.currentItems.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.id)}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {paginationData.totalPages > 1 && (
              <PaginationControls
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                totalItems={paginationData.totalItems}
                onPageChange={goToPage}
              />
            )}
          </>
        ) : (
          <EmptyState
            icon={RiSearchLine}
            title='No recipes found'
            description='Try adjusting your search or filters to find recipes.'
            actionButton={
              <Link
                to='/create-recipe'
                className='inline-block rounded-xl bg-[#bf5b33] px-4 py-2.5 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925]'
              >
                Create Recipe
              </Link>
            }
          />
        )}
      </section>
    </ErrorBoundary>
  )
}

export default memo(RecipesList)
