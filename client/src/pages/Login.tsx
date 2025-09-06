import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import { loginUser } from '../api/userApi';
import toast from 'react-hot-toast';
import { authTokenDetails, userLogin } from '../redux/store/slice/loginSlice';
import { useAppDispatch } from '../redux/store/hooks';
import { validateEmail } from '../utils/regex';
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const data = await loginUser(email, password);
            if (!data || !data.token) {
                toast.error(data?.message || "Login failed. Please try again.");
                return;
            }
            if (data) {
                setToken(data.token);
                dispatch(userLogin({ token: data.token, userId: data.id, role: data.role }));
                dispatch(authTokenDetails({ authToken: token }))
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                toast.success('Logged in successfully!');
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <main className="relative w-full h-full" aria-label="Login Page">
            <header className="absolute top-6 left-6">
                <img
                    src={assets.logo}
                    alt="Website Logo"
                    className="h-9 cursor-pointer"
                    onClick={() => navigate('/')}
                />
            </header>

            <section className="flex flex-col-reverse md:flex-row h-screen w-full">
                <div className="w-full md:w-1/2 hidden md:block">
                    <img className="h-full w-full object-cover" src={assets.blogAuth}
                        alt="Illustration showing blog authentication" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-8 md:px-0 py-25">
                    <form onSubmit={handleSubmit} aria-labelledby="login-heading" className="md:w-96 w-full flex flex-col items-center justify-center">
                        <h2 id="login-heading" className="text-3xl md:text-4xl text-gray-900 font-medium text-center">Sign in</h2>
                        <p className="text-sm text-gray-500/90 mt-3 text-center">Welcome back! Please sign in to continue</p>
                        <div className="flex items-center gap-4 w-full my-5">
                        </div>

                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
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
                            <input id="email" aria-label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />
                        </div>
                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
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
                            <input id="password" aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />
                            <button
                                type="button" aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(!showPassword)}
                                className="pr-4 text-gray-500/80"
                            >
                                {showPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
                            </button>
                        </div>

                        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                            <div className="flex items-center gap-2">
                                <input
                                    className="h-5"
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label className="text-sm" htmlFor="checkbox">Remember me</label>
                            </div>
                            <a className="text-sm underline" href="/forgot-password" aria-label="Forgot Password">Forgot password?</a>
                        </div>
                        <button
                            type="submit" aria-label="Login"
                            className="mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Login
                        </button>
                        <p className="text-gray-500/90 text-sm mt-4 text-center">
                            Don't have an account?{' '}
                            <button
                                className="text-primary hover:underline"
                                onClick={() => navigate('/register')}
                                aria-label="Navigate to Sign Up"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;

