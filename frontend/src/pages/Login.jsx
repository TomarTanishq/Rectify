import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = ({ setDoctorId }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res=await axios.post('http://localhost:3000/doctors/login', {
                email,
                password
            }, {
                withCredentials: true
            })
            const docId=res.data._id
            setDoctorId(docId)
            localStorage.setItem("doctorId",docId)
            console.log(res.data.name,"Logged in");
            navigate('/doctors/dashboard')
        } catch (error) {
            console.log(error || "Login failed");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded w-80 shadow-md">
                <h2 className="text-center text-lg mb-4">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 shadow-md w-full mb-4 border"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 shadow-md w-full mb-4 border"
                />
                <button type="submit" className="p-2 mb-4 bg-blue-500 rounded-md w-full text-white">Login</button>
                <p className="flex justify-center p-2 text-sm">Not registered?<Link to={"/doctors/register"} className="text-blue-500"> Register here</Link></p>
            </form>
        </div>
    )
}

export default Login