import { useState, useEffect, useContext, memo } from 'react'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams, useBlocker } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    RiHeartFill, RiHeartLine, RiEdit2Fill, RiCheckFill, RiDeleteBin6Fill,
    RiUserLine, RiMoneyDollarCircleLine, RiTeamLine, RiBookLine, RiSearchLine,
    RiFileList2Line, RiShareLine, RiDownload2Line, RiFileCopyLine, RiCloseLine, RiEyeLine,
} from 'react-icons/ri'
import ImageWithFallback from '../components/ImageWithFallback'
import FormField from '../components/FormField'
import ConfirmModal from '../components/ConfirmModal'
import ErrorBoundary from '../components/ErrorBoundary'
import EmptyState from '../components/EmptyState'
import RecipeContextState from '../context/RecipeContextState'
import { RECIPE_CATEGORIES, DIFFICULTY_OPTIONS } from '../constants/appSettings'
import { VALIDATION_RULES } from '../utils/validationRules'
import { exportRecipeToJSON, duplicateRecipe } from '../utils/recipeOperations'
import {
    formatCurrency, normalizeRecipeInstructionInput, normalizeRecipeListInput,
    parseInstructionSteps, parseRecipeList, sanitizeRecipe,
} from '../utils/formatters'

// Only allow nanoid-safe characters — prevents path traversal / injection via URL params
const sanitizeId = (rawId) => {
    if (!rawId || typeof rawId !== 'string') return null
    return /^[a-zA-Z0-9_-]+$/.test(rawId.trim()) ? rawId.trim() : null
}

