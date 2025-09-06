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
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/forgot-password', '/resetPassword', '/admin', '/author'];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const hideFooterRoutes = ['/login', '/register', '/forgot-password', '/resetPassword', '/admin', '/author'];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const userToken = useAppSelector((state) => state.login.token);
  const userRole = useAppSelector((state) => state.login.role);

  return (
    <>
      <Toaster position="top-center"
        toastOptions={{
          className: 'rounded-md shadow-md',
        }}
        containerStyle={{ zIndex: 9999 }} />
      <img src={assets.gradientBackground} alt="Decorative gradient background"
        aria-hidden="true"
        className='absolute -top-50 -z-1 opacity-50' />
      {!shouldHideNavbar && (
        <nav aria-label="Main navigation">
          <Navbar />
        </nav>
      )}

      <main className="flex-1" role="main" aria-live="polite">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
          {/* Admin */}
          <Route path='/admin' element={userToken && userRole === "admin" ? <Layout /> : <Login />}>
            <Route index element={<Dashbaord />} />
            <Route path='addBlog' element={<AddBlog />} />
            <Route path='listBlog' element={<ListBlog />} />
            <Route path='comments' element={<Comments />} />
            <Route path='users' element={<Users />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          {/* Author */}
          <Route path='/author' element={userToken && userRole === "author" ? <Layout /> : <Login />}>
            <Route index element={<AuthorDashboard />} />
            <Route path='addBlog' element={<AddBlog />} />
            <Route path='myBlogs' element={<MyBlogs />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </main>

      {!shouldHideFooter && (
        <footer aria-label="Site footer">
          <Footer />
        </footer>
      )}
    </>
  )
}

export default App