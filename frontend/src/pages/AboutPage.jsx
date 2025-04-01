import React from "react";
import Navbar from "../components/Navbar";
const AboutPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">About Us</h1>
                    <p className="text-gray-600 mb-6">
                        Welcome to <span className="font-semibold">Recitfy</span>, your trusted platform for managing patient records and improving healthcare delivery.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Our mission is to provide doctors and healthcare professionals with a seamless and efficient way to manage patient information, track medical histories, and ensure better patient outcomes.
                    </p>
                    <p className="text-gray-600 mb-6">
                        With <span className="font-semibold">Recitfy</span>, you can:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        <li>Easily add and update patient records.</li>
                        <li>Track medical histories and vitals in real-time.</li>
                        <li>Access patient information securely from anywhere.</li>
                        <li>Improve communication and collaboration among healthcare teams.</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                        We are committed to making healthcare management simpler, faster, and more effective. Thank you for choosing <span className="font-semibold">Recitfy</span>!
                    </p>
                    <div className="text-center">
                        <a
                            href="/contact"
                            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;