import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from "react-router-dom"


const PatientLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  async function sendOtp() {
    setLoading(true)
    setError("")
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    })
    console.log("Send OTP Response", data);
    if (error) {
      setError("Error sending OTP", error.message)
      alert(error.message)
    }
    setLoading(false)
  }

  async function verifyOtp() {
    setLoading(true)
    setError("")
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms'
    })

    console.log("Verify OTP response", data);

    if (error) {
      setError("OTP Verification Failed", error.message)
      alert(error.message)
    } else if (data?.session) {
      alert("Login successful!")
      console.log("Session", JSON.stringify(data.session));
      const trimmedPhoneNumber=phoneNumber.slice(3,13)
      console.log(trimmedPhoneNumber);
      
      localStorage.setItem("session", JSON.stringify(data.session))
      localStorage.setItem("phoneNumber", trimmedPhoneNumber)
      navigate("/patients/dashboard")
    } else {
      setError("No session returned")
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Patient Login</h1>

        {/* Error Section */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+9112312312"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => sendOtp()}
          >
            Send Otp
          </button>
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => verifyOtp()}
          >
            Verify Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;