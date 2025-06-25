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
        <div className="w-full min-h-screen bg-blue-50/50 p-6 flex flex-col px-5 sm:pt-12 sm:pl-16 ">

            <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.users} alt="" className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{userData.totalUsers}</p>
                        <p className='text-gray-400 font-light'>Total Users</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.admin} alt="" className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{userData.totalAdmins}</p>
                        <p className='text-gray-400 font-light'>Admin</p>
                    </div>
                </div>


                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.author} alt="" className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{userData.totalAuthors}</p>
                        <p className='text-gray-400 font-light'>Authors</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.reader} alt="" className='w-6 h-6' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{userData.totalReaders}</p>
                        <p className='text-gray-400 font-light'>Readers</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl w-full my-4">
                <h1>
                    All Users
                </h1>

                {userInfo.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        No users found. Please check back later.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
