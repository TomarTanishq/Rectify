import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

const ShowAppointments = ({ setTotalPatientsToday, setTotalPatientsVisited, docId }) => {

  const [patients, setPatients] = useState([])
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ModalOpen, setModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const todaysDate = new Date().toLocaleDateString()

  // Fetching Patients
  const fetchPatients = async () => {
    try {
      const res = await axios.post('http://localhost:3000/patients/all', {}, {
        withCredentials: true
      })
      setPatients(res.data)
      setLoading(false)
    } catch (error) {
      console.error("Error Fetching Patients", error)
      setError("Failed to fetch patients")
      setLoading(false)
    }
  }

  // Fetching Visitors
  const fetchVisitors = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/visitors/${docId}`)
      setLoading(false)
      setVisitors(res.data)
    } catch (error) {
      setError("Failed to fetch visitors")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()

  }, [])

  useEffect(() => {
    fetchVisitors()
  }, [])

  //Memo hook to filter out patients for "TODAY"
  const todaysPatients = useMemo(() => {

    //Filtering patients array for "TODAY"
    const todaysPatients = patients.filter(
      (patient) => new Date(patient.nextAppointment).toLocaleDateString() === todaysDate
    )

    //Filtering visitors arrat for"TODAY
    const todaysVisitors = visitors.filter(
      (visitor) => new Date(visitor.appointmentDate).toLocaleDateString() === todaysDate
    )

    return [...todaysPatients, ...todaysVisitors]
  }, [patients, todaysDate])

  const totalPatientsToday = todaysPatients.length
  const totalPatientsVisited = patients

  useEffect(() => {
    setTotalPatientsToday(todaysPatients)
  }, [todaysPatients])

  useEffect(() => {
    setTotalPatientsVisited(totalPatientsVisited)
  }, [patients])

  const openModal = (patient) => {
    setSelectedPatient(patient)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedPatient(null)
  }

  if (loading) {
    return <p className='text-gray-800 p-6 text-xl font-bold'>Loading patients...</p>
  }
  if (error) {
    return <p className='text-red-500 p-6 text-xl font-bold'>{error}</p>
  }

  return (
    <div className='mt-5 bg-white p-5 rounded-2xl'>
      <div className='bg-green-300 w-64 p-5 rounded-3xl shadow-lg'>
        <h2 className='font-semibold text-xl text-green-800'>Today's Appointments</h2>
        <p className='font-semibold text-xl text-green-800'>{totalPatientsToday}</p>
      </div>
      <div className='mt-5 bg-gray-50'>
        <table className=' w-full text-left border'>
          <thead className='text-lg text-gray-600'>
            <tr className='bg-gray-200 '>
              <th className='p-2'>Name</th>
              <th className='p-2'>Contact Number</th>
              <th className='p-2'>Diagnosed On</th>
              <th className='p-2'>More Details</th>
            </tr>
          </thead>

          {/* Mapping Patients for TODAY */}
          {patients.map((patient, index) =>
          (
            new Date(patient.nextAppointment).toLocaleDateString() === todaysDate ?
              (
                <tbody key={index} className='border-b'>
                  <tr>
                    <td className='p-2'>{patient.name}</td>
                    <td className='p-2'>{patient.contactNumber}</td>
                    <td className='p-2'>{new Date(patient.createdAt).toLocaleDateString()}</td>
                    <td className='p-2'>
                      <button
                        className='p-1 bg-blue-500 rounded-xl text-white'
                        onClick={() => openModal(patient)}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              ) : null
          ))}

          {/* Mapping Visitors for TODAY */}
          {visitors.length > 0 && (
            visitors.map((visitor, index) =>
              new Date(visitor.appointmentDate).toLocaleDateString() === todaysDate ?
                (
                  <tbody key={index} className='border-b'>
                    <tr>
                      <td className='p-2'>{visitor.name}</td>
                      <td className='p-2'>{visitor.contactNumber}</td>
                      <td className='p-2 bg-red-100 font-semibold text-red-500'>Not yet Diagnosed</td>
                      <td className='p-2 bg-red-100 font-semibold text-red-500'>No details</td>
                    </tr>
                  </tbody>
                ): null
            )
          )}

        </table>
        {/* Modal */}
        {ModalOpen && selectedPatient && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-5 shadow-lg max-w-lg w-full text-sm">
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
                onClick={() => closeModal()}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Passing totalPatientsToday as a prop */}
    </div>
  )
}

export default ShowAppointments
