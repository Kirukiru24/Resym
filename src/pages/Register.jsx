import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE',
        division: '',
        position: ''
    });
    
    const [showPassword, setShowPassword] = useState(false); // Toggle state
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(`${baseUrl}/auth/register`, formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-[#0000b9]">Create Account</h2>
                    <p className="text-gray-500 mt-2">ALTA Reporting System</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            name="full_name" type="text" placeholder="Abel Mulubrihan"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000b9] outline-none"
                            onChange={handleChange} required 
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            name="email" type="email" placeholder="abel@altacomputec.com"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000b9] outline-none"
                            onChange={handleChange} required 
                        />
                    </div>

                    {/* Division and Position */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Division</label>
                            <input 
                                name="division" type="text" placeholder="ICT Center"
                                className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000b9] outline-none"
                                onChange={handleChange} required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Position</label>
                            <input 
                                name="position" type="text" placeholder="Software Engineer"
                                className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000b9] outline-none"
                                onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    {/* Role and Password */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">System Role</label>
                            <select 
                                name="role" 
                                className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg bg-white outline-none"
                                onChange={handleChange}
                                value={formData.role}
                            >
                                <option value="EMPLOYEE">Employee</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input 
                                    name="password" 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000b9] outline-none"
                                    onChange={handleChange} required 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-[#0000b9]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-[#98d000] text-white font-bold py-3 rounded-lg hover:bg-[#0000b9] transition duration-300 mt-4 shadow-md"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-[#0000b9] font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;