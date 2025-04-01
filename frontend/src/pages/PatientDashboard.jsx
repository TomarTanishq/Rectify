import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AppointmentIcon from '../assets/icons/schedule.png'
import AiIcon from '../assets/icons/ai.png'
import SendIcon from '../assets/icons/send.png'
import AddVisitor from './AddVisitor'

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([])
    
    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [error, setError] = useState('')
    const [activeSection, setActiveSection] = useState('appointments')
    const [aiResponse, setAiResponse] = useState('');
    const [userPrompt, setUserPrompt] = useState('');

    const phoneNumber = localStorage.getItem("phoneNumber") || ''

    const fetchAppointments = async (phoneNumber) => {
        if (!phoneNumber) return;
        try {
            setLoading(true)
            setError('')
            const res = await axios.get(`http://localhost:3000/patients/contactNumber/${phoneNumber}`)
            setAppointments(res.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(`Error fetching appointments for ${error.message}`)
            console.log(error.message);
        }
    }

    const fetchAiResponse = async () => {
        if (!userPrompt.trim()) {
            setError('Please enter a prompt!')
        }
        try {
            setAiLoading(true)
            setError('')
            const res = await axios.post('http://localhost:3000/patients/diagnosis', {
                userPrompt
            })
            setAiResponse(res.data)
            setAiLoading(false)

        } catch (error) {
            setAiLoading(false)
            setError(`Error calling Rectify Ai, ${error.message}`)
            console.log(error.message);

        }
    }

    

    useEffect(() => {
        phoneNumber && fetchAppointments(phoneNumber)
    }, [phoneNumber])

    if (loading) {
        return <p className='text-gray-800 p-6 text-xl font-bold text-center place-self-center'>Loading appointments...</p>
    }
    if (error) {
        return <p className='text-red-500 p-6 text-xl font-bold'>{error}</p>
    }


    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <div className="bg-white w-60 shadow-lg fixed top-0 left-0 h-screen">
                <div className="p-6 h-0">
                    <h2 className="text-xl font-bold text-blue-600">Rectify</h2>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <button
                                onClick={() => setActiveSection("appointments")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "appointments" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={AppointmentIcon} className='w-7 h-7' />
                                Appointments
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("diagnosis")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "diagnosis" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={AiIcon} className='w-7 h-7' />
                                AI Diagnosis
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection("bookAppointment")}
                                className={`w-full text-left px-6 py-3 hover:bg-blue-50
                                    ${activeSection === "bookAppointment" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                            >
                                <img src={AppointmentIcon} className='w-7 h-7' />
                                Book Appointment
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">

                {/* Nav Sort Of */}
                <div className="bg-white flex items-center mt-6 px-6 py-3 rounded-full shadow-md w-[25%] justify-center place-self-center">

                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-blue-600">Rectify</h1>
                    <p className="ml-5 font-semibold text-gray-500">Ai Powered Healthcare</p>
                </div>

                {/* Dynamic Content */}
                <main>
                    {/* Show Appointments */}
                    {activeSection === 'appointments' && (
                        <div className='mt-10 bg-white p-10 rounded-xl'>
                            <p className='text-lg font-semibold'>Total Doctor Visits: {appointments.length}</p>
                            <table className='w-full text-left border mt-5'>
                                <thead className='text-lg text-gray-600'>
                                    <tr className='bg-gray-200'>
                                        <th className='p-2'>Diagnosed By</th>
                                        <th className='p-2'>Diagnosis</th>
                                        <th className='p-2'>Medication</th>
                                        <th className='p-2'>Diagnosed On</th>
                                        <th className='p-2'>Next Appointment</th>
                                    </tr>
                                </thead>

                                {appointments.length > 0 ? (
                                    <tbody className='bg-gray-50'>
                                        {appointments.map((appointment, index) => (
                                            appointment.medicalHistory.map((entry, i) => (
                                                <tr key={`${index}-${i}`} className='border-b-2'>
                                                    {i === 0 && (
                                                        <td rowSpan={appointment.medicalHistory.length}
                                                            className='p-2 border-r-2'
                                                        >
                                                            Dr. {appointment.doctorName}
                                                        </td>
                                                    )}
                                                    <td className='p-2'>{entry.diagnosis}</td>
                                                    <td className='p-2'>{entry.medication}</td>
                                                    <td className='p-2'>{new Date(entry.diagnosedDate).toLocaleDateString()}</td>
                                                    <td className='p-2'>{new Date(appointment.nextAppointment).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td>No records found</td>
                                        </tr>
                                    </tbody>
                                )}

                            </table>
                        </div>
                    )}

                    {/* Ai Diagnosis */}
                    {activeSection === 'diagnosis' && (
                        <div className='flex flex-col'>
                            <div className='bg-white flex flex-col mt-12 rounded-xl shadow-2xl p-10 w-[80%] max-h-lvh place-self-center'>
                                <div className="relative w-[70%] place-self-center">
                                    <input
                                        type="text"
                                        name='userPrompt'
                                        value={userPrompt}
                                        onChange={(e) => setUserPrompt(e.target.value)}
                                        placeholder="Try It"
                                        className="w-full border py-3 px-10 rounded-lg shadow-sm pl-12"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                                        onClick={fetchAiResponse}
                                        disabled={loading} // Prevent multiple clicks
                                    >
                                        {aiLoading ? (
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                        ) : (
                                            <img src={SendIcon} alt="Send" className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {aiResponse && (
                                    <div className='mt-6 p-6 rounded-lg w-[70%] place-self-center overflow-auto'>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {aiResponse}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Online Appointment booking */}
                    {activeSection === 'bookAppointment' && <AddVisitor/>}
                </main>
            </div>
        </div>
    )
}

export default PatientDashboard
