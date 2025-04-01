import React from "react";
import Navbar from "../components/Navbar";
const ContactPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h1>
                    <p className="text-gray-600 mb-6">
                        If you have any questions or would like to get in touch, feel free to reach out to me via email.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-800 font-medium">Email Address:</p>
                        <p className="text-blue-500 hover:text-blue-600 break-all">tanishqtomar4@gmail.com</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;