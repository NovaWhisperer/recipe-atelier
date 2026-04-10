import { memo, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiFileList2Line, RiAddCircleLine, RiSearchLine, RiHeartLine, RiStarFill, RiEyeLine, RiUserLine, RiAddFill, RiShoppingBag2Line, RiLayoutGridLine, RiMoneyDollarCircleLine, RiBarChart2Line } from 'react-icons/ri'
import RecipeCard from '../components/RecipeCard'
import StatsCard from '../components/StatsCard'
import EmptyState from '../components/EmptyState'
import ErrorBoundary from '../components/ErrorBoundary'
import RecipeContextState from '../context/RecipeContextState'
import { getRecipeStats } from '../utils/recipeOperations'

const Home = () => {
    const { recipes, favorites, getFavoriteRecipes } = useContext(RecipeContextState)
    const favoriteRecipes = getFavoriteRecipes()

    const stats = useMemo(() => getRecipeStats(recipes), [recipes])
    const featuredRecipes = useMemo(() => [...recipes].slice(0, 3), [recipes])

    return (
        <ErrorBoundary>
            <section className='flex flex-col gap-5'>
                {/* Hero Section */}
                <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[radial-gradient(circle_at_88%_22%,rgba(255,221,162,0.62),transparent_34%),linear-gradient(145deg,#fff4e5,#f8e4ca_52%,#f5e1ce)] p-5'>
                    <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f] flex items-center gap-2'>
                        <RiFileList2Line size={18} /> Kitchen Dashboard
                    </p>
                    <h1 className="mt-2 max-w-2xl font-['Fraunces'] text-[clamp(2rem,5vw,3.1rem)] leading-[0.98]">
                        Plan, create, and showcase recipes with a warm editorial layout
                    </h1>
                    <p className='mt-4 max-w-2xl text-[#73544a]'>
                        Recipe Maker helps you collect ideas quickly, keep details organized, and display every dish in a modern card experience.
                    </p>

                    <div className='mt-6 flex flex-wrap items-center gap-3'>
                        <Link
                            to='/create-recipe'
                            className='rounded-xl bg-[#bf5b33] px-4 py-2.5 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925] inline-flex items-center gap-2'
                            aria-label='Create a new recipe'
                        >
                            <RiAddCircleLine size={18} /> Create New Recipe
                        </Link>
                        <Link
                            to='/recipes'
                            className='rounded-xl border border-[rgba(99,54,42,0.22)] px-4 py-2.5 text-sm font-bold text-[#63362a] transition hover:border-[rgba(144,74,45,0.45)] hover:bg-[rgba(255,248,238,0.85)] inline-flex items-center gap-2'
                            aria-label='Browse all recipes'
                        >
                            <RiSearchLine size={18} /> Browse Recipes
                        </Link>
                        {favoriteRecipes.length > 0 && (
                            <Link
                                to='/favorites'
                                className='rounded-xl border border-[rgba(191,91,51,0.3)] bg-[rgba(191,91,51,0.1)] px-4 py-2.5 text-sm font-bold text-[#bf5b33] transition hover:bg-[rgba(191,91,51,0.2)] inline-flex items-center gap-2'
                                aria-label={`View ${favoriteRecipes.length} favorites`}
                            >
                                <RiHeartLine size={18} /> My Favorites ({favoriteRecipes.length})
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5'>
                    <StatsCard
                        icon={RiShoppingBag2Line}
                        label='Total Recipes'
                        value={stats.totalRecipes}
                        description='Recipes in your collection'
                    />

                    <StatsCard
                        icon={RiLayoutGridLine}
                        label='Categories'
                        value={stats.totalCategories}
                        description='Recipe types available'
                    />

                    <StatsCard
                        icon={RiMoneyDollarCircleLine}
                        label='Average Price'
                        value={`$${stats.averagePrice.toFixed(2)}`}
                        description='Average per recipe'
                    />

                    <StatsCard
                        icon={RiHeartLine}
                        label='Favorites'
                        value={favoriteRecipes.length}
                        description='Saved recipes'
                        trend={
                            favoriteRecipes.length > 0
                                ? { isPositive: true, text: `${Math.round((favoriteRecipes.length / stats.totalRecipes) * 100)}% of collection` }
                                : null
                        }
                    />
                </div>

                {/* Featured Recipes */}
                <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-5 backdrop-blur-[2px]'>
                    <div className='flex items-center justify-between mb-4 gap-3 flex-wrap'>
                        <h2 className="font-['Fraunces'] text-[clamp(1.25rem,3.2vw,1.8rem)] flex items-center gap-2">
                            <RiStarFill size={24} className='text-[#bf5b33]' /> Featured Recipes
                        </h2>
                        {recipes.length > 3 && (
                            <Link
                                to='/recipes'
                                className='rounded-xl border border-[rgba(99,54,42,0.2)] bg-[#fff4e4] px-4 py-2.5 text-sm font-bold text-[#63362a] transition hover:bg-[#f8e8d0] inline-flex items-center gap-2'
                            >
                                <RiEyeLine size={18} /> View All
                            </Link>
                        )}
                    </div>

                    {featuredRecipes.length > 0 ? (
                        <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
                            {featuredRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    isFavorite={favorites.includes(recipe.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={RiUserLine}
                            title='No recipes yet'
                            description='Start by creating your first recipe to build your collection.'
                            actionButton={
                                <Link
                                    to='/create-recipe'
                                    className='rounded-xl bg-[#bf5b33] px-6 py-2.5 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925] inline-flex items-center gap-2'
                                >
                                    <RiAddFill size={18} /> Create First Recipe
                                </Link>
                            }
                        />
                    )}
                </div>

            </section>
        </ErrorBoundary>
    )
}

export default memo(Home)
