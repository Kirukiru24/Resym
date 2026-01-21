import { useEffect, useState } from 'react';
import { Download, Users, FileCheck, Eye, X, Briefcase } from 'lucide-react';

const HodDashboard = () => {
    const [allReports, setAllReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null); // State for the View Modal
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAllReports = async () => {
            try {
                const headers = { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                const response = await fetch(`${API_BASE_URL}/reports/hod/reports`, { 
                    method: 'GET',
                    headers: headers 
                });
                const data = await response.json();
                if (response.ok) setAllReports(data);
            } catch (err) {
                console.error("HOD Dashboard error:", err);
            }
        };
        if (token) fetchAllReports();
    }, [API_BASE_URL, token]);

    const downloadPDF = async (reportId, employeeName) => {
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch(`${API_BASE_URL}/reports/export/${reportId}`, {
                method: 'GET',
                headers: headers
            });
            if (!response.ok) throw new Error("Export failed");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Weekly_Report_${employeeName.replace(/\s+/g, '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert("Error downloading PDF");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-blue-900">Department Oversight</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Team Submissions</p>
                        <p className="text-2xl font-bold text-gray-800">{allReports.length}</p>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Employee & Position</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Division</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Period</th>
                                <th className="p-4 text-center font-semibold uppercase text-xs tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allReports.map(report => (
                                <tr key={report.id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{report.full_name}</div>
                                        <div className="flex items-center gap-1 text-xs text-blue-600 font-medium uppercase tracking-tight">
                                            <Briefcase size={12}/> {report.position || 'Staff'}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium text-sm">{report.division}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(report.start_date).toLocaleDateString()} - {new Date(report.end_date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => setSelectedReport(report)}
                                                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
                                            >
                                                <Eye size={16} /> View
                                            </button>
                                            <button 
                                                onClick={() => downloadPDF(report.id, report.full_name)}
                                                className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition"
                                            >
                                                <Download size={16} /> PDF
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- VIEW MODAL --- */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{selectedReport.full_name}'s Report</h2>
                                <p className="text-sm text-gray-500">
                                    Period: {new Date(selectedReport.start_date).toLocaleDateString()} to {new Date(selectedReport.end_date).toLocaleDateString()}
                                </p>
                            </div>
                            <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Tasks Section */}
                            {/* Change this section in your Modal inside HodDashboard.jsx */}
<section>
    <h3 className="text-lg font-bold text-blue-900 mb-4">Activities & Tasks</h3>
    <div className="space-y-4">
        {selectedReport.tasks && selectedReport.tasks.length > 0 ? (
            selectedReport.tasks.map((task, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">{task.title}</span>
                        <span className="text-xs font-bold text-blue-600">{task.status}</span>
                    </div>
                    <p className="text-sm text-gray-600">{task.notes}</p>
                </div>
            ))
        ) : (
            <p className="text-gray-400 italic">No specific tasks listed for this week.</p>
        )}
    </div>
</section>

                            {/* Narrative Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <h4 className="font-bold text-green-800 mb-2">Achievements</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{selectedReport.achievements || "None reported."}</p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="font-bold text-red-800 mb-2">Challenges</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{selectedReport.challenges || "None reported."}</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-2">Future Plans</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{selectedReport.future_plans || "None reported."}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50 flex justify-end">
                            <button onClick={() => setSelectedReport(null)} className="px-6 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-black transition">
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HodDashboard;