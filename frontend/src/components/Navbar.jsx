import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-bold text-gray-800">
                            Recitfy
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="flex space-x-4 items-center">
                        <a href="/" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </a>
                        <a href="/about" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </a>
                        <a href="/contact" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </a>
                        <a href="/doctors/login" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            Doctor
                        </a>
                        <a href="/visitor" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                            Patient
                        </a>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;