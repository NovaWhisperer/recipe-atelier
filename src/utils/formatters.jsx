// Formatting & Display Utilities
export const formatCurrency = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price || 0)
}

export const formatText = (text, maxLength = 100) => {
  if (!text) return ''
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export const getCategoryColor = (category) => {
  const colorMap = {
    breakfast: 'bg-[#ffd699]',
    appetizer: 'bg-[#ffe5cc]',
    'main-course': 'bg-[#ffdbcc]',
    dessert: 'bg-[#ffd9d0]',
  }
  return colorMap[category] || 'bg-[#e8d4c8]'
}

export const getDifficultyBadge = (difficulty) => {
  const badges = {
    easy: { color: 'bg-green-100', text: 'text-green-700' },
    medium: { color: 'bg-yellow-100', text: 'text-yellow-700' },
    hard: { color: 'bg-red-100', text: 'text-red-700' },
  }
  return badges[difficulty] || badges.medium
}

export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const sanitizeSearchTerm = (term) => {
  return term.toLowerCase().trim().replace(/[^\w\s-]/g, '')
}

// Parse multi-line recipe lists, while supporting legacy comma-separated values.
export const parseRecipeList = (value) => {
  return String(value || '')
    .split(/\r?\n|,/) 
    .map((item) => item.trim())
    .filter(Boolean)
}

export const normalizeRecipeListInput = (value) => {
  return parseRecipeList(value).join('\n')
}

// Parse instruction steps from common separators and sentence-style input.
export const parseInstructionSteps = (value) => {
  return String(value || '')
    .split(/\r?\n|,|;|(?<=[.!?])\s+(?=[A-Z])/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export const normalizeRecipeInstructionInput = (value) => {
  return parseInstructionSteps(value).join('\n')
}
