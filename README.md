# 🍽️ Recipe Atelier

> A modern, feature-rich recipe management application for culinary enthusiasts. Create, manage, search, and organize your favorite recipes with an intuitive interface and powerful search capabilities.

**Live Demo:** [recipe-atelier.vercel.app](https://recipe-atelier.vercel.app)

[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-4.x-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.2-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **🎯 Create Recipes** - Add detailed recipes with name, description, ingredients, pricing, category, and chef information
- **🔍 Advanced Search** - Real-time search across recipe names, descriptions, ingredients, and chef names
- **📂 Category Filtering** - Organize and filter recipes by custom categories
- **📊 Smart Sorting** - Sort by name (A-Z or Z-A), price (ascending/descending), or newest first

### User Experience
- **❤️ Favorites System** - Mark favorite recipes for quick access and personalization
- **📈 Recipe Analytics** - View comprehensive statistics (total recipes, average price, price range)
- **💾 Import/Export** - Backup and share recipes via JSON format
- **📱 Responsive Design** - Seamless experience on desktop, tablet, and mobile devices
- **🎨 Intuitive Interface** - Clean, modern UI built with Tailwind CSS

### Data Management
- **✅ Form Validation** - Comprehensive validation rules for data integrity
- **💾 Local Storage** - All data persists locally in browser (no backend required)
- **🔄 Duplicate Recipes** - Create variations of existing recipes easily
- **📤 Batch Operations** - Export all recipes or individual recipes

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | React 19, Vite, Tailwind CSS |
| **Routing** | React Router DOM v7 |
| **Forms** | React Hook Form |
| **Icons** | React Icons |
| **State Management** | React Context API |
| **Notifications** | React Toastify |
| **Utilities** | Nano ID, Date/Time helpers |
| **Linting** | ESLint 9, React ESLint plugins |

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** v8+ or **yarn** v1.22+
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## ⚡ Quick Start

Get up and running in 3 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/recipe-atelier.git
cd recipe-atelier

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

That's it! Start creating recipes! 🎉

## � Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

### Development Workflow

1. **Development Mode**: `npm run dev` 
   - Starts Vite dev server with HMR
   - Hot module replacement for instant updates
   - Browser opens automatically at `http://localhost:5173`
   - Source maps for easy debugging

2. **Production Build**: `npm run build`
   - Optimizes and minifies code
   - Creates `dist/` folder ready for deployment
   - Tree-shaking and code splitting enabled

3. **Code Quality**: `npm run lint`
   - Checks for code style violations
   - Identifies potential bugs
   - Configuration in `eslint.config.js`

## �📁 Project Structure

```
recipe-atelier/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── RecipeCard.jsx      # Recipe display component
│   │   ├── SearchAndFilterBar.jsx  # Search and filtering UI
│   │   ├── FormField.jsx       # Reusable form field
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── PaginationControls.jsx  # Pagination UI
│   │   ├── StatsCard.jsx       # Statistics display
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   ├── EmptyState.jsx      # Empty state UI
│   │   ├── ErrorBoundary.jsx   # Error boundary
│   │   └── ImageWithFallback.jsx   # Optimized image component
│   │
│   ├── pages/                   # Page/route components
│   │   ├── Home.jsx            # Home page with recipe list
│   │   ├── Recipe.jsx          # Individual recipe view
│   │   ├── Create.jsx          # Create/edit recipe
│   │   ├── RecipesList.jsx     # All recipes view
│   │   ├── RecipeFavorites.jsx # Favorites page
│   │   └── About.jsx           # About page
│   │
│   ├── context/                # React Context
│   │   ├── RecipeContextState.jsx    # Context definitions
│   │   └── RecipeContextProvider.jsx # Provider component
│   │
│   ├── routes/
│   │   └── Mainroutes.jsx      # Route configuration
│   │
│   ├── utils/                   # Utility functions
│   │   ├── recipeOperations.jsx  # Search, sort, filter, export/import
│   │   ├── storageManager.jsx   # LocalStorage operations
│   │   ├── validationRules.jsx  # Form validation rules
│   │   ├── formatters.jsx       # Text formatting utilities
│   │   ├── iconMapper.jsx       # Icon mapping
│   │   └── imageOptimization.jsx # Image optimization
│   │
│   ├── constants/
│   │   └── appSettings.jsx      # App configuration
│   │
│   ├── assets/                  # Images and static files
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
│
├── public/                      # Static files
├── eslint.config.js             # ESLint configuration
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── index.html                   # HTML entry point
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

### Key Directories

- **components/** - Reusable, presentational components
- **pages/** - Page-level components for routes
- **utils/** - Pure functions and helper utilities
- **context/** - Global state management setup
- **constants/** - Application configuration and settings

## 🎯 Usage

### Creating a Recipe
1. Click "Create Recipe" or navigate to the Create page
2. Fill in recipe details:
   - **Recipe Name** - The name of your recipe
   - **Description** - Detailed description of the dish
   - **Ingredients** - List of ingredients (comma-separated)
   - **Pricing** - Cost of the recipe
   - **Category** - Choose or create a category
   - **Chef Name** - Name of the chef/author
   - **Image** - Recipe image (optional)
3. Click Save to add the recipe

### Searching & Filtering
- **Search** - Use the search bar to find recipes by:
  - Recipe name
  - Description
  - Ingredients
  - Chef name
- **Filter** - Select a category from dropdown to narrow results
- **Sort** - Choose sorting option:
  - Name (A-Z or Z-A)
  - Price (Low to High or High to Low)
  - Newest first

### Managing Favorites
- Click the ❤️ heart icon on any recipe card to add/remove from favorites
- View all favorites in the **Favorites** page
- Favorites are saved in local storage

### Exporting & Importing Recipes
- **Export All** - Click "Export All Recipes" to download a JSON backup of all recipes
- **Export Single** - Click export icon on recipe cards to export individual recipes
- **Import** - Click "Import Recipes" and select a JSON file to import recipes
- **Backup Location** - Files are saved to your Downloads folder

### Recipe Details View
- Click on any recipe card to view full details
- See all ingredients, pricing, category, and chef info
- Quick actions: Duplicate, Edit, Delete, Export, Add to Favorites

## 🏗️ Architecture

### State Management
- **React Context API** - Global state for recipes and favorites
- **Local Storage** - Persistent data storage (browser-based)
- **Custom Hooks** - Reusable state logic

### Data Flow
```
User Action → Component → Context → Local Storage → Re-render
```

### Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── RecipesList
│   ├── Recipe (details)
│   ├── Create
│   ├── RecipeFavorites
│   └── About
└── Footer
```

## ⚡ Performance

### Optimizations
- **Code Splitting** - Vite automatically splits code by route
- **Tree Shaking** - Unused code is removed in production
- **Image Optimization** - Images are optimized with `imageOptimization.jsx`
- **Lazy Loading** - React Router enables automatic lazy loading
- **Minification** - Production build is fully minified

### Best Practices
- Local storage queries are efficient for <1000 recipes
- Search uses exact string matching for fast filtering
- Sorting is optimized with native Array methods

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process using port 5173 or use a different port
npm run dev -- --port 5174
```

### Recipes Not Persisting
- Check browser's Local Storage isn't disabled
- Verify browser privacy settings allow Local Storage
- Try clearing browser cache and restarting

### Build Fails
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run build
```

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Clear browser cache: `Ctrl+Shift+Delete`
- Rebuild: `npm run build`

### Import/Export Not Working
- Ensure JSON file is properly formatted
- Check file size limits
- Verify JSON contains array of recipe objects

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
# Update vite.config.js with base path
npm run build
# Upload dist/ folder to GitHub Pages
```

### Deploy to Netlify
```bash
npm run build
# Connect repository to Netlify
# Netlify auto-detects build settings
```

### Deploy to Vercel
```bash
npm run build
# Connect repository to Vercel
# Configure build command: npm run build
# Configure output directory: dist
```

## 🗺️ Future Roadmap

### Planned Features
- [ ] User authentication & accounts
- [ ] Cloud synchronization (Firebase/Supabase)
- [ ] Sharing recipes with other users
- [ ] Recipe ratings and reviews
- [ ] Nutritional information
- [ ] Meal planning/scheduling
- [ ] Shopping list generation
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Social media integration

### Improvements
- [ ] Advanced filtering options
- [ ] Recipe versioning
- [ ] Collaborative editing
- [ ] API integration with recipe databases

## 🔧 Configuration

### Customization

Edit `src/constants/appSettings.jsx` to customize:
- App name and branding
- Default settings
- Feature flags
- UI preferences

### Environment Variables

Create `.env.local` if needed for API endpoints (currently not required)

## 📝 License

This project is open source and available under the **MIT License**. See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write clean, readable code
- Follow ESLint rules (`npm run lint`)
- Test your changes thoroughly
- Update documentation if needed
- Use meaningful commit messages

## 📧 Support

### Getting Help
- **Issues** - Open an issue on GitHub
- **Discussions** - Use GitHub Discussions for questions
- **Email** - Contact the maintainers

### Reporting Bugs
Include:
- Browser and OS information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 👨‍💻 Authors & Maintainers

Created with ❤️ for recipe enthusiasts and developers

## 🙏 Acknowledgments

- React team for amazing framework
- Vite for blazing fast build tool
- Tailwind CSS for beautiful styling
- All contributors and users

---

<div align="center">

**[⬆ back to top](#-recipe-atelier)**

Made with ❤️ | Star us on GitHub ⭐

</div>
