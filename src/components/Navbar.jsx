import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { LogOut, FileText, LayoutDashboard, User } from 'lucide-react';
import resym from "../assets/images/resym.png"

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2">
                <div className="rounded-lg">
                    <img src={resym} alt="Resym Logo" className="text-white w-12 h-12" />
                </div>
                <span className="text-xl font-bold text-[#98d000] tracking-tight">ALTA<span className="text-[#0000b9]">Report</span></span>
            </Link>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to={user.role === 'DEPT_HEAD' ? '/admin-dashboard' : '/dashboard'} className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium">
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 leading-none">{user.full_name}</p>
                                <p className="text-xs text-gray-500 uppercase mt-1">{user.role.replace('_', ' ')}</p>
                            </div>
                            <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="text-gray-600 font-medium hover:text-[#0000b9]">Login</Link>
                        <Link to="/register" className="bg-[#0000b9] text-white px-4 py-1.5 rounded-md hover:bg-[#98d000] transition font-medium">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;