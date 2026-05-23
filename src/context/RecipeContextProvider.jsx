import { useEffect, useState, useCallback, useMemo } from 'react'
import RecipeContextState from './RecipeContextState'
import RecipesContext from './RecipesContext'
import FavoritesContext from './FavoritesContext'
import { safeStorageGet, safeStorageSet } from '../utils/storageManager'
import { STORAGE_CONFIG, DEMO_RECIPES } from '../constants/appSettings'

const initializeRecipes = () => {
  const stored = safeStorageGet(STORAGE_CONFIG.recipes)
  return stored && Array.isArray(stored) && stored.length > 0 ? stored : DEMO_RECIPES
}

const initializeFavorites = () => {
  const stored = safeStorageGet(STORAGE_CONFIG.favorites)
  return stored && Array.isArray(stored) ? stored : []
}

const RecipeContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(initializeRecipes)
  const [favorites, setFavorites] = useState(initializeFavorites)
  const [error, setError] = useState(null)

  // Sync to localStorage
  useEffect(() => {
    const success = safeStorageSet(STORAGE_CONFIG.recipes, recipes)
    if (!success) console.error('Failed to save recipes to storage')
  }, [recipes])

  useEffect(() => {
    const success = safeStorageSet(STORAGE_CONFIG.favorites, favorites)
    if (!success) console.error('Failed to save favorites to storage')
  }, [favorites])

  // ── Favorites operations (stable — only re-renders favorites consumers) ──

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    )
  }, [])

  const isFavorite = useCallback((recipeId) => {
    return favorites.includes(recipeId)
  }, [favorites])

  const getFavoriteRecipes = useCallback((recipeList) => {
    return recipeList.filter((recipe) => favorites.includes(recipe.id))
  }, [favorites])

  // ── Recipe operations (stable — only re-renders recipe consumers) ────────

  const addRecipe = useCallback((newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe])
  }, [])

  const updateRecipe = useCallback((recipeId, updatedData) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedData, id: recipe.id } : recipe
      )
    )
  }, [])

  const deleteRecipe = useCallback((recipeId) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
    setFavorites((prev) => prev.filter((id) => id !== recipeId))
  }, [])

  const clearError = useCallback(() => setError(null), [])

  // ── Memoized context values — each only changes when its slice changes ───

  const recipesValue = useMemo(() => ({
    recipes,
    setRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    error,
    clearError,
  }), [recipes, addRecipe, updateRecipe, deleteRecipe, error, clearError])

  const favoritesValue = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteRecipes,
  }), [favorites, toggleFavorite, isFavorite, getFavoriteRecipes])

  // ── Legacy combined value (keeps old consumers working unchanged) ────────
  const combinedValue = useMemo(() => ({
    ...recipesValue,
    ...favoritesValue,
    // Convenience helper that doesn't need external recipeList arg
    getFavoriteRecipes: () => recipes.filter((r) => favorites.includes(r.id)),
  }), [recipesValue, favoritesValue, recipes, favorites])

  return (
    <RecipesContext.Provider value={recipesValue}>
      <FavoritesContext.Provider value={favoritesValue}>
        {/* RecipeContextState is kept for backward-compat with all existing consumers */}
        <RecipeContextState.Provider value={combinedValue}>
          {children}
        </RecipeContextState.Provider>
      </FavoritesContext.Provider>
    </RecipesContext.Provider>
  )
}

export default RecipeContextProvider