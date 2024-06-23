const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async(req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(200).send({ 
                message: "User already exists", 
                success: false 
            });
        }
        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send({ 
            message: "User created successfully.", 
            success: true 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error creating user", 
            success: false, error 
        });
    }
});

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ 
                message: "User does not exist", 
                success: false 
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(200).send({ 
                message: "Password is incorrect", 
                success: false 
            });
        } else {
            const token = jwt.sign({ 
                id: user._id 
            }, process.env.JWT_SECRET, { 
                expiresIn: "1d" 
            });
            res.status(200).send({ 
                message: "Login Successful", 
                success: true, 
                data: token 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error logging in", 
            success: false, 
            error 
        });
    }
});

router.post('/get-user-info-by-id', authMiddleware, async(req, res)=> {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;

        if (!user) {
            return res.status(200).send({ 
                message: "User does not exist", 
                success: false 
            });
        } else {
            res.status(200).send({ 
                success: true, 
                data: user
            });
        }
    } catch (error) {
        res.status(500).send({ 
            message: "Error getting user info", 
            success: false, 
            error 
        });
    }
});

router.post('/apply-doctor-account', authMiddleware, async(req, res) => {
    try {
        const newDoctor = new Doctor({...req.body, status: "Pending" });
        await newDoctor.save();        
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account.`,
            data: {
                doctorId : newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
            },
            onClickPath: '/admin/doctors-list'
        });
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(200).send({ 
            success: true, 
            message: "Doctor account applied successfully. "
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error applying for Doctor account", 
            success: false, error 
        });
    }
});

router.post('/mark-all-notifications-as-seen', authMiddleware, async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({ 
            success: true, 
            message: "All notifications marked as seen.",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error marking notifications", 
            success: false, error 
        });
    }
});

router.post('/delete-all-notifications', authMiddleware, async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({ 
            success: true, 
            message: "All notifications cleared.",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error deleting notifications", 
            success: false, error 
        });
    }
});

router.get('/get-all-approved-doctors', authMiddleware, async(req, res) => {
    try {
        const doctors = await Doctor.find({status: "Approved"});
        res.status(200).send({
            message: "Doctors fetched successfully!",
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error fetching doctors accounts",
            success: false,
            error
        });
    }
});

router.post('/book-appointment', authMiddleware, async(req, res) => {
    try {
        req.body.status = "Pending";
        req.body.date = moment(req.body.date, 'MM-DD-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH A').toISOString();
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        //pushing notifications to doctor based on his userId
        const user = await User.findOne({ _id: req.body.doctorInfo.userId});
        user.unseenNotifications.push({
            type: 'new-appointment-request',
            message: `A new appointment request has been made by ${req.body.userInfo.name}`,
            onClickPath: '/doctor/appointments'
        });
        await user.save();
        res.status(200).send({
            message: "Appointment booked successfully.", 
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking an appointment.",
            success: false,
            error
        });
    }
});

router.post('/check-booking-availability', authMiddleware, async(req, res) => {
    try {
        const date = moment(req.body.date, 'MM-DD-YYYY').toISOString();
        const fromTime = moment(req.body.time, 'HH A').subtract(59, 'm').toISOString();
        const toTime = moment(req.body.time, 'HH A').add(59, 'm').toISOString();
        const doctorId = req.body.doctorId;

        const appointments = await Appointment.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: toTime },
        });

        if(appointments.length > 0) {
            return res.status(200).send({
                message: "Appointment date not available", 
                success: false,
            });
        } else {
            return res.status(200).send({
                message: "Appointment date available", 
                success: true,
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking an appointment.",
            success: false,
            error
        });
    }
});

router.get('/get-appointments-by-user-id', authMiddleware, async(req, res) => {
    try {
        const appointments = await Appointment.find({userId: req.body.userId});
        res.status(200).send({
            message: "Appointments fetched successfully!",
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error fetching appointments",
            success: false,
            error
        });
    }
});

module.exports = router;