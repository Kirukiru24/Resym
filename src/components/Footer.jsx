const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-800 font-bold text-lg">ALTA Computec PLC</p>
                    <p className="text-gray-500 text-sm italic">The ICT solution center</p>
                </div>
                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Reporting System. All rights reserved.
                </div>
                <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600">Terms of Service</a>
                    <a href="#" className="hover:text-blue-600">Support</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;