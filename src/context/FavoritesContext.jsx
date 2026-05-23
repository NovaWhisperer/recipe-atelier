import { createContext } from 'react'

// Separate context for favorites (changes independently of recipe list)
const FavoritesContext = createContext(null)
export default FavoritesContext