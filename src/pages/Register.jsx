import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE', // Default value matching your role_enum
        division: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Check your inputs.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-700">Create Account</h2>
                    <p className="text-gray-500 mt-2">ALTA Reporting System</p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            name="full_name" type="text" placeholder="Abel Mulubrihan"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange} required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            name="email" type="email" placeholder="abel@altacomputec.com"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange} required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Division / Department</label>
                        <input 
                            name="division" type="text" placeholder="ICT Solution Center"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange} required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">System Role</label>
                            <select 
                                name="role" 
                                className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg bg-white outline-none"
                                onChange={handleChange}
                            >
                                <option value="EMPLOYEE">Employee</option>
                                <option value="DEPT_HEAD">Dept. Head</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                name="password" type="password" placeholder="••••••••"
                                className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;