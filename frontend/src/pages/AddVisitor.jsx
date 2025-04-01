import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const AddVisitor = () => {

    const [doctors, setDoctors] = useState([])
    const [doctorError, setDoctorError] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        doctor: '',
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        appointmentDate: '',
        address: ''
    })

    //Fetching Doctors
    const fetchDoctors = async () => {
        try {
            setLoading(true)
            setError('')
            const res = await axios.get('http://localhost:3000/patients/bookAppointment')
            setDoctors(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(`Error fetching Doctors ${error.message}`)
            console.log(error.message);

        }
    }

    //Handle Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //Handle Visitor Data submission
    const handleAddVisitor = async (e) => {
        setSubmitting(true)
        setError('')
        setDoctorError('')
        e.preventDefault()

        //Custom handling formData
        if (!formData.doctor) {
            setSubmitting(false)
            setDoctorError('Please select a doctor!')
            return
        }

        try {
            const res = await axios.post('http://localhost:3000/visitors/onlineAppointment', formData)
            setFormData({
                doctor: '', name: '', age: '', gender: '', contactNumber: '', appointmentDate: '', address: ''
            })
        } catch (error) {
            setError(`Failed to book appointment: ${error.message}`)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    //Handle Loading state
    if (loading) {
        return <p className='text-gray-800 p-6 text-xl font-bold text-center place-self-center'>...............</p>
    }
    if (error) {
        return <p className='text-red-500 p-6 text-xl font-bold'>{error}</p>
    }

    //Handling form submission loading state
    if (submitting) {
        return <p className='text-gray-800 p-6 text-xl font-bold text-center place-self-center'>Submiting data</p>
    }
    if (error) {
        return <p className='text-red-500 p-6 text-xl font-bold'>{error}</p>
    }

    return (
        <div className='mt-10 bg-white rounded-xl flex flex-row'>

            {/* Left Section */}
            <div className='p-10 bg-white rounded-lg'>
                <h1 className='w-80 text-4xl font-bold '>Book Your Appointment </h1>
                {doctors.length > 0 ? (
                    <div className='flex flex-row mt-10'>
                        <h2 className='font-semibold text-lg text-blue-600'>with Dr.</h2>
                        <div className='flex flex-col'>
                            <select
                                name='doctor'
                                value={formData.doctor}
                                onChange={handleChange}
                                required
                                className='ml-2 px-2 rounded-lg bg-white font-semibold text-gray-600 text-lg border border-gray-300'>
                                <option value="">Select a doctor</option>
                                {doctors.map((doctor, index) => (
                                    <option key={index} value={doctor._id}>{doctor.name} || {doctor.specialization}</option>
                                ))}
                            </select>
                            {doctorError ? (
                                <p className='text-red-500 font-semibold mt-5'>{doctorError}</p>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>

                ) : (
                    <p>No Doctors found!</p>
                )}
            </div>

            {/* Mid Line */}
            {/* <div className="mt-20 h-[270px] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div> */}

            {/* Right Section */}
            <div className='p-10 w-full'>
                <form onSubmit={handleAddVisitor}>
                    <div className='grid gap-6 grid-cols-2 mb-6'>
                        <div>
                            <label className='font-semibold block mb-2'>Name</label>
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                placeholder='Nolan'
                            />
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <label className='font-semibold block mb-2'>Age</label>
                                <input
                                    type="text"
                                    name='age'
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className='w-40 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    placeholder='22'
                                />
                            </div>
                            <div>
                                <label className='font-semibold block mb-2'>Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500 text-gray-500">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                        </div>
                        <div>
                            <label className='font-semibold block mb-2'>Contact Number</label>
                            <input
                                type="text"
                                name='contactNumber'
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                placeholder='Nolan'
                            />
                        </div>
                        <div>
                            <label className='font-semibold block mb-2'>Appointment Date</label>
                            <input
                                type="date"
                                name='appointmentDate'
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                required
                                className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500'
                            />
                        </div>
                    </div>

                    <div className='mb-6'>
                        <label className='font-semibold block mb-2'>Address</label>
                        <input
                            type="text"
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className='w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            placeholder='Church Street, Bangalore'
                        />
                    </div>
                    <button type='submit' className='mt-2 bg-blue-600 text-white p-2 rounded-lg'>Book Appointment</button>

                </form>
            </div>
        </div>
    )
}

export default AddVisitor
