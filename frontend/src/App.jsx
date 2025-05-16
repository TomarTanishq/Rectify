import React, { lazy, useState } from "react";
import { Route, Routes } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const ContactPage = lazy(() => import("./pages/ContactPage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))
const AddPatient = lazy(() => import("./pages/AddPatient"))
const VisitorPage = lazy(() => import("./pages/VisitorPage"))
const PatientLogin = lazy(() => import("./pages/PatientLogin"))
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"))

function App() {

  const [doctorId, setDoctorId] = useState(localStorage.getItem("doctorId") || "")

  return (
    <Routes>
      <Route path='/' element={<VisitorPage />} />
      <Route path="/doctors/register" element={<Register />} />
      <Route path="/doctors/login" element={<Login setDoctorId={setDoctorId} />} />
      <Route path="/doctors/dashboard" element={<Dashboard doctorId={doctorId} />} />
      <Route path="/doctors/add/patients" element={<AddPatient />} />
      <Route path="/contact" element={<ContactPage />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/patients/login" element={<PatientLogin />}></Route>
      <Route path="/patients/dashboard" element={<PatientDashboard />}></Route>
      {/* <Route path="/visitor" element={<VisitorPage />}></Route> */}
      {/* <Route path="/doctors/showall/patients" element={<ShowPatients />}></Route> */}
    </Routes>
  )
}

export default App