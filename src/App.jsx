import MainRoutes from './routes/Mainroutes'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_90%_5%,rgba(255,208,122,0.32),transparent_28%),radial-gradient(circle_at_10%_18%,rgba(207,120,75,0.2),transparent_34%),linear-gradient(160deg,#f4ecdf,#e7d6bf)] py-5 text-[#2e1d17] font-['Manrope'] md:py-2">
        <div className='mx-auto min-h-[calc(100vh-2.5rem)] w-[min(1120px,calc(100%-1.75rem))] rounded-[30px] border border-[rgba(97,60,44,0.2)] bg-[linear-gradient(135deg,rgba(255,250,242,0.96),rgba(250,240,226,0.88))] p-5 shadow-[0_24px_60px_rgba(91,60,43,0.14)] md:min-h-[calc(100vh-1rem)] md:w-[calc(100%-1rem)] md:rounded-[20px] md:p-4'>
          <header className='mb-6 flex flex-wrap items-center justify-between gap-4'>
            <Navbar />
          </header>

          <main className='flex flex-col gap-5'>
            <MainRoutes />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
