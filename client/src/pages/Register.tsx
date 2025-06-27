
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { registerUser } from '../api/userApi';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('reader');
    const [token, setToken] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await registerUser(name, email, password, role)
            if (data) {
                setToken(data.token)
                toast.success("Registered successfully!")
                navigate('/login')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <div className="relative w-full h-full">
            <div className="absolute top-6 left-6">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-9 cursor-pointer"
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="flex flex-col-reverse md:flex-row h-screen w-full">
                <div className="w-full md:w-1/2 hidden md:block">
                    <img className="h-full w-full object-cover" src={assets.blogAuth} alt="leftSideImage" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-8 md:px-0">
                    <form onSubmit={handleSubmit} className="md:w-96 w-full flex flex-col items-center justify-center">
                        <h2 className="text-3xl md:text-4xl text-gray-900 font-medium text-center">Sign Up</h2>
                        <p className="text-sm text-gray-500/90 mt-3 text-center">Please sign up to continue</p>
                        <button
                            type="button"
                            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
                        >
                            <img src={assets.googleLogo} alt="googleLogo" />
                        </button>
                        <div className="flex items-center gap-4 w-full my-5">
                            <div className="w-full h-px bg-gray-300/90" />
                            <p className="w-full text-nowrap text-sm text-gray-500/90 text-center">or sign up with email</p>
                            <div className="w-full h-px bg-gray-300/90" />
                        </div>
                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6.75A3.75 3.75 0 1112 3a3.75 3.75 0 013.75 3.75zM12 14.25a7.5 7.5 0 00-7.5 7.5h15a7.5 7.5 0 00-7.5-7.5z"
                                />
                            </svg>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg
                                width={16}
                                height={11}
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email id"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg
                                width={13}
                                height={17}
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm"
                            >
                                <option value="" disabled>
                                    Select Role
                                </option>
                                <option value="reader">Reader</option>
                                <option value="author">Author</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Register
                        </button>
                        <p className="text-gray-500/90 text-sm mt-4 text-center">
                            Already have an account?{' '}
                            <a
                                className="text-primary hover:underline"
                                href="#"
                                onClick={() => navigate('/login')}
                            >
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
