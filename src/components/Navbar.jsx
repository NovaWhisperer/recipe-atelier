import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
    RiHome2Line, RiFileList2Line, RiHeartLine, RiInformationLine, RiAddCircleLine,
    RiHome2Fill, RiFileList2Fill, RiHeartFill, RiInformationFill, RiAddCircleFill,
    RiMenuLine, RiCloseLine,
} from 'react-icons/ri'

const NAV_LINKS = [
    { to: '/',              label: 'Home',      Icon: RiHome2Line,       ActiveIcon: RiHome2Fill },
    { to: '/recipes',       label: 'Recipes',   Icon: RiFileList2Line,   ActiveIcon: RiFileList2Fill },
    { to: '/favorites',     label: 'Favorites', Icon: RiHeartLine,       ActiveIcon: RiHeartFill },
    { to: '/about',         label: 'About',     Icon: RiInformationLine, ActiveIcon: RiInformationFill },
    { to: '/create-recipe', label: 'Create',    Icon: RiAddCircleLine,   ActiveIcon: RiAddCircleFill },
]

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const menuRef = useRef(null)

    // Close on Escape key
    useEffect(() => {
        if (!mobileOpen) return
        const handle = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
        document.addEventListener('keydown', handle)
        return () => document.removeEventListener('keydown', handle)
    }, [mobileOpen])

    // Close on outside click
    useEffect(() => {
        if (!mobileOpen) return
        const handle = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false)
        }
        document.addEventListener('mousedown', handle)
        return () => document.removeEventListener('mousedown', handle)
    }, [mobileOpen])

    // Derive active state from location — avoids NavLink render-prop pattern
    // which caused ESLint no-unused-vars false positives on Icon/ActiveIcon
    const getIsActive = (to) => {
        if (to === '/') return location.pathname === '/' || location.pathname === '/home'
        return location.pathname.startsWith(to)
    }

    const desktopLinkClass = (to) => {
        const isActive = getIsActive(to)
        return `rounded-full border px-4 py-2 text-sm font-semibold transition flex items-center gap-2 ${
            isActive
                ? 'border-transparent bg-[#bf5b33] text-[#fff5ed] shadow-[0_12px_24px_rgba(191,91,51,0.3)]'
                : 'border-[rgba(191,91,51,0.25)] text-[#73544a] hover:border-[#bf5b33] hover:text-[#2e1d17] hover:bg-[rgba(191,91,51,0.05)]'
        }`
    }

    const mobileLinkClass = (to) => {
        const isActive = getIsActive(to)
        return `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isActive
                ? 'bg-[#bf5b33] text-[#fff5ed]'
                : 'text-[#73544a] hover:bg-[rgba(191,91,51,0.08)] hover:text-[#2e1d17]'
        }`
    }

    return (
        <div className='flex w-full items-center justify-between' ref={menuRef}>
            <p className="font-['Fraunces'] text-[clamp(1.2rem,2.3vw,1.65rem)] font-bold tracking-[0.01em]">
                Recipe Atelier
            </p>

            {/* Desktop nav */}
            <nav className='hidden md:flex flex-wrap gap-2' aria-label='Main navigation'>
                {NAV_LINKS.map(({ to, label, Icon, ActiveIcon }) => {
                    const isActive = getIsActive(to)
                    const LinkIcon = isActive ? ActiveIcon : Icon
                    return (
                        <NavLink key={to} to={to} className={desktopLinkClass(to)} end={to === '/'} aria-current={isActive ? 'page' : undefined}>
                            <LinkIcon size={18} />
                            {label}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Mobile hamburger button */}
            <button
                className='md:hidden rounded-xl border border-[rgba(191,91,51,0.25)] p-2.5 text-[#73544a] transition hover:bg-[rgba(191,91,51,0.08)]'
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls='mobile-nav'
            >
                {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
            </button>

            {/* Mobile dropdown — closes via onClick on each link (no effect needed) */}
            {mobileOpen && (
                <nav
                    id='mobile-nav'
                    className='absolute top-18 left-4 right-4 z-40 flex flex-col gap-1.5 rounded-2xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.98)] p-3 shadow-[0_16px_40px_rgba(91,60,43,0.18)] backdrop-blur-md md:hidden'
                    aria-label='Mobile navigation'
                >
                    {NAV_LINKS.map(({ to, label, Icon, ActiveIcon }) => {
                        const isActive = getIsActive(to)
                        const LinkIcon = isActive ? ActiveIcon : Icon
                        return (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={mobileLinkClass(to)}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => setMobileOpen(false)}
                            >
                                <LinkIcon size={18} />
                                {label}
                            </NavLink>
                        )
                    })}
                </nav>
            )}
        </div>
    )
}

export default Navbar