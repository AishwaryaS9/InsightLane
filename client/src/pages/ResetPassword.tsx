import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useEffect, useState } from 'react';
import { resetPassword } from '../api/userApi';
import toast from 'react-hot-toast';
import { analytics, logEvent } from "../config/firebase";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetToken } = useParams();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view_reset_password", {
        page_path: "/resetPassword",
        page_title: "Reset Password",
      });
    }
  }, []);

  const handleResetPassword = async () => {
    if (!resetToken) {
      toast.error('Invalid or missing reset token.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      if (analytics) {
        logEvent(analytics, "reset_password_mismatch", {
          reason: "Password confirmation failed",
        });
      }
      return;
    }

    try {
      const data = await resetPassword(resetToken, newPassword);
      if (data) {
        toast.success(data.message);
        if (analytics) {
          logEvent(analytics, "reset_password_success", {
            resetTokenProvided: true,
          });
        }
        navigate('/login');
      } else {
        toast.error('Failed to reset password. Please try again.');
        if (analytics) {
          logEvent(analytics, "reset_password_failed", {
            resetTokenProvided: true,
          });
        }
      }
    } catch (error) {
      toast.error((error as Error).message);
      if (analytics) {
        logEvent(analytics, "reset_password_error", {
          message: (error as Error).message,
        });
      }
    }
  };

  return (
    <main className="w-full h-full ">
      <div className="absolute top-6 left-6">
        <img
          src={assets.logo}
          alt="InsightLane Logo - Go to homepage"
          className="h-9 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <section className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary my-20" aria-labelledby="reset-password-heading">
        <div className="mt-10 w-full max-w-lg">
          <div className="text-gray-700 p-6 md:p-8">
            <h2 id="reset-password-heading" className="text-3xl md:text-4xl font-medium mb-3 text-center text-gray-900">
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
              className="space-y-4" aria-describedby="reset-password-instructions"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary transition"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="New Password"
                />
                <p id="reset-password-instructions" className="sr-only">
                  Password must be at least 8 characters long and contain letters and numbers.
                </p>
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none  focus:ring-1 focus:ring-primary transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Confirm Password"
                />
              </div>

              <button
                type="submit" aria-label="Save new password"
                className="w-full bg-primary text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                Save Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
