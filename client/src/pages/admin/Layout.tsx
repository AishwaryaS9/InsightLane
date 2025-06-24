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
            <div className='flex items-center justify-between py-2
            h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <img src={assets.logo} alt="" onClick={() => navigate('/')}
                    className='w-32 sm:w-40 cursor-pointer' />
                <button onClick={logout}
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
            </div>
            {userToken && userRole === "admin" && (
                <div className='flex h-[calc(100vh-70px)]'>
                    <div>
                        <Sidebar />
                    </div>
                    <Outlet />
                </div>
            )}

            {userToken && userRole === "author" && (
                <div className='flex h-[calc(100vh-70px)]'>
                    <div>
                        <AuthorSidebar />
                    </div>
                    <Outlet />
                </div>
            )}

        </>
    );
};

export default Layout;
