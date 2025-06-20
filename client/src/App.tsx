import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { assets } from './assets/assets'

const App = () => {
  return (
    <>
      <img src={assets.gradientBackground} alt=""
        className='absolute -top-50 -z-1 opacity-50' />
      <Navbar />
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App