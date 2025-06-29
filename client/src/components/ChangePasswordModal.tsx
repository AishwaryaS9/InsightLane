import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5'
import { changePassword } from '../api/userApi';
import { useAppSelector } from '../redux/store/hooks';

const ChangePasswordModal: React.FC<{
    isOpen: boolean;
    onViewClose: () => void;
}> = ({ isOpen, onViewClose }) => {
    const userToken = useAppSelector((state) => state.login.token);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await changePassword(oldPassword, newPassword, userToken);
            if (response) {
                toast.success(response.message);
                onViewClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onViewClose}>
            <div
                className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl h-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 md:p-5">
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    <button
                        type="button"
                        onClick={onViewClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2">


                    <div>
                        <label htmlFor="oldPassword">Old Password</label>
                        <input id="oldPassword" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="password"
                            placeholder="Enter your old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input id="newPassword" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="password"
                            placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="password"
                            placeholder="Enter your confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="p-4 md:p-5 flex justify-end">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onViewClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`add-btn ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordModal