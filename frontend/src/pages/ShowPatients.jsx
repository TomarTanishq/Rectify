import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowPatients = () => {

    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [searchContact, setSearchContact] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredPatients, setFilteredPatients] = useState([])

    const fetchPatients = async () => {
        try {
            const res = await axios.post('http://localhost:3000/patients/all', {}, {
                withCredentials: true
            })
            setPatients(res.data)
            setLoading(false)


        } catch (error) {
            console.log("Error Fetching Patients", error);
            setError("Failed to fetch patients.Try again later.")
            setLoading(false)

        }
    }

    const fetchPatientDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/patients/${id}`, {
                withCredentials: true
            })
            setSelectedPatient(res.data)

        } catch (error) {
            console.error("Error fetching patient details", error)
            setError("Failed to fetch details of patient")
        }
    }

    const handleSearch = () => {
        const foundPatients = patients.filter(patient =>
            patient.contactNumber.includes(searchContact)
        )
        setFilteredPatients(foundPatients)
    }

    const resetSearch = () => {
        setSearchContact('')
        setFilteredPatients([])

    }


    useEffect(() => {
        fetchPatients();
    }, [])

    if (loading) {
        return <p className='text-gray-800 p-6 text-xl font-bold'>Loading patients...</p>
    }

    if (error) {
        return <p className='text-red-500 p-6 text-xl font-bold'>{error}</p>
    }

    return (
        <div className="relative">
            {/* Blurred Background and Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-5 shadow-lg max-w-lg w-full">
                        <h2 className="text-center font-bold text-lg">Patient Details</h2>
                        <div className='bg-gray-100 rounded-lg shadow-md p-1'>
                            <p><strong>Name: </strong> {selectedPatient.name}</p>
                            <p><strong>Age: </strong> {selectedPatient.age}</p>
                            <p><strong>Contact: </strong> {selectedPatient.contactNumber}</p>
                            <p><strong>Gender: </strong> {selectedPatient.gender}</p>
                            <p><strong>Next Appointment: </strong>{new Date(selectedPatient.nextAppointment).toLocaleDateString()}</p>
                        </div>

                        <p className='text-center font-bold text-lg'>Medical History</p>
                        {selectedPatient.medicalHistory.length > 0 ? (
                            selectedPatient.medicalHistory.map((entry, index) => (
                                <div key={index} className='bg-gray-100 rounded-lg shadow-md p-1'>
                                    <p><strong>Condition: </strong>{entry.condition}</p>
                                    <p><strong>Diagnosis: </strong>{entry.diagnosis}</p>
                                    <p><strong>Medication: </strong>{entry.medication}</p>
                                    <p><strong>Diagnosed on: </strong>{new Date(entry.diagnosedDate).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No medical History</p>
                        )}

                        <p className='text-center font-bold text-lg'>Vitals</p>
                        {selectedPatient.vitals.length > 0 ? (
                            selectedPatient.vitals.map((entry, index) => (
                                <div key={index} className='bg-gray-100 rounded-lg shadow-md p-1'>
                                    <p><strong>Blood Pressure: </strong>{entry.bloodPressure}</p>
                                    <p><strong>Heart Rate: </strong>{entry.heartRate}</p>
                                    <p><strong>Temperature: </strong>{entry.temperature}</p>
                                    <p><strong>Diagnosed on: </strong>{entry.date}</p>
                                    <p className='text-center font-semibold text-base'>Additional Readings</p>
                                    <p>{entry.AdditionalReadings}</p>
                                </div>
                            ))
                        ) : (
                            <p>No Vitals entry</p>
                        )}

                        <button
                            onClick={() => setSelectedPatient(null)}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`${selectedPatient ? 'blur-sm' : ''} bg-white p-5 rounded-xl shadow-md`}>
                <div className='bg-gray-100 rounded-lg p-2 shadow-lg'>
                    <h2 className='font-semibold text-lg mb-2 w-full ml-2.5'>Search Patients By</h2>
                    <input
                        type="text"
                        placeholder='Contact'
                        value={searchContact}
                        onChange={(e) => setSearchContact(e.target.value)}
                        className='mb-5 border border-gray-500 rounded-xl p-2 ml-2'
                    />
                    <button
                        onClick={handleSearch}
                        className='bg-blue-500 text-white ml-3 p-2 rounded-xl'
                    >
                        Search
                    </button>
                    <button
                        onClick={resetSearch}
                        className='bg-gray-500 text-white ml-2 p-2 rounded-xl'
                    >
                        Reset Search
                    </button>
                </div>

                {filteredPatients.length > 0 ? (
                    <div className='mt-5 bg-gray-50'>
                        <table className='w-full text-left border'>
                            <thead className='text-lg text-gray-600'>
                                <tr className='bg-gray-200'>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2'>Age</th>
                                    <th className='p-2'>Contact</th>
                                    <th className='p-2'>Next Appointment</th>
                                    <th className='p-2'>More Details</th>
                                </tr>
                            </thead>
                            {filteredPatients.map((patient, index) => (
                                <tbody key={index} className='content-center'>
                                    <tr className='border-b'>
                                        <td className='p-2'>{patient.name}</td>
                                        <td className='p-2'>{patient.age}</td>
                                        <td className='p-2'>{patient.contactNumber}</td>
                                        <td className='p-2'>{new Date(patient.nextAppointment).toLocaleDateString()}</td>
                                        <td className='p-2'>
                                            <button
                                                onClick={() => fetchPatientDetails(patient._id)}
                                                className=" bg-blue-500 rounded-xl text-white p-1"
                                            >
                                                Show Details
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                ) : (
                    <div className='mt-5 bg-gray-50'>
                        <table className="w-full text-left border">
                            <thead className='text-lg text-gray-600'>
                                <tr className='bg-gray-200'>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2'>Age</th>
                                    <th className='p-2'>Contact</th>
                                    <th className='p-2'>Next Appointment</th>
                                    <th className='p-2'>More Details</th>
                                </tr>
                            </thead>
                            {patients.map((patient, index) => (
                                <tbody key={index} className='content-center'>
                                    <tr className='border-b'>
                                        <td className='p-2'>{patient.age}</td>
                                        <td className='p-2'>{patient.name}</td>
                                        <td className='p-2'>{patient.contactNumber}</td>
                                        <td className='p-2'>{new Date(patient.nextAppointment).toLocaleDateString()}</td>
                                        <td className='p-2'>
                                            <button
                                                onClick={() => fetchPatientDetails(patient._id)}
                                                className=" bg-blue-500 rounded-xl text-white p-1"
                                            >
                                                Show Details
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowPatients
