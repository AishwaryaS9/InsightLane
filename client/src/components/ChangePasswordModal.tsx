import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5'
import { changePassword } from '../api/userApi';
import { useAppSelector } from '../redux/store/hooks';
import { validatePassword } from '../utils/regex';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';

const ChangePasswordModal: React.FC<{
    isOpen: boolean;
    onViewClose: () => void;
}> = ({ isOpen, onViewClose }) => {
    const userToken = useAppSelector((state) => state.login.token);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (!validatePassword(newPassword)) {
            toast.error("Password must contain atleast six characters");
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
            onClick={onViewClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            aria-describedby="change-password-description">
            <div
                className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl h-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 md:p-5">
                    <h3 className="text-lg font-medium text-gray-900" id="change-password-title">Change Password</h3>
                    <button
                        type="button"
                        onClick={onViewClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        aria-label="Close change password modal"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2" aria-describedby="change-password-description">
                    <p
                        id="change-password-description"
                        className="sr-only"
                    >
                        Enter your old password and a new password to update your account
                        credentials.
                    </p>
                    <div className="relative w-full">
                        <label htmlFor="oldPassword">Old Password</label>
                        <div className="relative w-full">
                            <input
                                id="oldPassword" name="oldPassword"
                                className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4 pr-10"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter your old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <button aria-label={showOldPassword ? "Hide old password" : "Show old password"}
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500/80"
                            >
                                {showOldPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="relative w-full">
                            <input id="newPassword" name="newPassword"
                                className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4 pr-10"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500/80"
                                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                            >
                                {showNewPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative w-full">
                            <input id="confirmPassword" name="confirmPassword"
                                className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4 pr-10"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter your confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500/80"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >
                                {showConfirmPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
                            </button>
                        </div>
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