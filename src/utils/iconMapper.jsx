import {
  RiRestaurant2Fill,
  RiLeafLine,
  RiRestaurantLine,
  RiCake2Line,
} from 'react-icons/ri'

// Map icon names to RemixIcon components
export const iconMap = {
  RiRestaurant2Fill,
  RiLeafLine,
  RiRestaurantLine,
  RiCake2Line,
}

// Get icon component by name
export const getIconComponent = (iconName) => {
  return iconMap[iconName] || null
}
