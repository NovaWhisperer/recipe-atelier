import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { RiHeartFill, RiHeartLine, RiUserLine, RiTimeLine, RiTeamLine, RiBarChart2Line } from 'react-icons/ri'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import ImageWithFallback from './ImageWithFallback'
import { formatCurrency, formatText } from '../utils/formatters'
import { THEME_COLORS, RECIPE_CATEGORIES } from '../constants/appSettings'

const RecipeCard = ({
  recipe,
  isFavorite = false,
  onFavoriteClick = null,
  onDeleteClick = null,
  showFooterActions = false,
}) => {
  // Memoize to prevent unnecessary re-renders
  const categoryLabel = useMemo(() => {
    const category = RECIPE_CATEGORIES.find(c => c.value === recipe.recipeCategory)
    return category?.label || 'Uncategorized'
  }, [recipe.recipeCategory])

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onFavoriteClick) {
      onFavoriteClick(recipe.id)
    }
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick(recipe.id)
    }
  }

  return (
    <Link
      to={`/recipes/details/${recipe.id}`}
      className='group flex flex-col overflow-hidden rounded-2xl border border-[rgba(191,91,51,0.15)] bg-linear-to-b from-[#fff9f5] to-[#fff3ec] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(191,91,51,0.18)] hover:border-[rgba(191,91,51,0.3)] relative h-full'
      aria-label={`View ${recipe.recipeName} recipe`}
    >
      {/* Image Container */}
      <div className='relative h-48 w-full bg-linear-to-br from-[#f5e0cc] to-[#f0d9c3] overflow-hidden'>
        <ImageWithFallback
          src={recipe.recipeImageUrl}
          alt={recipe.recipeName}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          width={400}
          height={300}
        />
        <div className='absolute inset-0 bg-linear-to-t from-[rgba(0,0,0,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        {/* Favorite Button */}
        {onFavoriteClick && (
          <button
            onClick={handleFavoriteClick}
            className='absolute top-3 right-3 rounded-full bg-white/85 backdrop-blur-md p-2.5 text-lg transition-all duration-200 hover:bg-white hover:scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <RiHeartFill size={20} className='text-[#e85d47]' /> : <RiHeartLine size={20} className='text-[#73544a]' />}
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className='flex flex-col gap-3 p-4 grow'>
        {/* Title & Category */}
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-lg font-semibold leading-tight line-clamp-2 text-[#2e1d17]'>
            {recipe.recipeName}
          </h3>
          <span
            className='whitespace-nowrap rounded-full bg-linear-to-r from-[rgba(191,91,51,0.12)] to-[rgba(191,91,51,0.08)] px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.09em] text-[#8f3f1f] border border-[rgba(191,91,51,0.15)]'
            aria-label={`Category: ${categoryLabel}`}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Description */}
        <p className='line-clamp-2 text-sm text-[#73544a]'>
          {formatText(recipe.recipeDescription, 80)}
        </p>

        {/* Recipe Metadata */}
        <div className='space-y-1 text-[0.75rem] text-[#73544a]'>
          <div className='flex justify-between items-center'>
            <span className='flex items-center gap-1'><RiUserLine size={14} /> {recipe.chefName || 'Unknown Chef'}</span>
            {recipe.prepTime && <span className='flex items-center gap-1'><RiTimeLine size={14} /> {recipe.prepTime}</span>}
          </div>
          {recipe.servings && (
            <div className='flex justify-between items-center'>
              <span className='flex items-center gap-1'><RiTeamLine size={14} /> {recipe.servings} servings</span>
              {recipe.difficulty && <span className='flex items-center gap-1'><RiBarChart2Line size={14} /> {recipe.difficulty}</span>}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className='mt-auto flex items-center justify-between pt-3 border-t border-[rgba(191,91,51,0.1)]'>
          <span className='text-sm font-bold text-[#bf5b33]'>
            {formatCurrency(recipe.recipePricing)}
          </span>
          {showFooterActions && onDeleteClick && (
            <button
              onClick={handleDeleteClick}
              className='rounded-lg px-3 py-1.5 text-[0.75rem] font-bold text-[#e85d47] hover:bg-[rgba(232,93,71,0.08)] transition flex items-center gap-1'
              aria-label='Delete recipe'
            >
              <RiDeleteBin6Fill size={14} />
              Delete
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
