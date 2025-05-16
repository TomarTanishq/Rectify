//Required Dependencies
import express from 'express'
import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import llamaService from './llamaService.js'
import cors from 'cors'
//URI
const MONGO_URI = 'mongodb+srv://nodejsboy:nodejsboy@cluster1.ad7a3.mongodb.net/?retryWrites=true'

//Initializing express object
const app = express()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
}))

//Authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({ error: "Token not found" })
        }

        const decoded = jwt.verify(token, "monumentalkattar")

        const doctor = await Doctor.findById(decoded.id)

        if (!doctor) {
            throw new Error("Doctor not found")
        }

        req.doctor = doctor

        next()
    } catch (err) {
        console.log("Authentication Error", err.message);
        res.status(401).json({ error: "Please authenticate" })
    }
}

//Mongodb connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('DB not connected'))

//Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: String,
    phoneNumber: String,
    createdAt: { type: Date, default: Date.now }
})

//Patient Schema
const patientSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    doctorName: { type: String },
    name: { type: String, required: true },
    age: Number,
    contactNumber: String,
    address: String,
    gender: String,
    medicalHistory: [{
        condition: String,
        diagnosis: String,
        medication: [String],
        diagnosedDate: { type: Date, default: Date.now },
    }],
    vitals: [{
        bloodPressure: String,
        heartRate: String,
        temperature: String,
        date: { type: Date, default: Date.now },
        AdditionalReadings: [String]
    }],
    nextAppointment: Date,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

//Online-Appointment Visitor Schema
const visitorSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    name: { type: String, required: true },
    age: Number,
    gender: String,
    contactNumber: { type: String, required: true },
    appointmentDate: Date,
    address: String,

})

//Middleware for 'pre' saving doctor's name
patientSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("doctor")) {
        const doctor = await mongoose.model("Doctor").findById(this.doctor);
        if (doctor) {
            this.doctorName = doctor.name;  // Automatically store doctor's name
        }
    }
    next();
});

//Models for Schema
const Doctor = mongoose.model('Doctor', doctorSchema)
const Patient = mongoose.model('Patient', patientSchema)
const Visitor = mongoose.model('Visitor', visitorSchema)


//ROUTES

