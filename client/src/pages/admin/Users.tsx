import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/userApi';
import UserCard from '../../components/admin/UserCard'
import { useAppSelector } from '../../redux/store/hooks';

const Users = () => {
    const userToken = useAppSelector((state) => state.login.token);

    const [userData, setUserData] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const getUserData = async () => {
        try {
            const data = await getAllUsers(userToken);
            if (data) {
                setUserData(data)
                setUserInfo(data.data.users)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserData();
    }, [userToken])

    return (
        <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <h1>All Users</h1>

            <div className="flex flex-wrap items-center justify-center gap-6">
                {userInfo.map((user) => (
                    <UserCard key={user?._id} userInfo={user} />
                ))}
            </div>

        </div>
    )
}

export default Users