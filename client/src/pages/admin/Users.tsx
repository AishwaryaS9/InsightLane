import { useEffect, useState } from 'react';
import UserCard from '../../components/admin/UserCard';
import { useAppSelector } from '../../redux/store/hooks';
import { assets } from '../../assets/assets';
import { getUserProfile } from '../../api/userApi';
import type { UserData, User } from '../../utils/interface';
import Pagination from '../../components/Pagination';
import toast from 'react-hot-toast';

const Users = () => {
    const userToken = useAppSelector((state) => state.login.token);

    const [userData, setUserData] = useState<UserData | null>(null);
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const getUserData = async () => {
        try {
            const data = await getUserProfile(page, 8, search, userToken);
            if (data) {
                setUserData(data);
                setUserInfo(data.users);
                setTotalPages(data.totalPages || 1)
                setSearch(search);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error((error as Error).message);
        }
    };

    useEffect(() => {
        getUserData();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleUserDeleted = (deletedUserId: string) => {
        setUserInfo((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
    };


    return (
        <div className="w-full min-h-screen bg-blue-50/50 p-4 sm:p-6 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                {userData ? (
                    [
                        { label: "Total Users", value: userData?.totalUsers, icon: assets.users },
                        { label: "Admin", value: userData?.totalAdmins, icon: assets.admin },
                        { label: "Authors", value: userData?.totalAuthors, icon: assets.author },
                        { label: "Readers", value: userData?.totalReaders, icon: assets.reader },
                    ].map(({ label, value, icon }, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            <img src={icon} alt={label} className="w-6 h-6 sm:w-8 sm:h-8" />
                            <div>
                                <p className="text-xl sm:text-2xl font-semibold text-gray-700">{value}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">All Users</h1>
                {userInfo.length === 0 ? (
                    <p className="text-center text-gray-600 text-base sm:text-lg">
                        No users found. Please check back later.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {userInfo.map((user) => (
                            <UserCard key={user?._id} userInfo={user} onUserDeleted={handleUserDeleted} />
                        ))}
                    </div>
                )}
            </div>

            <div className="my-10">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Users;