//Doctor Registration
app.post('/doctors/registration', async (req, res) => {
    try {
        const { name, email, password, specialization, phoneNumber } = req.body

        //Check if Doctor already exists
        const existingDoctor = await Doctor.findOne({ email })
        if (existingDoctor) {
            return res.status(400).json({ error: 'Email already registered' })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Create New Doctor
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization,
            phoneNumber
        })

        await doctor.save()

        //Generate JWT 
        const token = jwt.sign({ id: doctor._id }, "monumentalkattar")

        res.status(201).cookie("token", token).json({ doctor })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Doctor Login
app.post('/doctors/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //Find Doctor
        const doctor = await Doctor.findOne({ email })
        if (!doctor) {
            return res.status(400).json({ error: 'Invalid credentials!' })
        }

        //Verify Password
        const isPasswordValid = await bcrypt.compare(password, doctor.password)
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        //Generate JWT 
        const token = jwt.sign({ id: doctor._id }, "monumentalkattar")

        res.status(201).cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            domain: 'localhost',
            path: '/'
        }).json(doctor)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Patient Appointments
app.get('/patients/contactNumber/:contactNumber', async (req, res) => {
    try {
        const contactNumber = req.params.contactNumber
        const patient = await Patient.find({ contactNumber })
        if (!patient) {
            return res.status(400).json({ error: "No record found" })
        }
        res.status(201).json(patient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//Get all doctors
app.get('/patients/bookAppointment/', async (req, res) => {
    try {
        const doctors = await Doctor.find().select('name _id specialization')
        // const doctors = await Doctor.find({},'name _id specialization')
        if (!doctors) {
            return res.status(400).json({ error: "No record Found!" })
        }
        res.status(201).json(doctors)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//Add new Patient
app.post('/patients/add', authMiddleware, async (req, res) => {
    try {
        const {
            name, age, gender, contactNumber,
            address, medicalHistory, vitals, nextAppointment
        } = req.body

        const patient = new Patient({
            doctor: req.doctor.id,
            name, age, gender, contactNumber,
            address, medicalHistory, vitals, nextAppointment
        })

        await patient.save()
        res.status(201).json(patient)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Add an online appointment visitor
app.post('/visitors/onlineAppointment', async (req, res) => {
    try {
        const {
            doctor, name, age, gender, contactNumber, appointmentDate, address
        } = req.body

        const visitor = new Visitor({
            doctor, name, age, gender, contactNumber, appointmentDate, address
        })

        await visitor.save()
        res.status(201).json(visitor)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//Get all online appointments
app.get("/visitors/:doctor", async (req, res) => {
    try {
        const doctor = req.params.doctor
        const visitors = await Visitor.find({ doctor })
        if(!visitors){
            return res.status(400).json({error:"No visitor found!"})
        }
        res.status(201).json(visitors)
    } catch (error) {

    }
})

//Get all Patients for a Doctor
app.post("/patients/all", authMiddleware, async (req, res) => {
    try {
        const patients = await Patient.find({ doctor: req.doctor._id })
        res.json(patients)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//Get specific Patient
app.get("/patients/:id", authMiddleware, async (req, res) => {
    try {
        const patient = await Patient.findOne({
            _id: req.params.id,
            doctor: req.doctor._id
        })
        if (!patient) {
            return res.status(400).json({ error: "Patient not found!" })
        }

        // console.log(req.doctor.name);
        res.json(patient)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//Get Doctor Details
app.get("/doctors/:id", authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found!' })
        }
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Update patient data
app.patch('/patients/:id', authMiddleware, async (req, res) => {
    try {
        const updates = req.body
        updates.updatedAt = new Date()
        const patient = await Patient.findOneAndUpdate(
            { _id: req.params.id, doctor: req.doctor._id },
            updates,
            { new: true }
        )

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' })
        }

        res.json(patient)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Update Vital Signs
app.post('/patients/:id/vitals', authMiddleware, async (req, res) => {
    try {
        const patient = await Patient.findOne({
            _id: req.params.id,
            doctor: req.doctor._id
        })

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' })
        }

        patient.vitals.push({
            AdditionalReadings: req.body
        })

        await patient.save()

        res.status(201).json(patient)

    } catch (error) {
        res.status(404).json({ error: err.message })
    }
})

//LLaMA API diagnosis
app.post('/patients/diagnosis', async (req, res) => {
    try {

        const { userPrompt } = req.body;

        //Create a prompt for LLaMA
        const prompt = `
            User Message: ${userPrompt}
            You are Rectify AI, a medical assistant that helps a patient diagnose their symptoms.
            Provide a precise, structured medical diagnosis in the following format:
                
            ## **Diagnosis**
            1. **Primary Condition**  
               - *Medical condition 1*  
               - *Medical condition 2*  
                
            2. **Definition:**  
               - *Define the condition briefly*  
                
            3. **Severity:**  
               - *Mild / Moderate / Severe* 
                
            4. **Certainty Level:**  
               - *Probable / Confirmed / Suspected*
                
            ## **Medical Details**  
            1. **Prevalence:**  
               - How common is this condition  
                
            2. **Risk Factors:**  
               - Factor 1  
               - Factor 2  
                
            3. **Symptoms:**  
               - Symptom 1  
               - Symptom 2  
                
            ## **Medications**  
            ### **1. Name: Generic Name**  
               - Use For what reason is it used  
               - Brand Name Indian Brand Name  
               - Type Medicine type  
               - Dosage Specific dosage  
               - Frequency How often  
                
            ## **Home Remedies**  
            - **Lifestyle:**  
               - Recommendation 1  
               - Recommendation 2  
                
            - **Dietary:**  
               - Diet Tip 1  
               - Diet Tip 2  
                
            - **Activity:**  
               - Activity Recommendation  
                
            ## **Monitoring**  
            1. **Follow-up Frequency:** Recommended timeline  
            2. **Warning Signals:**  
               - Signal 1  
               - Signal 2  
                
            Respond strictly in this format. The response should be **well-structured**, with **bold headings and proper Markdown syntax**.
            If a user write their symptom with probable cause, take it into consideration
            Do not respond in this format when the user does not write his/her symptoms instead respond in the following:
            ## **Hi,Welcome to Rectify AI**

            Please describe your symptoms so I can provide a precise medical diagnosis.
            `


        //Call LLaMA API service to generate diagnosis
        const aiResponse = await llamaService(prompt)

        res.send(aiResponse)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

//Listening Port
app.listen(3000, () => {
    console.log('Server is running');

})