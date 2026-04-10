// Color Palette - Dark Brown/Warm theme
export const THEME_COLORS = {
  primary: '#bf5b33',
  primaryHover: '#a74925',
  secondary: '#a7412c',
  secondaryHover: '#893321',
  text: {
    dark: '#2e1d17',
    medium: '#73544a',
    light: '#8d4a2f',
  },
  border: 'rgba(97,60,44,0.2)',
  borderLight: 'rgba(97,60,44,0.1)',
  bg: {
    primary: 'rgba(255,250,243,0.86)',
    secondary: 'rgba(255,248,238,0.8)',
    light: '#fff8ee',
  },
}

// Recipe Categories
export const RECIPE_CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast', icon: 'RiRestaurant2Fill' },
  { value: 'appetizer', label: 'Appetizer', icon: 'RiLeafLine' },
  { value: 'main-course', label: 'Main Course', icon: 'RiRestaurantLine' },
  { value: 'dessert', label: 'Dessert', icon: 'RiCake2Line' },
]

// LocalStorage Keys
export const STORAGE_CONFIG = {
  recipes: 'recipe-maker-data',
  favorites: 'recipe-maker-favorites',
  userPrefs: 'recipe-maker-preferences',
}

// Pagination Settings
export const PAGINATION_CONFIG = {
  itemsPerPage: 8,
  loadMoreThreshold: 3,
}

// Image Settings
export const IMAGE_CONFIG = {
  placeholderUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
}

// Default Recipe Template
export const DEFAULT_RECIPE_TEMPLATE = {
  recipeName: '',
  recipeImageUrl: '',
  recipeDescription: '',
  recipeIngredients: '',
  recipeInstructions: '',
  recipeCategory: '',
  chefName: '',
  recipePricing: 0,
  prepTime: '30 mins',
  cookTime: '20 mins',
  servings: 4,
  difficulty: 'medium',
}

// Demo Recipes
export const DEMO_RECIPES = [
  {
    id: 'demo-1',
    recipeName: 'Creamy Tomato Pasta',
    recipeImageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    recipeDescription: 'A quick and creamy tomato pasta for busy weeknights.',
    recipeIngredients: 'Pasta\nTomato puree\nGarlic\nCream\nOlive oil\nBasil\nSalt\nPepper',
    recipeInstructions: 'Boil pasta\nSaute garlic in olive oil\nAdd tomato puree and cream\nMix pasta and garnish with basil',
    recipeCategory: 'main-course',
    chefName: 'Chef Aryan',
    recipePricing: 12.5,
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'easy',
  },
]
