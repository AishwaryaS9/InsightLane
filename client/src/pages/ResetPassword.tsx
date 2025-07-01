import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { resetPassword } from '../api/userApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetToken } = useParams();

  const handleResetPassword = async () => {
    if (!resetToken) {
      toast.error('Invalid or missing reset token.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const data = await resetPassword(resetToken, newPassword);
      if (data) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="w-full h-full ">
      <div className="absolute top-6 left-6">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-9 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary my-20">
        <div className="mt-10 w-full max-w-lg">
          <div className="text-gray-700 p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-medium mb-3 text-center text-gray-900">
              Reset Password
            </h2>
            <p className="text-sm text-gray-500/90 text-center mb-6">
              Create a new password to secure your account.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
              className="space-y-4"
            >
              <div className='space-y-2'>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-normal text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none transition"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  aria-label="New Password"
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-normal text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-label="Confirm Password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                Save Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
