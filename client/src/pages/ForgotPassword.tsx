import { useState } from 'react';
import { forgotPassword } from '../api/userApi';
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const data = await forgotPassword(email)
      if (data) {
        toast.success(data.message)

      } else {
        toast.error(data.message)
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
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Forgot Password?</h2>
            <label htmlFor="email">Email</label>
            <input id="email" className="w-full border mt-1 border-gray-500/30 focus:border-primary outline-none rounded py-2.5 px-4" type="email"
              placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white" onClick={handleForgotPassword}>Send Email</button>
            <p className="text-center mt-4">Don’t have an account? <span className="text-primary underline cursor-pointer" onClick={() => navigate('/register')}>Signup Now</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
