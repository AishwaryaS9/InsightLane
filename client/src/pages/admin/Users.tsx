import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/userApi';
import UserCard from '../../components/admin/UserCard';
import { useAppSelector } from '../../redux/store/hooks';
import { assets } from '../../assets/assets';

const Users = () => {
    const userToken = useAppSelector((state) => state.login.token);

    const [userData, setUserData] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const getUserData = async () => {
        try {
            const data = await getAllUsers(userToken);
            if (data) {
                setUserData(data.data);
                setUserInfo(data.data.users);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [userToken]);

    return (
        <div className="w-full min-h-screen bg-blue-50/50 p-6 flex flex-col">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                    { label: "Total Users", value: userData.totalUsers, icon: assets.users },
                    { label: "Admin", value: userData.totalAdmins, icon: assets.admin },
                    { label: "Authors", value: userData.totalAuthors, icon: assets.author },
                    { label: "Readers", value: userData.totalReaders, icon: assets.reader },
                ].map(({ label, value, icon }, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <img src={icon} alt={label} className="w-8 h-8" />
                        <div>
                            <p className="text-2xl font-semibold text-gray-700">{value}</p>
                            <p className="text-gray-500 text-sm">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* User List Section */}
            <div className="p-6 w-full max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold text-gray-700 mb-4">All Users</h1>
                {userInfo.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        No users found. Please check back later.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {userInfo.map((user) => (
                            <UserCard key={user?._id} userInfo={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
