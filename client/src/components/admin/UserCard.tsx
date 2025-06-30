import { useState } from 'react';
import { assets } from '../../assets/assets'
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertModal from '../AlertModal';
import { deleteUserApi } from '../../api/userApi';
import { useAppSelector } from '../../redux/store/hooks';
import toast from 'react-hot-toast';
import type { User } from '../../utils/interface';

const roleColors: Record<string, string> = {
    admin: 'bg-purple-500',
    reader: 'bg-blue-500',
    author: 'bg-green-500',
};

const UserCard: React.FC<{ userInfo: User, onUserDeleted: (userId: string) => void }> = ({ userInfo, onUserDeleted }) => {

    const [showModal, setShowModal] = useState(false);

    const userToken = useAppSelector((state) => state.login.token);

    const roleColor = roleColors[userInfo.role?.toLowerCase()] || 'bg-primary';
    const formattedDate = new Date(userInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        deleteUser();
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const deleteUser = async () => {
        try {
            const data = await deleteUserApi(userToken, userInfo._id)
            if (data) {
                toast.success(data.message)
                onUserDeleted(userInfo._id);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message)
        }
    }


    return (
        <div className='user-card p-2'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userInfo.profilePicture || assets.defaultAvatar}
                        alt={`Avatar`}
                        className='w-12 h-12 rounded-full border-2 border-white'
                    />
                    <div className="space-y-2">
                        <p className="text-sm font-medium dark:text-gray-100">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Member Since: {formattedDate}</p>
                        <div className="flex items-center justify-between mt-2 gap-3">
                            <span className={`inline-block px-3 py-1 text-[10px] text-white rounded-md capitalize ${roleColor}`}>
                                {userInfo.role || ''}
                            </span>
                            {userInfo.role !== "admin" && (
                                <button
                                    onClick={handleDeleteClick}
                                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 shadow hover:shadow-md transition-all cursor-pointer"
                                    aria-label="Delete User"
                                >
                                    <RiDeleteBin6Line className="w-4 h-4" />
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <AlertModal
                    message="Are you sure you want to delete this user?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}

export default UserCard

