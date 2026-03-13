import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaUserCircle, FaGem, FaArrowRight } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, userData, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-xl transition-all duration-300 font-bold ${isActive ? 'bg-primary text-white shadow-lg' : 'hover:bg-base-200'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/lessons"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-xl transition-all duration-300 font-bold ${isActive ? 'bg-primary text-white shadow-lg' : 'hover:bg-base-200'}`
                    }
                >
                    Lessons
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-xl transition-all duration-300 font-bold ${isActive ? 'bg-primary text-white shadow-lg' : 'hover:bg-base-200'}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-[60] w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <div className="dropdown lg:hidden">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <HiMenuAlt2 className="h-6 w-6" />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-premium bg-base-100 rounded-2xl w-64 border border-base-200">
                                {navLinks}
                            </ul>
                        </div>

                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                                L
                            </div>
                            <span className="text-xl font-bold tracking-tight text-base-content hidden sm:block">
                                Life<span className="text-primary">Lesson</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex">
                        <ul className="flex items-center gap-2">
                            {navLinks}
                        </ul>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {userData?.isPremium && (
                            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 shadow-sm animate-pulse">
                                <FaGem size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Premium</span>
                            </div>
                        )}

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/20 ring-2 ring-primary/5">
                                    <div className="w-10 rounded-full">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="User" />
                                        ) : (
                                            <FaUserCircle className="w-full h-full text-base-content/20" />
                                        )}
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-4 shadow-premium bg-base-100 rounded-2xl w-64 border border-base-200 gap-2">
                                    <div className="flex flex-col mb-2 pb-2 border-b border-base-200">
                                        <p className="text-sm font-bold truncate">{user.displayName || 'Wise User'}</p>
                                        <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                                    </div>
                                    <li><Link to="/dashboard" className="px-4 py-2 hover:bg-base-200 rounded-lg flex items-center justify-between group">Dashboard <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                    <li><Link to="/dashboard/profile" className="px-4 py-2 hover:bg-base-200 rounded-lg flex items-center justify-between group">Profile <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                                    {userData?.role === 'admin' && (
                                        <li><Link to="/dashboard" className="px-4 py-2 hover:bg-primary/10 text-primary font-bold rounded-lg truncate">Admin Panel</Link></li>
                                    )}
                                    <div className="divider my-1"></div>
                                    <li><button onClick={handleLogout} className="w-full text-left px-4 py-2 text-error hover:bg-error/10 rounded-lg font-bold">Sign Out</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="btn btn-ghost btn-sm hidden sm:flex transition-all duration-300 rounded-lg hover:shadow-lg">
                                    Log in
                                </Link>
                                <Link to="/register" className="btn btn-primary btn-sm transition-all duration-300 rounded-lg hover:shadow-lg text-white font-semibold">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
