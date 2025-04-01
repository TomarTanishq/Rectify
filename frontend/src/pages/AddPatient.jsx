import React, { useState } from "react";
import axios from "axios";

const AddPatient = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        contactNumber: '',
        address: '',
        gender: '',
        medicalHistory: [{
            condition: '',
            diagnosis: '',
            medication: ['']
        }],
        vitals: [{
            bloodPressure: '',
            heartRate: '',
            temperature: '',
            AdditionalReadings: ['']
        }],
        nextAppointment: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleMedicalHistoryChange = (index, e) => {
        const { name, value } = e.target
        const newMedicalHistory = [...formData.medicalHistory]
        newMedicalHistory[index][name] = value
        setFormData(prev => ({
            ...prev,
            medicalHistory: newMedicalHistory
        }))
    }

    const addMedicalHistoryEntry = () => {
        setFormData({
            ...formData,
            medicalHistory: [...formData.medicalHistory, { condition: '', diagnosis: '', medication: [''] }]
        })
    }

    const handleVitalChange = (index, e) => {
        const { name, value } = e.target
        const newVitals = [...formData.vitals]
        newVitals[index][name] = value
        setFormData(prev => ({
            ...prev,
            vitals: newVitals
        }))
    }

    const handleAddPatient = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/patients/add', formData, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error.message || error);
            alert("Failed to add patient")
        }
    }
    return (
        <div className="border rounded-2xl p-5 bg-white shadow-md">
            <h2 className="font-semibold text-gray-900 text-lg">Fill Patient Information</h2>
            <div className="mt-5">
                <form onSubmit={handleAddPatient}>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Next Appointment</label>
                            <input
                                type="date"
                                name="nextAppointment"
                                value={formData.nextAppointment}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500" />
                        </div>
                        <div>
                            <label className="block mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 text-gray-500">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="block mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-5">
                        <label className="block mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className=" rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="mt-5">
                        <h2 className="mb-2 ">Medical History</h2>
                        {formData.medicalHistory.map((entry, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="condition"
                                    placeholder="Condition"
                                    value={entry.condition}
                                    onChange={(e) => handleMedicalHistoryChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <input
                                    type="text"
                                    name="diagnosis"
                                    placeholder="Diagnosis"
                                    value={entry.diagnosis}
                                    onChange={(e) => handleMedicalHistoryChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <input
                                    type="text"
                                    name="medication"
                                    placeholder="Medication"
                                    value={entry.medication}
                                    onChange={(e) => handleMedicalHistoryChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <button
                                    type="button"
                                    onClick={addMedicalHistoryEntry}
                                    className="border border-gray-300 rounded-md p-1 mt-2 bg-blue-500 text-white">
                                    New Medical History</button>
                            </div>


                        ))}
                    </div>

                    <div className="mt-5">
                        <h2 className="mb-2">Vitals</h2>
                        {formData.vitals.map((entry, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="bloodPressure"
                                    placeholder="BloodPressure"
                                    value={entry.bloodPressure}
                                    onChange={(e) => handleVitalChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <input
                                    type="text"
                                    name="heartRate"
                                    placeholder="HeartRate"
                                    value={entry.heartRate}
                                    onChange={(e) => handleVitalChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <input
                                    type="text"
                                    name="temperature"
                                    placeholder="Temperature"
                                    value={entry.temperature}
                                    onChange={(e) => handleVitalChange(index, e)}
                                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                <input
                                    type="text"
                                    name="AdditionalReadings"
                                    placeholder="AdditionalReadings"
                                    value={entry.AdditionalReadings}
                                    onChange={(e) => handleVitalChange(index, e)}
                                    className="w-85 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="mt-10 bg-blue-500 rouded rounded-md p-2 text-white">
                        Add Patient
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddPatient