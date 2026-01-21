import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // UI States
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState(''); // For Reset logic

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // 1. Standard Login Logic
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/auth/login`, { email, password });
            const { token, role, name } = res.data;

            localStorage.setItem('token', token);
            login({ full_name: name, role: role }, token);

            // Navigate based on your DB roles (DEPT_HEAD or EMPLOYEE)
            navigate(role === 'DEPT_HEAD' ? '/admin-dashboard' : '/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    // 2. Forgot Password Logic (Public)
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Using fetch trend as requested
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
            console.error(err);
            alert("Reset failed. Try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    {isForgotMode ? "Reset Password" : "ALTA Report System"}
                </h2>

                <form onSubmit={isForgotMode ? handleResetPassword : handleLogin}>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
                    <input 
                        type="email" placeholder="email@altacomputec.com" className="w-full mb-4 p-2 border rounded"
                        onChange={(e) => setEmail(e.target.value)} required
                    />

                    {!isForgotMode ? (
                        <>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
                            <input 
                                type="password" placeholder="••••••••" className="w-full mb-2 p-2 border rounded"
                                onChange={(e) => setPassword(e.target.value)} required
                            />
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
                            <input 
                                type="password" placeholder="Enter new password" className="w-full mb-6 p-2 border rounded"
                                onChange={(e) => setNewPassword(e.target.value)} required
                            />
                        </>
                    )}

                    <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition">
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