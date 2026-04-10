import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RecipesList from '../pages/RecipesList'
import Recipe from '../pages/Recipe'
import About from '../pages/About'
import Create from '../pages/Create'
import RecipeFavorites from '../pages/RecipeFavorites'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/recipes' element={<RecipesList />} />
            <Route path='/recipes/details/:id' element={<Recipe />} />
            <Route path='/favorites' element={<RecipeFavorites />} />
            <Route path='/about' element={<About />} />
            <Route path='/create-recipe' element={<Create />} />
        </Routes>
    )
}

export default MainRoutes
