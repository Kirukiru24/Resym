import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, ShieldCheck, Zap } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="py-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                    Weekly Reporting <br />
                    <span className="text-blue-600">Simplified for ALTA.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    A simplified and easy way for ALTA employees to submit weekly progress reports and for managers to track team performance.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg">
                        Get Started
                    </Link>
                    <Link to="/login" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-200 transition">
                        Sign In
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Quick Submission</h3>
                        <p className="text-gray-600">Dynamic task tables allow you to log Odoo modules and HR updates in seconds.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <BarChart3 size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Manager Insights</h3>
                        <p className="text-gray-600">Department heads can view team progress and download branded PDFs instantly.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Deadline Alerts</h3>
                        <p className="text-gray-600">Automated weekend warnings ensure no weekly report is left behind.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;