import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RiCheckFill, RiRefreshLine } from 'react-icons/ri'
import FormField from '../components/FormField'
import ErrorBoundary from '../components/ErrorBoundary'
import RecipeContextState from '../context/RecipeContextState'
import { RECIPE_CATEGORIES } from '../constants/appSettings'
import { VALIDATION_RULES } from '../utils/validationRules'
import { normalizeRecipeInstructionInput, normalizeRecipeListInput } from '../utils/formatters'

const Create = () => {
    const { addRecipe } = useContext(RecipeContextState)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const submitHandler = async (formData) => {
        try {
            const newRecipe = {
                ...formData,
                id: nanoid(),
                recipePricing: Number(formData.recipePricing),
                servings: Number(formData.servings) || 4,
                recipeIngredients: normalizeRecipeListInput(formData.recipeIngredients),
                recipeInstructions: normalizeRecipeInstructionInput(formData.recipeInstructions),
            }
            
            addRecipe(newRecipe)
            toast.success('Recipe created successfully!')
            reset()
            navigate('/recipes')
        } catch (error) {
            toast.error('Failed to create recipe')
            console.error(error)
        }
    }

    return (
        <ErrorBoundary>
            <section className='flex flex-col gap-5'>
                <header className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[radial-gradient(circle_at_88%_22%,rgba(255,221,162,0.62),transparent_34%),linear-gradient(145deg,#fff4e5,#f8e4ca_52%,#f5e1ce)] p-5'>
                    <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f]'>
                        Create Recipe
                    </p>
                    <h1 className="mt-2 font-['Fraunces'] text-[clamp(1.25rem,3.2vw,1.8rem)]">
                        Add a new dish to your recipe archive
                    </h1>
                    <p className='mt-2 text-[#73544a]'>
                        Capture all details once so every card in your collection looks complete and polished.
                    </p>
                </header>

                <form onSubmit={handleSubmit(submitHandler)} className='rounded-[20px] border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-4' noValidate>
                    {/* Basic Info */}
                    <div className='mb-6'>
                        <h3 className='mb-4 text-lg font-semibold text-[#2e1d17]'>Basic Information</h3>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <FormField
                                label='Recipe Name'
                                type='text'
                                placeholder='e.g., Spaghetti Carbonara'
                                error={errors.recipeName}
                                required
                                {...register('recipeName', VALIDATION_RULES.recipeName)}
                            />

                            <FormField
                                label='Chef Name'
                                type='text'
                                placeholder='Your name'
                                error={errors.chefName}
                                required
                                {...register('chefName', VALIDATION_RULES.chefName)}
                            />

                            <FormField
                                label='Category'
                                type='select'
                                error={errors.recipeCategory}
                                required
                                options={RECIPE_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))}
                                {...register('recipeCategory', VALIDATION_RULES.recipeCategory)}
                            />

                            <FormField
                                label='Recipe Price ($)'
                                type='number'
                                placeholder='0.00'
                                step='0.01'
                                error={errors.recipePricing}
                                required
                                {...register('recipePricing', VALIDATION_RULES.recipePricing)}
                            />
                        </div>
                    </div>

                    {/* Image & Pricing */}
                    <div className='mb-6'>
                        <h3 className='mb-4 text-lg font-semibold text-[#2e1d17]'>Media & Details</h3>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <FormField
                                label='Recipe Image URL'
                                type='url'
                                placeholder='https://example.com/image.jpg'
                                error={errors.recipeImageUrl}
                                required
                                hint='Use HTTPS URLs for best results'
                                {...register('recipeImageUrl', VALIDATION_RULES.recipeImageUrl)}
                            />

                            <FormField
                                label='Servings'
                                type='number'
                                placeholder='4'
                                min='1'
                                error={errors.servings}
                                {...register('servings', { min: { value: 1, message: 'Minimum 1 serving' } })}
                            />

                            <FormField
                                label='Prep Time'
                                type='text'
                                placeholder='e.g., 15 mins'
                                {...register('prepTime')}
                            />

                            <FormField
                                label='Cook Time'
                                type='text'
                                placeholder='e.g., 30 mins'
                                {...register('cookTime')}
                            />
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className='mb-6'>
                        <h3 className='mb-4 text-lg font-semibold text-[#2e1d17]'>Recipe Details</h3>
                        <div className='grid grid-cols-1 gap-4'>
                            <FormField
                                label='Description'
                                type='textarea'
                                placeholder='Tell us about this dish...'
                                rows='3'
                                maxLength='500'
                                error={errors.recipeDescription}
                                required
                                hint='Max 500 characters'
                                {...register('recipeDescription', VALIDATION_RULES.recipeDescription)}
                            />

                            <FormField
                                label='Ingredients'
                                type='textarea'
                                placeholder='Write one ingredient per line'
                                rows='4'
                                error={errors.recipeIngredients}
                                required
                                hint={'e.g., Pasta\nTomato sauce\nGarlic'}
                                {...register('recipeIngredients', VALIDATION_RULES.recipeIngredients)}
                            />

                            <FormField
                                label='Instructions'
                                type='textarea'
                                placeholder='Write one step per line'
                                rows='4'
                                error={errors.recipeInstructions}
                                required
                                hint={'e.g., Boil water\nAdd pasta\nStir and serve'}
                                {...register('recipeInstructions', VALIDATION_RULES.recipeInstructions)}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-wrap gap-3 pt-4 border-t border-[rgba(97,60,44,0.2)]'>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='rounded-xl bg-[#bf5b33] px-6 py-2.5 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                            aria-label='Create recipe'
                        >
                            {isSubmitting ? 'Creating...' : (
                                <>
                                    <RiCheckFill size={16} />
                                    Create Recipe
                                </>
                            )}
                        </button>
                        <button
                            type='button'
                            onClick={() => reset()}
                            className='rounded-xl border border-[rgba(99,54,42,0.22)] px-6 py-2.5 text-sm font-bold text-[#63362a] transition hover:border-[rgba(144,74,45,0.45)] hover:bg-[rgba(255,248,238,0.85)] flex items-center gap-2'
                            aria-label='Reset form fields'
                        >
                            <RiRefreshLine size={16} />
                            Reset
                        </button>
                    </div>
                </form>
            </section>
        </ErrorBoundary>
    )
}

export default Create
