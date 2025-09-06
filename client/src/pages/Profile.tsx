import { useState } from "react";
import { useAppSelector } from "../redux/store/hooks";
import { assets } from "../assets/assets";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const userProfileData = useAppSelector((state) => state.userProfile.data) || {};

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

    return (
        <main className="w-full min-h-screen bg-blue-50/50 py-12 px-6 sm:px-16" aria-label="User Profile Page">
            <section className='bg-white w-full max-w-3xl mx-auto p-6 shadow-lg rounded-lg'
                aria-labelledby="profile-heading">
                <div className="relative z-10 bg-white p-6 h-auto w-full rounded-[10px] flex flex-col items-center justify-start text-center">
                    <img
                        src={userProfileData.profilePicture || assets.defaultAvatar}
                        alt={`${userProfileData?.name || "User"} profile avatar`}
                        className="w-24 h-24 rounded-full shadow-md my-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {userProfileData?.name || ""}
                    </h2>
                    <p className="text-sm text-secondary font-normal mb-4">
                        {userProfileData?.email || ""}
                    </p>
                    <p className="text-sm text-primary font-medium mb-4 capitalize">
                        {userProfileData?.role || "Reader"}
                    </p>
                    <p className="text-sm text-gray-500 mb-6 px-4 text-wrap text-justify leading-6">
                        {userProfileData?.bio || ""}
                    </p>

                    <nav className="flex space-x-4 mb-4 text-xl" aria-label="User social links">
                        <a
                            href={userProfileData?.socialLinks?.facebook || "http://facebook.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:-translate-y-0.5 transition"
                            aria-label="Facebook Profile"
                        >
                            <img src={assets.facebook} className="w-6 h-6" alt="Facebook" />
                        </a>
                        <a
                            href={userProfileData?.socialLinks?.twitter || "http://x.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:-translate-y-0.5 transition"
                            aria-label="Twitter Profile"
                        >
                            <img src={assets.twitter} className="w-6 h-6" alt="Twitter" />
                        </a>
                        <a
                            href={userProfileData?.socialLinks?.linkedin || "http://linkedin.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:-translate-y-0.5 transition"
                            aria-label="LinkedIn Profile"
                        >
                            <img src={assets.linkedin} className="w-6 h-6" alt="LinkedIn" />
                        </a>
                    </nav>
                    <div className="space-x-4">
                        <button
                            onClick={handleEditProfile}
                            className="mt-4 px-6 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/75 shadow transition-all "
                            aria-label="Edit Profile"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleChangePassword}
                            aria-label="Change Password"
                            className="mt-4 px-6 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/75 shadow transition-all "
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </section>

            {isEditModalOpen && (
                <EditProfileModal data={userProfileData} isOpen={isEditModalOpen} onViewClose={closeModal} />
            )}
            {isPasswordModalOpen && (
                <ChangePasswordModal isOpen={isPasswordModalOpen} onViewClose={closePasswordModal} />
            )}
        </main>
    );
};

export default Profile;