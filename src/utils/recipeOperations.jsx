// Recipe Operations & Search Utilities
import { sanitizeSearchTerm } from './formatters'

const isValidSearchQuery = (query) => {
  return query && query.trim().length >= 2
}

export const searchRecipes = (recipes, searchTerm) => {
  if (!searchTerm || !isValidSearchQuery(searchTerm)) return recipes
  
  const term = sanitizeSearchTerm(searchTerm)
  return recipes.filter(recipe =>
    recipe.recipeName.toLowerCase().includes(term) ||
    recipe.recipeDescription.toLowerCase().includes(term) ||
    recipe.recipeIngredients.toLowerCase().includes(term) ||
    recipe.chefName.toLowerCase().includes(term)
  )
}

export const filterRecipesByCategory = (recipes, category) => {
  if (!category) return recipes
  return recipes.filter(recipe => recipe.recipeCategory === category)
}

export const sortRecipes = (recipes, sortBy) => {
  const sorted = [...recipes]
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.recipeName.localeCompare(b.recipeName))
    case 'name-desc':
      return sorted.sort((a, b) => b.recipeName.localeCompare(a.recipeName))
    case 'price-asc':
      return sorted.sort((a, b) => (a.recipePricing || 0) - (b.recipePricing || 0))
    case 'price-desc':
      return sorted.sort((a, b) => (b.recipePricing || 0) - (a.recipePricing || 0))
    case 'newest':
      return sorted.reverse()
    default:
      return sorted
  }
}

export const getRecipeStats = (recipes) => {
  return {
    totalRecipes: recipes.length,
    totalCategories: new Set(recipes.map(r => r.recipeCategory).filter(Boolean)).size,
    averagePrice: recipes.length > 0
      ? recipes.reduce((sum, r) => sum + (Number(r.recipePricing) || 0), 0) / recipes.length
      : 0,
    highestPrice: recipes.length > 0
      ? Math.max(...recipes.map(r => Number(r.recipePricing) || 0))
      : 0,
    lowestPrice: recipes.length > 0
      ? Math.min(...recipes.map(r => Number(r.recipePricing) || 0))
      : 0,
  }
}

export const duplicateRecipe = (recipe) => {
  // Exclude id from the duplicated recipe
  const { id: _id, ...recipeData } = recipe
  return { ...recipeData }
}

const downloadJsonFile = (data, fileName) => {
  const dataStr = JSON.stringify(data, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' })
  const fileUrl = URL.createObjectURL(blob)

  const linkElement = document.createElement('a')
  linkElement.href = fileUrl
  linkElement.setAttribute('download', fileName)
  linkElement.click()

  URL.revokeObjectURL(fileUrl)
}

export const exportRecipesToJSON = (recipes) => {
  const exportFileDefaultName = `recipes-backup-${new Date().toISOString()}.json`
  downloadJsonFile(recipes, exportFileDefaultName)
}

export const exportRecipeToJSON = (recipe) => {
  const safeRecipeName = recipe?.recipeName
    ? recipe.recipeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    : 'recipe'
  const exportFileDefaultName = `${safeRecipeName}-${new Date().toISOString()}.json`
  downloadJsonFile(recipe, exportFileDefaultName)
}

export const importRecipesFromJSON = (jsonData) => {
  try {
    const recipes = JSON.parse(jsonData)
    if (!Array.isArray(recipes)) {
      throw new Error('Invalid JSON format')
    }
    return recipes
  } catch (error) {
    throw new Error(`Failed to import recipes: ${error.message}`)
  }
}
