import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { clearLogin } from '../../redux/store/slice/loginSlice';
import AuthorSidebar from '../../components/author/AuthorSidebar';

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userToken = useAppSelector((state) => state.login.token);
    const userRole = useAppSelector((state) => state.login.role);

    useEffect(() => {
        if (!userToken || (userRole !== "admin" && userRole !== "author")) {
            navigate('/');
        }
    }, [userToken, userRole, navigate]);

    const logout = () => {
        dispatch(clearLogin());
        navigate('/');
    };

    return (
        <>
            <header className='flex items-center justify-between py-2 h-[70px]
            max-h-screen px-4 sm:px-12 border-b border-gray-200' role="banner">
                <img src={assets.logo} alt="Company logo - navigate to homepage" onClick={() => navigate('/')}
                    className='w-32 sm:w-40 cursor-pointer' />
                <button onClick={logout} aria-label="Logout from your account"
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
            </header>

            {userToken && userRole === "admin" && (
                <div className='flex min-h-screen'>

                    <nav aria-label="Admin sidebar navigation"
                        className="shrink-0">
                        <Sidebar />
                    </nav>
                    <main id="main-content" role="main" className="flex-1">
                        <Outlet />
                    </main>
                </div>
            )}

            {userToken && userRole === "author" && (
                <div className='flex min-h-screen'>
                    <nav
                        aria-label="Author sidebar navigation"
                        className="shrink-0"
                    >
                        <AuthorSidebar />
                    </nav>
                    <main id="main-content" role="main" className="flex-1">
                        <Outlet />
                    </main>
                </div >
            )}

        </>
    );
};

export default Layout;
