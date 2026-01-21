import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [notifications, setNotifications] = useState([]);
    
    // Use the environment variable and token
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Style: Manual headers with Bearer token
                const headers = { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // 1. Fetch My Reports
                const reportsRes = await fetch(`${API_BASE_URL}/reports/my-reports`, { headers });
                const reportsData = await reportsRes.json();
                if (reportsRes.ok) setReports(reportsData);

                // 2. Fetch My Notifications (Warnings)
                const noteRes = await fetch(`${API_BASE_URL}/notifications/my-notifications`, { headers });
                const noteData = await noteRes.json();
                if (noteRes.ok) setNotifications(noteData);

            } catch (err) {
                console.error("Dashboard fetch error:", err);
            }
        };

        if (token) {
            fetchDashboardData();
        }
    }, [API_BASE_URL, token]);

    return (
        <div className="p-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium">
                        Welcome, <span className="text-blue-600">{user?.full_name}</span> | {user?.division} Division
                    </p>
                </div>
                <Link 
                    to="/submit-report" 
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                    <Plus size={20} /> New Report
                </Link>
            </header>

            {/* Notifications / Warnings Section */}
            {notifications.length > 0 && (
                <div className="mb-8 space-y-4">
                    {notifications.map((note) => (
                        <div 
                            key={note.id} 
                            className="flex items-center gap-4 p-4 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm"
                        >
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="text-red-600" size={20} />
                            </div>
                            <div>
                                <p className="text-red-800 font-semibold text-sm">Action Required</p>
                                <p className="text-gray-700 text-sm">{note.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* History Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Submission History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Period</th>
                                <th className="p-4 font-semibold">Submitted Date</th>
                                <th className="p-4 font-semibold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reports.length > 0 ? (
                                reports.map((report) => (
                                    <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">
                                            {new Date(report.start_date).toLocaleDateString()} - {new Date(report.end_date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(report.submitted_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    <CheckCircle size={14} /> Submitted
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-gray-400">
                                        <p>No reports found in your history.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;