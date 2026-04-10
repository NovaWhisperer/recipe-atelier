import { IMAGE_CONFIG } from '../constants/appSettings'
import { parseInstructionSteps, parseRecipeList } from './formatters'

// Recipe Form Validation Rules
export const VALIDATION_RULES = {
  recipeName: {
    required: 'Recipe name is required',
    minLength: { 
      value: 3, 
      message: 'Recipe name must be at least 3 characters' 
    },
    maxLength: { 
      value: 80, 
      message: 'Recipe name must not exceed 80 characters' 
    },
  },
  recipeImageUrl: {
    required: 'Recipe image URL is required',
    pattern: {
      value: /^https?:\/\/.+/,
      message: 'Please enter a valid URL starting with http:// or https://',
    },
  },
  chefName: {
    required: "Chef's name is required",
    minLength: { 
      value: 2, 
      message: "Chef's name must be at least 2 characters" 
    },
    maxLength: { 
      value: 50, 
      message: "Chef's name must not exceed 50 characters" 
    },
  },
  recipeCategory: {
    required: 'Recipe category is required',
  },
  recipePricing: {
    required: 'Recipe price is required',
    min: { 
      value: 0, 
      message: 'Recipe price must be 0 or more' 
    },
    max: { 
      value: 9999, 
      message: 'Recipe price must not exceed $9999' 
    },
  },
  recipeDescription: {
    required: 'Recipe description is required',
    minLength: { 
      value: 10, 
      message: 'Description must be at least 10 characters' 
    },
    maxLength: { 
      value: 500, 
      message: 'Description must not exceed 500 characters' 
    },
  },
  recipeIngredients: {
    required: 'Recipe ingredients are required',
    validate: (value) =>
      parseRecipeList(value).length > 0 || 'Please add at least one ingredient (one per line)',
  },
  recipeInstructions: {
    required: 'Recipe instructions are required',
    validate: (value) =>
      parseInstructionSteps(value).length > 0 || 'Please add at least one instruction step (one per line)',
  },
  prepTime: {
    required: 'Prep time is required',
  },
  cookTime: {
    required: 'Cook time is required',
  },
  servings: {
    required: 'Servings is required',
    min: { 
      value: 1, 
      message: 'Servings must be at least 1' 
    },
  },
}

// Image Validation
export const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors'
    })
    return response.ok
  } catch (error) {
    console.error('Image validation error:', error)
    return true // Allow if network fails
  }
}

// Search Query Validation
export const isValidSearchQuery = (query) => {
  return query && query.trim().length >= 2
}

// Price Validation
export const isValidPrice = (price) => {
  const num = Number(price)
  return !isNaN(num) && num >= 0 && num <= 9999
}
