import { useEffect, useState, useCallback } from 'react'
import RecipeContextState from './RecipeContextState'
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

  // Sync recipes to localStorage
  useEffect(() => {
    const success = safeStorageSet(STORAGE_CONFIG.recipes, recipes)
    if (!success) {
      console.error('Failed to save recipes to storage')
    }
  }, [recipes])

  // Sync favorites to localStorage
  useEffect(() => {
    const success = safeStorageSet(STORAGE_CONFIG.favorites, favorites)
    if (!success) {
      console.error('Failed to save favorites to storage')
    }
  }, [favorites])

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(recipeId)
        ? prevFavorites.filter((id) => id !== recipeId)
        : [...prevFavorites, recipeId]
    )
  }, [])

  const isFavorite = useCallback((recipeId) => {
    return favorites.includes(recipeId)
  }, [favorites])

  const getFavoriteRecipes = useCallback(() => {
    return recipes.filter((recipe) => favorites.includes(recipe.id))
  }, [recipes, favorites])

  const addRecipe = useCallback((newRecipe) => {
    setRecipes(prev => [...prev, newRecipe])
  }, [])

  const updateRecipe = useCallback((recipeId, updatedData) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, ...updatedData, id: recipe.id }
          : recipe
      )
    )
  }, [])

  const deleteRecipe = useCallback((recipeId) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
    // Remove from favorites if favorited
    if (favorites.includes(recipeId)) {
      setFavorites(prev => prev.filter(id => id !== recipeId))
    }
  }, [favorites])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    recipes,
    setRecipes,
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    error,
    clearError,
  }

  return (
    <RecipeContextState.Provider value={value}>
      {children}
    </RecipeContextState.Provider>
  )
}

export default RecipeContextProvider
