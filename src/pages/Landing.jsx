import { Link } from 'react-router-dom';
import { BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    let dashboardPath = '/dashboard';
    if (user.role === 'ADMIN' || user.role === 'DEPT_HEAD') dashboardPath = '/admin-dashboard';

    // Animation Variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    // Feature Card Hover Variant
    const cardHover = {
        rest: { scale: 1, y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
        hover: { 
            scale: 1.05, 
            y: -10, 
            transition: { type: "spring", stiffness: 300 }
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="py-20 px-6 max-w-7xl mx-auto text-center">
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.2 }}>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-[#98d000] mb-6">
                        Weekly Reporting <br />
                        <span className="text-[#0000b9]">Simplified for ALTA.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        A simplified and easy way for ALTA employees to submit weekly progress reports and for managers to track team performance.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="flex justify-center gap-4">
                        <Link 
                            to={token ? dashboardPath : "/register"} 
                            className="bg-[#98d000] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#0000b9] transition shadow-lg"
                        >
                            {token ? "Go to Dashboard" : "Get Started"}
                        </Link>
                        <Link 
                            to={token ? dashboardPath : "/login"} 
                            className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
                        >
                            {token ? "View Reports" : "Sign In"}
                        </Link>
                    </motion.div>
                </motion.div>
            </header>

            {/* Features Section */}
            <section className="bg-gray-50 py-20 px-6">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.2 }}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
                >
                    {/* Feature 1 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover="hover"
                        initial="rest"
                        className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-default"
                        style={{ ...cardHover.rest }}
                        animate={{ ...cardHover.rest }}
                        whileHover={cardHover.hover}
                    >
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0000b9]">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Quick Submission</h3>
                        <p className="text-gray-600">Submit your weekly progress in just a few clicks.</p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={cardHover.hover}
                        className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-default"
                    >
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0000b9]">
                            <BarChart3 size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Manager Insights</h3>
                        <p className="text-gray-600">Department heads can view team progress and download branded PDFs instantly.</p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={cardHover.hover}
                        className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-default"
                    >
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0000b9]">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Deadline Alerts</h3>
                        <p className="text-gray-600">Automated weekend warnings ensure no weekly report is left behind.</p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Landing;