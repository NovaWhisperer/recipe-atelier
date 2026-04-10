import { Link } from 'react-router-dom'
import { RiFileList2Line, RiAddCircleLine, RiSearchLine, RiCheckFill, RiTimeLine, RiShieldCheckFill, RiLightbulbLine, RiFireLine } from 'react-icons/ri'

const About = () => {
    return (
        <section className='flex flex-col gap-5'>
            {/* Hero Section */}
            <header className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[radial-gradient(circle_at_88%_22%,rgba(255,221,162,0.62),transparent_34%),linear-gradient(145deg,#fff4e5,#f8e4ca_52%,#f5e1ce)] p-5'>
                <div className='flex items-center gap-2 mb-3'>
                    <RiFileList2Line size={24} className='text-[#bf5b33]' />
                    <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f]'>About Recipe Maker</p>
                </div>
                <h1 className="max-w-3xl font-['Fraunces'] text-[clamp(2rem,5vw,3.1rem)] leading-[0.98]">
                    Your personal recipe workspace
                </h1>
                <p className='mt-4 max-w-2xl text-lg text-[#73544a]'>
                    Recipe Maker is a beautifully designed application that helps you collect, organize, and share your favorite recipes with ease.
                </p>
            </header>

            {/* Why Choose Us */}
            <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[rgba(255,250,243,0.86)] p-5'>
                <h2 className="mb-5 font-['Fraunces'] text-[clamp(1.5rem,3.2vw,2rem)] flex items-center gap-3">
                    <RiFireLine size={28} className='text-[#bf5b33]' />
                    Why Recipe Maker?
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex gap-3 rounded-xl bg-[#fff9ef] p-4'>
                        <div className='shrink-0'>
                            <RiCheckFill size={20} className='text-[#bf5b33] mt-1' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-[#2e1d17] mb-1'>Fast & Intuitive</h4>
                            <p className='text-sm text-[#73544a]'>Simple interface that gets out of your way so you can focus on your recipes.</p>
                        </div>
                    </div>

                    <div className='flex gap-3 rounded-xl bg-[#fff9ef] p-4'>
                        <div className='shrink-0'>
                            <RiCheckFill size={20} className='text-[#bf5b33] mt-1' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-[#2e1d17] mb-1'>Beautiful Design</h4>
                            <p className='text-sm text-[#73544a]'>Modern, warm aesthetic that makes browsing recipes a pleasure.</p>
                        </div>
                    </div>

                    <div className='flex gap-3 rounded-xl bg-[#fff9ef] p-4'>
                        <div className='shrink-0'>
                            <RiShieldCheckFill size={20} className='text-[#bf5b33] mt-1' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-[#2e1d17] mb-1'>Fully Functional</h4>
                            <p className='text-sm text-[#73544a]'>Create, edit, delete, search, and organize all in one place.</p>
                        </div>
                    </div>

                    <div className='flex gap-3 rounded-xl bg-[#fff9ef] p-4'>
                        <div className='shrink-0'>
                            <RiLightbulbLine size={20} className='text-[#bf5b33] mt-1' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-[#2e1d17] mb-1'>Smart Organization</h4>
                            <p className='text-sm text-[#73544a]'>Filter by category, search instantly, and keep your collection organized.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className='rounded-3xl border border-[rgba(97,60,44,0.2)] bg-[radial-gradient(circle_at_88%_22%,rgba(255,221,162,0.62),transparent_34%),linear-gradient(145deg,#fff4e5,#f8e4ca_52%,#f5e1ce)] p-5 text-center'>
                <h2 className="mb-3 font-['Fraunces'] text-[clamp(1.5rem,3.2vw,2rem)]">Ready to Get Started?</h2>
                <p className='mb-5 max-w-2xl mx-auto text-[#73544a]'>
                    Start building your recipe collection today. Create, organize, and share your favorite dishes with ease.
                </p>
                <div className='flex flex-wrap justify-center gap-3'>
                    <Link
                        to='/create-recipe'
                        className='rounded-xl bg-[#bf5b33] px-6 py-3 text-sm font-bold text-[#ffefe8] transition hover:bg-[#a74925] inline-flex items-center gap-2'
                    >
                        <RiAddCircleLine size={18} />
                        Create Your First Recipe
                    </Link>
                    <Link
                        to='/recipes'
                        className='rounded-xl border border-[rgba(99,54,42,0.22)] px-6 py-3 text-sm font-bold text-[#63362a] transition hover:bg-[rgba(255,248,238,0.85)] inline-flex items-center gap-2'
                    >
                        <RiSearchLine size={18} />
                        Explore Recipes
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default About
