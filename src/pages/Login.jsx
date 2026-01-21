import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

const Login = () => {
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/auth/login`, { email, password });
            const { token, role, name } = res.data;
            localStorage.setItem('token', token);
            login({ full_name: name, role: role }, token);
            navigate(role === 'DEPT_HEAD' ? '/admin-dashboard' : '/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                alert("Password reset successfully! Please login with your new password.");
                setIsForgotMode(false);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Reset failed. Try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#0000b9]">
                    {isForgotMode ? "Reset Password" : "ALTA Report System"}
                </h2>

                <form onSubmit={isForgotMode ? handleResetPassword : handleLogin}>
                    <label className="block text-sm font-semibold text-[#98d000] mb-1">Email Address</label>
                    <input 
                        type="email" placeholder="email@altacomputec.com" className="w-full mb-4 p-2 border rounded outline-none focus:border-[#0000b9]"
                        onChange={(e) => setEmail(e.target.value)} required
                    />

                    {!isForgotMode ? (
                        <>
                            <label className="block text-sm font-semibold text-[#98d000] mb-1">Password</label>
                            <div className="relative mb-2">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="w-full p-2 border rounded outline-none focus:border-[#0000b9]"
                                    onChange={(e) => setPassword(e.target.value)} required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-[#0000b9]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="text-right mb-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsForgotMode(true)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">New Password</label>
                            <div className="relative mb-6">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter new password" 
                                    className="w-full p-2 border rounded outline-none focus:border-[#0000b9]"
                                    onChange={(e) => setNewPassword(e.target.value)} required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </>
                    )}

                    <button className="w-full bg-[#98d000] text-white p-2 rounded font-bold hover:bg-[#8bc000] transition">
                        {isForgotMode ? "Update Password" : "Login"}
                    </button>

                    {isForgotMode && (
                        <button 
                            type="button" 
                            onClick={() => setIsForgotMode(false)}
                            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
                        >
                            Back to Login
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;