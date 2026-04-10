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
      <BrowserRouter basename={routerBasename}>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </RecipeContextProvider>
  </StrictMode>,
)
