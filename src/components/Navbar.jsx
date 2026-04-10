import { NavLink } from 'react-router-dom'
import { RiHome2Line, RiFileList2Line, RiHeartLine, RiInformationLine, RiAddCircleLine, RiHome2Fill, RiFileList2Fill, RiHeartFill, RiInformationFill, RiAddCircleFill } from 'react-icons/ri'

const Navbar = () => {
    const navLinkClass = ({ isActive }) =>
        `rounded-full border px-4 py-2 text-sm font-semibold transition flex items-center gap-2 ${
            isActive
                ? 'border-transparent bg-[#bf5b33] text-[#fff5ed] shadow-[0_12px_24px_rgba(191,91,51,0.3)]'
                : 'border-[rgba(191,91,51,0.25)] text-[#73544a] hover:border-[#bf5b33] hover:text-[#2e1d17] hover:bg-[rgba(191,91,51,0.05)]'
        }`

    return (
        <>
            <p className="font-['Fraunces'] text-[clamp(1.2rem,2.3vw,1.65rem)] font-bold tracking-[0.01em]">Recipe Atelier</p>

            <div className='flex flex-wrap gap-2'>
                <NavLink className={navLinkClass} to={'/'}>
                    {({ isActive }) => <>
                        {isActive ? <RiHome2Fill size={18} /> : <RiHome2Line size={18} />}
                        Home
                    </>}
                </NavLink>
                <NavLink className={navLinkClass} to={'/recipes'}>
                    {({ isActive }) => <>
                        {isActive ? <RiFileList2Fill size={18} /> : <RiFileList2Line size={18} />}
                        Recipes
                    </>}
                </NavLink>
                <NavLink className={navLinkClass} to={'/favorites'}>
                    {({ isActive }) => <>
                        {isActive ? <RiHeartFill size={18} /> : <RiHeartLine size={18} />}
                        Favorites
                    </>}
                </NavLink>
                <NavLink className={navLinkClass} to={'/about'}>
                    {({ isActive }) => <>
                        {isActive ? <RiInformationFill size={18} /> : <RiInformationLine size={18} />}
                        About
                    </>}
                </NavLink>
                <NavLink className={navLinkClass} to={'/create-recipe'}>
                    {({ isActive }) => <>
                        {isActive ? <RiAddCircleFill size={18} /> : <RiAddCircleLine size={18} />}
                        Create
                    </>}
                </NavLink>
            </div>
        </>
    )
}

export default Navbar
