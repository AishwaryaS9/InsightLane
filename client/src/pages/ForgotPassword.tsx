import { useState } from 'react';
import { forgotPassword } from '../api/userApi';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const data = await forgotPassword(email);
      if (data) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error('Failed to send reset email.');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <main className="w-full h-full">
      <div className="absolute top-6 left-6">
        <img
          src={assets.logo}
          alt="InsightLane Logo"
          className="h-9 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <section aria-labelledby="forgot-password-title" className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary my-20">
        <div className="mt-10 w-full max-w-lg">
          <div className="text-gray-700 p-6 md:p-8">
            <h2 id="forgot-password-title" className="text-3xl md:text-4xl font-medium mb-3 text-center text-gray-900">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-500/90 text-center mb-6">
              Reset your password to regain access.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleForgotPassword();
              }}
              className="space-y-4"
              aria-describedby="forgot-password-instructions"
            >
              <label htmlFor="email" className="block text-sm font-normal text-gray-700">
                Email
              </label>
              <input
                id="email" name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none transition"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                aria-label="Email Address"
                aria-describedby="forgot-password-instructions"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                Send Email
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{' '}
              <span
                className="text-primary underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                onClick={() => navigate('/register')}
              >
                Sign Up Now
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
