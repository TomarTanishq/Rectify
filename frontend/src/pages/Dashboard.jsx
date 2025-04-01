import React, { useEffect, useState } from "react";
import PatientIcon from '../assets/icons/patient.png'
import AppointmentIcon from '../assets/icons/schedule.png'
import ProfileIcon from '../assets/icons/profile.png'
import axios from 'axios'
import AddPatient from "./AddPatient";
import ShowPatients from "./ShowPatients";
import ShowAppointments from "./ShowAppointments";
import DoctorProfile from "./DoctorProfile";


const Dashboard = ({ doctorId }) => {

    const [activeSection, setActiveSection] = useState("appointments")
    const [totalPatientsToday, setTotalPatientsToday] = useState(0)
    const [showAddPatientForm, setShowAddPatientForm] = useState(false)
    const [showPatientsList, setShowPatientsList] = useState(false)
    const [totalPatientsVisited, setTotalPatientsVisited] = useState(0)
    const [doctorDetails, setDoctorDetails] = useState(null)

    const fetchDoctorDetails = async () => {
        if (!doctorId) {
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/doctors/${doctorId}`, {
                withCredentials: true
            })
            setDoctorDetails(res.data)
        } catch (error) {
            console.error("Failed fetching Doctor details", error);
        }
    }
    
    useEffect(() => {
        fetchDoctorDetails()
    }, [doctorId])

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <div className="bg-white w-60 shadow-lg fixed top-0 left-0 h-screen">
                <div className="p-6 h-0">
                    <h2 className="text-xl font-bold text-gray-800">Rectify</h2>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <button
                                onClick={() => setActiveSection("patients")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "patients" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={PatientIcon} className="w-7 h-7 mb-1" />
                                Patients
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("appointments")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "appointments" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={AppointmentIcon} className="w-7 h-7 mb-1" />
                                Appointments
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("profile")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={ProfileIcon} className="w-7 h-7 mb-1" />
                                Profile
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-60">
                <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-60 right-0 z-10">
                    <h1 className="ml-2 text-xl font-bold text-gray-800">Welcome Dr.{}</h1>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-3xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </header>

                {/* Dynamic Content */}
                <main className="p-6 mt-16">
                    {activeSection === "patients" && (
                        <div className="h-full relative">
                            <div className="">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Details</h2>
                                <p className="text-gray-600 mb-5">Manage your patients here</p>
                                <div className="flex gap-4 mb-5">
                                    <button
                                        onClick={() => {
                                            setShowAddPatientForm(true);
                                            setShowPatientsList(false)
                                        }}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Add Patient
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddPatientForm(false);
                                            setShowPatientsList(true);
                                        }}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Show Patients
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                {/* Add Patient Form */}
                                {showAddPatientForm && <AddPatient />}

                                {/* Show Patient List */}
                                {showPatientsList && <ShowPatients />}
                            </div>
                        </div>
                    )}
                    {activeSection === "appointments" && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
                            <p className="text-gray-600">View and manage your Appointments here</p>
                            {<ShowAppointments setTotalPatientsToday={setTotalPatientsToday}
                                setTotalPatientsVisited={setTotalPatientsVisited}
                                docId={doctorId} />}
                        </div>
                    )}

                    {activeSection === "profile" && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                {<DoctorProfile totalPatientsToday={totalPatientsToday}
                                    totalPatientsVisited={totalPatientsVisited}
                                    doctorDetails={doctorDetails} />}
                            </div>
                        </div>
                    )}


                </main>
            </div>
        </div>
    )
}

export default Dashboard