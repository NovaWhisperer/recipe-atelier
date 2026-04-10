import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify"
import { BrowserRouter } from 'react-router-dom'
import RecipeContextProvider from './context/RecipeContextProvider.jsx'
import './index.css'
import App from './App.jsx'

const routerBasename = import.meta.env.BASE_URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecipeContextProvider>
<<<<<<< HEAD
      <BrowserRouter>
=======
      <BrowserRouter basename={routerBasename}>
>>>>>>> 1e83b9dd79511bdce694864733f0fc37c783f8e2
        <App />
        <ToastContainer />
      </BrowserRouter>
    </RecipeContextProvider>
  </StrictMode>,
)
