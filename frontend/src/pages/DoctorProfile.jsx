import React from 'react';
import doctorIcon from '../assets/icons/doctor.png';

const DoctorProfile = ({ totalPatientsToday, totalPatientsVisited, doctorDetails }) => {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-5">
      {/* Left Section - Doctor Profile */}
      <div className="w-full md:w-2/3 bg-gray-200 rounded-2xl shadow-lg p-5">
        <div className="flex flex-col items-center bg-white rounded-2xl p-5">
          <img src={doctorIcon} alt="Doctor Icon" className="w-36 h-36 object-cover mb-4" />
          <h2 className="text-lg font-semibold">{doctorDetails.name}</h2>
          <p className="text-gray-600">{doctorDetails.specialization}</p>
          <p className="text-gray-500 text-sm">{doctorDetails.email}</p>
          <p className="text-gray-500 text-sm">{doctorDetails.phoneNumber}</p>
        </div>
        
        {/* Stats Section */}
        <div className="mt-5 flex flex-wrap gap-5 justify-center">
          <div className="w-52 bg-green-300 p-5 rounded-3xl shadow-md text-center">
            <h2 className="font-semibold text-xl text-green-800">Today's Appointments</h2>
            <p className="font-semibold text-xl text-green-800">{totalPatientsToday.length}</p>
          </div>
          <div className="w-52 bg-amber-300 p-5 rounded-3xl shadow-md text-center">
            <h2 className="font-semibold text-xl text-amber-700">Total Patients Visited</h2>
            <p className="font-semibold text-xl text-amber-700">{totalPatientsVisited.length}</p>
          </div>
          <div className="w-52 bg-purple-300 p-5 rounded-3xl shadow-md text-center">
            <h2 className="font-semibold text-xl text-purple-800">Total Income</h2>
            <p className="font-semibold text-xl text-purple-800">₹{totalPatientsVisited.length * 350}</p>
          </div>
        </div>
      </div>
      
      {/* Right Section - CRON Scheduler */}
      <div className="w-full md:w-1/3 bg-white p-5 rounded-2xl shadow-lg flex flex-col justify-center text-center">
        <h2 className="text-lg font-semibold text-gray-800">Remind Me</h2>
        <p className="text-gray-600 mt-2">Automated reminders for upcoming appointments</p>
        <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Schedule Reminder
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
