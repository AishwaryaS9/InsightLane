import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { assets } from './assets/assets'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import Blog from './pages/Blog'
import { useAppSelector } from './redux/store/hooks'
import Layout from './pages/admin/Layout'
import Dashbaord from './pages/admin/Dashboard'
import AddBlog from './pages/author/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Users from './pages/admin/Users'
import AuthorDashboard from './pages/author/AuthorDashboard'
import MyBlogs from './pages/author/MyBlogs'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import About from './pages/About'

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/admin', '/author'];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const hideFooterRoutes = ['/login', '/register', '/admin', '/author'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const userToken = useAppSelector((state) => state.login.token);
  const userRole = useAppSelector((state) => state.login.role);


  return (
    <>
      <Toaster />
      <img src={assets.gradientBackground} alt=""
        className='absolute -top-50 -z-1 opacity-50' />
      {!shouldHideNavbar && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/about' element={<About />} />
          {/* Admin */}
          <Route path='/admin' element={userToken && userRole === "admin" ? <Layout /> : <Login />}>
            <Route index element={<Dashbaord />} />
            <Route path='listBlog' element={<ListBlog />} />
            <Route path='comments' element={<Comments />} />
            <Route path='users' element={<Users />} />
          </Route>
          {/* Author */}
          <Route path='/author' element={userToken && userRole === "author" ? <Layout /> : <Login />}>
            <Route index element={<AuthorDashboard />} />
            <Route path='addBlog' element={<AddBlog />} />
            <Route path='myBlogs' element={<MyBlogs />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  )
}

export default App