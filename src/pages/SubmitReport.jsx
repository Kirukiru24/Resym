import { useState } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubmitReport = () => {
    const navigate = useNavigate();
    
    // Environment Variables & Local Storage
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');

    const [report, setReport] = useState({
        start_date: '',
        end_date: '',
        challenges: '',
        achievements: '',
        future_plans: '',
        tasks: [{ title: '', status: 'IN_PROGRESS', time_spent: '', notes: '' }]
    });

    const handleMainChange = (e) => {
        setReport({ ...report, [e.target.name]: e.target.value });
    };

    const handleTaskChange = (index, e) => {
        const newTasks = [...report.tasks];
        newTasks[index][e.target.name] = e.target.value;
        setReport({ ...report, tasks: newTasks });
    };

    const addTask = () => {
        setReport({
            ...report,
            tasks: [...report.tasks, { title: '', status: 'In Progress', time_spent: '', notes: '' }]
        });
    };

    const removeTask = (index) => {
        const newTasks = report.tasks.filter((_, i) => i !== index);
        setReport({ ...report, tasks: newTasks });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const headers = { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // Using the 'fetch' pattern as requested
            const response = await fetch(`${API_BASE_URL}/reports/submit`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(report)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Report submitted successfully!");
                navigate('/dashboard');
            } else {
                alert(data.error || "Submission failed");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An error occurred while submitting the report.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 mb-20 border border-gray-100">
            <div className="flex flex-col mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-blue-900">Weekly Progress Report</h1>
                <p className="text-gray-500">Fill out your activities for the week below.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div>
                        <label className="block font-bold text-blue-900 text-sm mb-1 uppercase tracking-wider">Week Start Date</label>
                        <input type="date" name="start_date" onChange={handleMainChange} required className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block font-bold text-blue-900 text-sm mb-1 uppercase tracking-wider">Week End Date</label>
                        <input type="date" name="end_date" onChange={handleMainChange} required className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                {/* Tasks Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            Activities & Tasks
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{report.tasks.length}</span>
                        </h2>
                        <button type="button" onClick={addTask} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm">
                            <Plus size={18} /> Add Row
                        </button>
                    </div>

                    {report.tasks.map((task, index) => (
                        <div key={index} className="border border-gray-200 p-5 rounded-xl mb-6 bg-white shadow-sm relative hover:border-blue-300 transition-colors">
                            {report.tasks.length > 1 && (
                                <button type="button" onClick={() => removeTask(index)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                    <Trash2 size={16} />
                                </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                                <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Task Title</label>
                                    <input name="title" value={task.title} onChange={(e) => handleTaskChange(index, e)} placeholder="e.g. Odoo Module Dev" className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                                    <select name="status" value={task.status} onChange={(e) => handleTaskChange(index, e)} className="w-full p-2 border rounded-lg mt-1 bg-white outline-none focus:border-blue-500">
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="PENDING">Pending</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Time Spent</label>
                                    <input name="time_spent" value={task.time_spent} onChange={(e) => handleTaskChange(index, e)} placeholder="e.g. 10 hr" className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-blue-500" required />
                                </div>
                            </div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Detailed Notes</label>
                            <textarea name="notes" value={task.notes} onChange={(e) => handleTaskChange(index, e)} placeholder="Provide context on your progress..." className="w-full p-2 border rounded-lg h-24 mt-1 outline-none focus:border-blue-500" />
                        </div>
                    ))}
                </div>

                {/* Narrative Sections */}
                <div className="grid grid-cols-1 gap-6 pt-6 border-t">
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">Major Achievements</label>
                        <textarea name="achievements" onChange={handleMainChange} className="w-full p-3 border rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What did you successfully deliver this week?" />
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">Challenges Encountered</label>
                        <textarea name="challenges" onChange={handleMainChange} className="w-full p-3 border rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Any blockers or issues?" />
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">Future Plans & Goals</label>
                        <textarea name="future_plans" onChange={handleMainChange} className="w-full p-3 border rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What is on the agenda for next week?" />
                    </div>
                </div>

                <button type="submit" className="w-full flex justify-center items-center gap-3 bg-blue-800 text-white font-extrabold py-4 rounded-2xl hover:bg-blue-900 transition-all shadow-lg active:scale-95 text-lg">
                    <Send size={22} /> Submit to Department Head
                </button>
            </form>
        </div>
    );
};

export default SubmitReport;
