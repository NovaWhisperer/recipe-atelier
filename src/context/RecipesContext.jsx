import { createContext } from 'react'

// Separate context for recipe list data (changes less frequently)
const RecipesContext = createContext(null)
export default RecipesContext