const Recipe = memo(() => {
    const { recipes, isFavorite, toggleFavorite, updateRecipe, deleteRecipe, addRecipe } = useContext(RecipeContextState)
    const { id: rawId } = useParams()
    const id = sanitizeId(rawId)
    const navigate = useNavigate()
    const recipe = id ? recipes.find((item) => item.id === id) : null
    const favorite = isFavorite(id)

    // UI state
    const [isEditing, setIsEditing] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUnsavedModal, setShowUnsavedModal] = useState(false)

    const editableRecipe = recipe
        ? {
            ...recipe,
            recipeIngredients: normalizeRecipeListInput(recipe.recipeIngredients),
            recipeInstructions: normalizeRecipeInstructionInput(recipe.recipeInstructions),
        }
        : {}

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({ defaultValues: editableRecipe })

    // ── Unsaved-changes guards ──────────────────────────────────────────────

    // 1. Browser close / refresh
    useEffect(() => {
        const handler = (e) => {
            if (isDirty && isEditing) { e.preventDefault(); e.returnValue = '' }
        }
        window.addEventListener('beforeunload', handler)
        return () => window.removeEventListener('beforeunload', handler)
    }, [isDirty, isEditing])

    // 2. In-app navigation — useBlocker state drives the modal directly via
    //    isOpen prop, no setState-in-effect needed
    const blocker = useBlocker(isDirty && isEditing)

    // ── Handlers ───────────────────────────────────────────────────────────

    const updateRecipeHandler = async (updatedData) => {
        try {
            const sanitized = sanitizeRecipe({
                ...updatedData,
                recipeIngredients: normalizeRecipeListInput(updatedData.recipeIngredients),
                recipeInstructions: normalizeRecipeInstructionInput(updatedData.recipeInstructions),
            })
            updateRecipe(id, sanitized)
            toast.success('Recipe updated successfully!')
            setIsEditing(false)
            reset(sanitized)
        } catch (error) {
            toast.error('Failed to update recipe')
            console.error(error)
        }
    }

    const handleCancelEdit = () => {
        if (isDirty) {
            setShowUnsavedModal(true)
        } else {
            setIsEditing(false)
            reset(editableRecipe)
        }
    }

    const confirmDelete = () => {
        deleteRecipe(id)
        toast.success('Recipe deleted successfully!')
        navigate('/recipes')
    }

    const handleDuplicate = () => {
        const duped = { ...duplicateRecipe(recipe), id: nanoid(), recipeName: `${recipe.recipeName} (Copy)` }
        addRecipe(duped)
        toast.success('Recipe duplicated! Find it in your recipes list.')
        navigate('/recipes')
    }

    const handleFavoriteClick = () => {
        toggleFavorite(id)
        toast.success(favorite ? 'Removed from favorites!' : 'Added to favorites!')
    }

    const handleShareClick = async () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}`
        try {
            if (navigator.share) {
                await navigator.share({ title: recipe.recipeName, text: `Check out this recipe: ${recipe.recipeName}`, url: shareUrl })
                return
            }
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl)
                toast.success('Recipe link copied to clipboard!')
                return
            }
            toast.info(`Copy this link: ${shareUrl}`, { autoClose: 8000 })
        } catch (error) {
            if (error?.name !== 'AbortError') toast.error('Unable to share this recipe')
        }
    }

    const handleExportClick = () => {
        exportRecipeToJSON(recipe)
        toast.success('Recipe exported as JSON')
    }

    // ── Not found ──────────────────────────────────────────────────────────

    if (!recipe) {
        return (
            <ErrorBoundary>
                <EmptyState
                    icon={RiSearchLine}
                    title='Recipe not found'
                    description='The recipe you are looking for does not exist.'
                    actionButton={
                        <button
                            onClick={() => navigate('/recipes')}
                            className='inline-block rounded-xl border border-[rgba(99,54,42,0.22)] px-4 py-2.5 text-sm font-bold text-[#63362a] transition hover:border-[rgba(144,74,45,0.45)] hover:bg-[rgba(255,248,238,0.85)]'
                        >
                            ← Back to Recipes
                        </button>
                    }
                />
            </ErrorBoundary>
        )
    }

    // ── Render ─────────────────────────────────────────────────────────────

    return (
        <ErrorBoundary>
            <section className='flex flex-col gap-5'>
                <div className={`grid gap-5 items-start ${isEditing ? 'grid-cols-1 lg:grid-cols-[1.1fr_1fr]' : 'grid-cols-1'}`}>

                    {/* ── Recipe Detail ── */}
                    <article className='space-y-5 rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-5 backdrop-blur-[2px]'>
                        <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f] flex items-center gap-2'>
                            <RiFileList2Line size={16} /> Recipe Detail
                        </p>
                        <h1 className="max-w-xl font-['Fraunces'] text-[clamp(2rem,5vw,3.1rem)] leading-[0.98]">
                            {recipe.recipeName}
                        </h1>

                        {/* Image */}
                        <div className='max-w-2xl overflow-hidden rounded-2xl border border-[rgba(97,60,44,0.2)] aspect-video'>
                            <ImageWithFallback
                                src={recipe.recipeImageUrl}
                                alt={recipe.recipeName}
                                className='w-full h-full object-cover'
                                width={400}
                                height={300}
                            />
                        </div>

                        {/* Meta + Actions */}
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                            <div className='flex flex-wrap items-center gap-2'>
                                <span className='rounded-full bg-[rgba(191,91,51,0.12)] px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.09em] text-[#8f3f1f]'>
                                    {recipe.recipeCategory || 'uncategorized'}
                                </span>
                                <span className='text-sm text-[#73544a] flex items-center gap-1'><RiUserLine size={14} /> {recipe.chefName || 'Unknown Chef'}</span>
                                <span className='text-sm font-semibold text-[#5c3426] flex items-center gap-1'>
                                    <RiMoneyDollarCircleLine size={14} /> {formatCurrency(recipe.recipePricing)}
                                </span>
                            </div>
                            <div className='flex flex-wrap items-center gap-2'>
                                <button
                                    onClick={handleFavoriteClick}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition flex items-center gap-2 ${favorite ? 'bg-[#bf5b33] text-[#ffefe8] hover:bg-[#a74925]' : 'border border-[rgba(191,91,51,0.5)] text-[#bf5b33] hover:bg-[rgba(191,91,51,0.1)]'}`}
                                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    {favorite ? <><RiHeartFill size={16} /> Favorited</> : <><RiHeartLine size={16} /> Favorite</>}
                                </button>

                                <button
                                    onClick={() => setIsEditing(prev => !prev)}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition flex items-center gap-2 ${isEditing ? 'bg-[rgba(191,91,51,0.12)] text-[#bf5b33] border border-[rgba(191,91,51,0.3)]' : 'border border-[rgba(191,91,51,0.35)] text-[#bf5b33] hover:bg-[rgba(191,91,51,0.1)]'}`}
                                    aria-label={isEditing ? 'Hide edit form' : 'Show edit form'}
                                >
                                    {isEditing ? <><RiEyeLine size={16} /> View Only</> : <><RiEdit2Fill size={16} /> Edit</>}
                                </button>

                                <button
                                    onClick={handleDuplicate}
                                    className='rounded-xl border border-[rgba(191,91,51,0.35)] px-4 py-2.5 text-sm font-bold text-[#bf5b33] transition hover:bg-[rgba(191,91,51,0.1)] flex items-center gap-2'
                                    aria-label='Duplicate recipe'
                                >
                                    <RiFileCopyLine size={16} /> Duplicate
                                </button>

                                <button
                                    onClick={handleShareClick}
                                    className='rounded-xl border border-[rgba(191,91,51,0.35)] px-4 py-2.5 text-sm font-bold text-[#bf5b33] transition hover:bg-[rgba(191,91,51,0.1)] flex items-center gap-2'
                                    aria-label='Share recipe'
                                >
                                    <RiShareLine size={16} /> Share
                                </button>

                                <button
                                    onClick={handleExportClick}
                                    className='rounded-xl border border-[rgba(191,91,51,0.35)] px-4 py-2.5 text-sm font-bold text-[#bf5b33] transition hover:bg-[rgba(191,91,51,0.1)] flex items-center gap-2'
                                    aria-label='Export recipe as JSON'
                                >
                                    <RiDownload2Line size={16} /> Export
                                </button>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className='rounded-xl border border-[rgba(232,93,71,0.4)] px-4 py-2.5 text-sm font-bold text-[#e85d47] transition hover:bg-[rgba(232,93,71,0.08)] flex items-center gap-2'
                                    aria-label='Delete recipe'
                                >
                                    <RiDeleteBin6Fill size={16} /> Delete
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <p className='max-w-2xl text-[#73544a] leading-relaxed'>{recipe.recipeDescription}</p>

                        {/* Timing / Servings / Difficulty */}
                        {(recipe.prepTime || recipe.cookTime || recipe.servings || recipe.difficulty) && (
                            <div className='rounded-xl bg-[#fff9ef] p-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                                {recipe.prepTime && (
                                    <div>
                                        <p className='font-semibold text-[#6a4439] flex items-center gap-1'><RiCheckFill size={14} /> Prep</p>
                                        <p className='text-[#73544a]'>{recipe.prepTime}</p>
                                    </div>
                                )}
                                {recipe.cookTime && (
                                    <div>
                                        <p className='font-semibold text-[#6a4439] flex items-center gap-1'><RiCheckFill size={14} /> Cook</p>
                                        <p className='text-[#73544a]'>{recipe.cookTime}</p>
                                    </div>
                                )}
                                {recipe.servings && (
                                    <div>
                                        <p className='font-semibold text-[#6a4439] flex items-center gap-1'><RiCheckFill size={14} /> Servings</p>
                                        <p className='text-[#73544a]'>{recipe.servings}</p>
                                    </div>
                                )}
                                {recipe.difficulty && (
                                    <div>
                                        <p className='font-semibold text-[#6a4439] flex items-center gap-1'><RiCheckFill size={14} /> Level</p>
                                        <p className='text-[#73544a] capitalize'>{recipe.difficulty}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Ingredients & Instructions */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <div className='rounded-xl border border-[rgba(97,60,44,0.2)] bg-[#fff9ef] p-3'>
                                <p className='text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#6a4439] flex items-center gap-1'>
                                    <RiTeamLine size={14} /> Ingredients
                                </p>
                                <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-[#73544a]'>
                                    {parseRecipeList(recipe.recipeIngredients).map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='rounded-xl border border-[rgba(97,60,44,0.2)] bg-[#fff9ef] p-3'>
                                <p className='text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#6a4439] flex items-center gap-1'>
                                    <RiBookLine size={14} /> Instructions
                                </p>
                                <ol className='mt-2 list-decimal space-y-1 pl-5 text-sm text-[#73544a]'>
                                    {parseInstructionSteps(recipe.recipeInstructions).map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </article>

                    {/* ── Edit Form (toggled) ── */}
                    {isEditing && (
                        <form
                            onSubmit={handleSubmit(updateRecipeHandler)}
                            className='rounded-[20px] border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-4 max-w-xl h-fit'
                            noValidate
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f] flex items-center gap-2'>
                                    <RiEdit2Fill size={14} /> Edit Recipe
                                </p>
                                <button
                                    type='button'
                                    onClick={handleCancelEdit}
                                    className='rounded-lg p-1.5 text-[#73544a] hover:bg-[rgba(191,91,51,0.08)] transition'
                                    aria-label='Close edit form'
                                >
                                    <RiCloseLine size={18} />
                                </button>
                            </div>

                            <div className='space-y-3'>
                                <FormField label='Recipe Name' type='text' error={errors.recipeName} {...register('recipeName', VALIDATION_RULES.recipeName)} />
                                <FormField label='Chef Name' type='text' error={errors.chefName} {...register('chefName', VALIDATION_RULES.chefName)} />
                                <FormField
                                    label='Category' type='select' error={errors.recipeCategory}
                                    options={RECIPE_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))}
                                    {...register('recipeCategory', VALIDATION_RULES.recipeCategory)}
                                />
                                <FormField
                                    label='Difficulty' type='select'
                                    options={DIFFICULTY_OPTIONS}
                                    {...register('difficulty')}
                                />
                                <FormField label='Price' type='number' step='0.01' error={errors.recipePricing} {...register('recipePricing', VALIDATION_RULES.recipePricing)} />
                                <FormField label='Image URL' type='url' error={errors.recipeImageUrl} {...register('recipeImageUrl', VALIDATION_RULES.recipeImageUrl)} />
                                <FormField label='Prep Time' type='text' placeholder='e.g., 15 mins' {...register('prepTime')} />
                                <FormField label='Cook Time' type='text' placeholder='e.g., 30 mins' {...register('cookTime')} />
                                <FormField label='Servings' type='number' min='1' {...register('servings', { min: { value: 1, message: 'Minimum 1 serving' } })} />
                                <FormField label='Description' type='textarea' rows='2' maxLength='500' error={errors.recipeDescription} {...register('recipeDescription', VALIDATION_RULES.recipeDescription)} />
                                <FormField
                                    label='Ingredients' type='textarea' rows='3'
                                    placeholder='Write one ingredient per line'
                                    hint='e.g., Pasta\nTomato sauce\nGarlic'
                                    error={errors.recipeIngredients}
                                    {...register('recipeIngredients', VALIDATION_RULES.recipeIngredients)}
                                />
                                <FormField
                                    label='Instructions' type='textarea' rows='3'
                                    placeholder='Write one step per line'
                                    hint='e.g., Boil water\nAdd pasta\nStir and serve'
                                    error={errors.recipeInstructions}
                                    {...register('recipeInstructions', VALIDATION_RULES.recipeInstructions)}
                                />
                            </div>

                            <div className='mt-4 flex flex-col gap-2 border-t border-[rgba(97,60,44,0.2)] pt-4'>
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full rounded-xl bg-[#bf5b33] px-4 py-2.5 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                >
                                    {isSubmitting ? 'Updating...' : <><RiCheckFill size={16} /> Update Recipe</>}
                                </button>
                                <button
                                    type='button'
                                    onClick={handleCancelEdit}
                                    className='w-full rounded-xl border border-[rgba(99,54,42,0.22)] px-4 py-2.5 text-sm font-bold text-[#63362a] transition hover:bg-[rgba(255,248,238,0.85)]'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* ── Delete confirmation modal ── */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title='Delete Recipe'
                message={`Are you sure you want to delete "${recipe.recipeName}"? This action cannot be undone.`}
                confirmLabel='Delete'
                cancelLabel='Keep Recipe'
                variant='danger'
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            {/* ── Unsaved changes modal ── */}
            <ConfirmModal
                isOpen={showUnsavedModal || blocker.state === 'blocked'}
                title='Unsaved Changes'
                message='You have unsaved changes. If you leave now, your edits will be lost.'
                confirmLabel='Leave Anyway'
                cancelLabel='Keep Editing'
                variant='warning'
                onConfirm={() => {
                    setShowUnsavedModal(false)
                    setIsEditing(false)
                    reset(editableRecipe)
                    if (blocker.state === 'blocked') blocker.proceed()
                }}
                onCancel={() => {
                    setShowUnsavedModal(false)
                    if (blocker.state === 'blocked') blocker.reset()
                }}
            />
        </ErrorBoundary>
    )
})

Recipe.displayName = 'Recipe'

export default Recipe