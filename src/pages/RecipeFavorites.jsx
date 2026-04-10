import { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RiHeartFill } from 'react-icons/ri'
import RecipeCard from '../components/RecipeCard'
import EmptyState from '../components/EmptyState'
import ErrorBoundary from '../components/ErrorBoundary'
import RecipeContextState from '../context/RecipeContextState'

const RecipeFavorites = () => {
  const { getFavoriteRecipes, toggleFavorite } = useContext(RecipeContextState)
  const favoriteRecipes = getFavoriteRecipes()

  const handleRemoveFavorite = (recipeId) => {
    toggleFavorite(recipeId)
    toast.success('Removed from favorites!')
  }

  return (
    <ErrorBoundary>
      <section className='flex flex-col gap-5'>
        {/* Header */}
        <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-5 backdrop-blur-[2px]'>
          <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f]'>
            My Collection
          </p>
          <h1 className="mt-2 font-['Fraunces'] text-[clamp(1.25rem,3.2vw,1.8rem)]">
            Favorite Recipes
          </h1>
          <p className='mt-2 text-[#73544a]'>
            {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {/* Recipes Grid or Empty State */}
        {favoriteRecipes.length > 0 ? (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
            {favoriteRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={true}
                onFavoriteClick={() => handleRemoveFavorite(recipe.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={RiHeartFill}
            title='No favorite recipes yet'
            description='Start exploring recipes and add your favorites to this collection.'
            actionButton={
              <Link
                to='/recipes'
                className='inline-block rounded-xl border border-[rgba(99,54,42,0.22)] px-4 py-2.5 text-sm font-bold text-[#63362a] transition hover:border-[rgba(144,74,45,0.45)] hover:bg-[rgba(255,248,238,0.85)]'
              >
                Browse Recipes
              </Link>
            }
          />
        )}
      </section>
    </ErrorBoundary>
  )
}

export default memo(RecipeFavorites)
