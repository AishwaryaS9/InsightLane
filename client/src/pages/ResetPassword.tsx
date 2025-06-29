import { useNavigate, useParams } from 'react-router-dom'
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
    if (!resetToken) return;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const data = await resetPassword(resetToken, newPassword);

      if (data) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
    <div className=" w-full h-full">
      <div className="absolute top-6 left-6">
        <img
          src={assets.logo}
          alt="logo"
          className="h-9 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary my-20">
        <div className="mt-10">
          <div className=" text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded">
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Reset Password</h2>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input id="newPassword" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="password"
                placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div className='mt-4'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="password"
                placeholder="Enter your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="button" className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white" onClick={handleResetPassword}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword