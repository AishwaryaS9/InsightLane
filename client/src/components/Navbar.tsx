import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { clearLogin } from "../redux/store/slice/loginSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { clearUserProfileDetails } from "../redux/store/slice/userProfileSlice";


const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const navigate = useNavigate();

    const userToken = useAppSelector((state) => state.login.token);
    const userRole = useAppSelector((state) => state.login.role);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogin = () => {
        if (!userToken) {
            navigate('/login')
        } else {
            dispatch(clearLogin())
            dispatch(clearUserProfileDetails())
            navigate('/')
        }
    }

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 
        xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
                <img
                    src={assets.logo}
                    alt="logo"
                    className={`h-9 ${isScrolled ? "text-primary" : ""}`}
                />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a
                        key={i}
                        href={link.path}
                        className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-primary"
                            }`}
                    >
                        {link.name}
                        <div
                            className={`${isScrolled ? "bg-gray-700" : "bg-white"
                                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                        />
                    </a>
                ))}
                {userToken && userRole === "admin" && (
                    <button onClick={() => navigate('/admin')}
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? "text-black" : "text-primary"
                            } transition-all`}
                    >
                        Dashboard
                    </button>
                )}

                {userToken && userRole === "author" && (
                    <button onClick={() => navigate('/author')}
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? "text-black" : "text-primary"
                            } transition-all`}
                    >
                        Dashboard
                    </button>
                )}

            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <button onClick={handleLogin} className="bg-primary text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer">
                    {userToken ? 'Logout' : 'Login'}
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <svg
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}

                {userToken && userRole === "admin" && (
                    <button onClick={() => navigate('/admin')}
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">

                        Dashboard
                    </button>
                )}

                {userToken && userRole === "author" && (
                    <button onClick={() => navigate('/author')}
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        Dashboard
                    </button>
                )}
                <button onClick={handleLogin} className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer">
                    {userToken ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
