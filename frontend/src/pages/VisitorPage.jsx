import React from "react";
import llama from "../assets/icons/llama.png"
import { useNavigate } from "react-router";

const VisitorPage = () => {

  const navigate = useNavigate()

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">

      {/* Navbar */}
      <div className="bg-white flex items-center mt-6 px-6 py-3 rounded-full shadow-md">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">Rectify</h1>
        <p className="ml-5 font-semibold text-gray-500">Ai Powered Healthcare</p>
      </div>

      {/* Page Content */}
      <div className="mt-10 w-[70%] p-5 text-center">
        <h2 className="text-5xl font-extrabold text-black">
          Healthcare <br />
          <span className="text-blue-600">made easy</span> <br />
        </h2>
        <div className="mt-10 text-lg text-gray-500">
          <p>Diagnose your symptoms and get personalised</p>
          <p>AI diagnosis and book a certified doctor's apppointment</p>
        </div>
        <div className="mt-8 text-2xl font-bold">
          <button
            onClick={() => navigate('/doctors/login')}
            className="p-2 bg-blue-500 rounded-3xl text-gray-100">
            Doctors
          </button>
          <button
            onClick={()=> navigate('/patients/login')}
            className="ml-3 p-2 text-gray-800">
            Patients
          </button>
        </div>
      </div>
      <hr className="w-full" />

      {/* Feature Section */}
      <div className="bg-white w-[80%] p-5 mt-5 rounded-lg grid grid-cols-2 text-lg text-gray-500 shadow-md">

        {/* Image */}
        <div className="flex justify-center items-center">
          <img className="w-48 h-auto object-contain" src={llama} />
        </div>

        {/* Text */}
        <div className="mt-5">
          <p>
            Rectify uses llama-3.2 90b model through Groq for diagnosing symptoms of
            a patient.
          </p>
          <p>
            The model provides information of diagnosed disease, promotes
            home remedies, recommends over the counter medication and books
            appointment with Doctors when needed </p>
        </div>
      </div>


    </div>
  );
};

export default VisitorPage;
