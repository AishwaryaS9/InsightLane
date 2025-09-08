import { useState } from 'react';
import { assets } from '../../assets/assets'
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertModal from '../AlertModal';
import { deleteUserApi } from '../../api/userApi';
import { useAppSelector } from '../../redux/store/hooks';
import toast from 'react-hot-toast';
import type { User } from '../../utils/interface';
import { analytics, logEvent } from "../../config/firebase";

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

    const trackUserAction = (action: string) => {
        if (analytics) {
            logEvent(analytics, "user_action", {
                action,
                userId: userInfo._id,
                userRole: userInfo.role,
            });
        }
    };

    const handleDeleteClick = () => {
        setShowModal(true);
        trackUserAction("delete_click");
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        trackUserAction("delete_confirmed");
        deleteUser();
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        trackUserAction("delete_canceled");
    };

    const deleteUser = async () => {
        try {
            const data = await deleteUserApi(userToken, userInfo._id)
            if (data) {
                toast.success(data.message);
                onUserDeleted(userInfo._id);
                trackUserAction("delete_success");
            } else {
                toast.error(data.message);
                trackUserAction("delete_failed");
            }
        } catch (error) {
            toast.error((error as Error).message);
            trackUserAction("delete_error");
        }
    }

    return (
        <div className='user-card p-2' aria-live="polite">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userInfo.profilePicture || assets.defaultAvatar}
                        alt={`Avatar of ${userInfo.name}`}
                        className='w-12 h-12 rounded-full border-2 border-white'
                    />
                    <div className="space-y-2">
                        <p className="text-sm font-medium dark:text-gray-100">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Member Since:{''}
                            <time dateTime={new Date(userInfo.createdAt).toISOString()}>
                                {formattedDate}
                            </time>
                        </p>
                        <div className="flex items-center justify-between mt-2 gap-3">
                            <span className={`inline-block px-3 py-1 text-[10px] text-white rounded-md capitalize ${roleColor}`}
                                aria-label={`User role: ${userInfo.role}`}>
                                {userInfo.role || ''}
                            </span>
                            {userInfo.role !== "admin" && (
                                <button
                                    onClick={handleDeleteClick}
                                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 shadow hover:shadow-md transition-all cursor-pointer"
                                    aria-label="Delete user"
                                >
                                    <RiDeleteBin6Line className="w-4 h-4" aria-hidden="true" />
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

