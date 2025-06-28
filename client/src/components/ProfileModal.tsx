import { IoCloseOutline } from 'react-icons/io5'
import { assets } from '../assets/assets'
import EditProfileModal from './EditProfileModal'
import ChangePasswordModal from './ChangePasswordModal'
import { useState } from 'react'

const ProfileModal = ({ userData, isProfileOpen, onProfileClose }) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    const handleChangePassword = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    if (!isProfileOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onProfileClose}>

            <div
                className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 md:p-5">
                    <h3 className="text-lg font-medium text-gray-900">View Profile</h3>
                    <button
                        type="button"
                        onClick={onProfileClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 72px)' }}>
                    <div className="bg-white p-6 h-auto w-full rounded-[10px] flex flex-col items-center justify-start text-center">
                        <img
                            src={userData.profilePicture || assets.defaultAvatar}
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full shadow-md my-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {userData?.name || ""}
                        </h2>
                        <p className="text-sm text-secondary font-normal mb-4">
                            {userData?.email || ""}
                        </p>
                        <p className="text-sm text-primary font-medium mb-4 capitalize">
                            {userData?.role || "Reader"}
                        </p>
                        <p className="text-sm text-gray-500 mb-6 px-4 text-wrap text-justify leading-6">
                            {userData?.bio || ""}
                        </p>
                        <div className="flex space-x-4 mb-4 text-xl">
                            <a
                                href={userData.facebook || "http://facebook.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.facebook} className="w-6 h-6" alt="Facebook" />
                            </a>
                            <a
                                href={userData.twitter || "http://x.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.twitter} className="w-6 h-6" alt="Twitter" />
                            </a>
                            <a
                                href={userData.linkedin || "http://linkedin.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.linkedin} className="w-6 h-6" alt="LinkedIn" />
                            </a>
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={handleEditProfile}
                                className="mt-4 px-6 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/75 shadow transition-all sm:justify-center"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="mt-4 px-6 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/75 shadow transition-all sm:justify-center"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditProfileModal data={userData} isOpen={isEditModalOpen} onViewClose={closeModal} />
            )}
            {isPasswordModalOpen && (
                <ChangePasswordModal isOpen={isPasswordModalOpen} onViewClose={closePasswordModal} />
            )}
        </div>
    )
}

export default ProfileModal