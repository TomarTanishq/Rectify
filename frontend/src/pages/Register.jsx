import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        phoneNumber: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:3000/doctors/registration', formData, {
                withCredentials: true
            })
            navigate('/doctors/login')
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleRegister}>
                <h2 className="text-lg mb-4 text-center">Register</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full shadow-sm"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full shadow-sm"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full shadow-sm"
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full shadow-sm"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full shadow-sm"
                />
                <button className="bg-blue-500 text-white p-2 mb-4 rounded-lg w-full" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register