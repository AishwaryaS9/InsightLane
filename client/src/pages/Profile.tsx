import { useState } from "react";
import { useAppSelector } from "../redux/store/hooks";
import { assets } from "../assets/assets";
import EditProfileModal from "../components/EditProfileModal";

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const userProfileData = useAppSelector((state) => state.userProfile.data);

    const handleEditProfile = () => {
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <>

            <div className="w-full min-h-screen bg-blue-50/50 py-12 px-6 sm:px-16">
                {/* <div className="relative w-full max-w-md min-h-[30rem] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg mx-auto"> */}
                <div className='bg-white w-full max-w-3xl mx-auto p-6 shadow-lg rounded-lg'>
                    <div className="relative z-10 bg-white p-6 h-auto w-full rounded-[10px] flex flex-col items-center justify-start text-center">
                        <img
                            src={userProfileData.profilePicture || assets.defaultAvatar}
                            alt="Profile Avatar"
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
                        <div className="flex space-x-4 mb-4 text-xl">
                            <a
                                href={userProfileData.facebook || "http://facebook.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.facebook} className="w-6 h-6" alt="Facebook" />
                            </a>
                            <a
                                href={userProfileData.twitter || "http://x.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.twitter} className="w-6 h-6" alt="Twitter" />
                            </a>
                            <a
                                href={userProfileData.linkedin || "http://linkedin.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:-translate-y-0.5 transition"
                            >
                                <img src={assets.linkedin} className="w-6 h-6" alt="LinkedIn" />
                            </a>
                        </div>
                        <button
                            onClick={handleEditProfile}
                            className="mt-4 px-6 py-2 cursor-pointer bg-primary text-white rounded-lg hover:bg-primary/75 shadow transition-all "
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <EditProfileModal data={userProfileData} isOpen={isEditModalOpen} onViewClose={closeModal} />
            )}
        </>
    );
};

export default Profile;

