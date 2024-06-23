const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,  
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    website: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    specialization: {
        type: String,
        require: true,
    },
    experience: {
        type: String,
        require: true,
    },
    feePerConsultation: {
        type: String,
        require: true,
    },
    schedule: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
    }
}, {
    timestamps: true,
});

const doctorModel = mongoose.model('doctors', doctorSchema);

module.exports = doctorModel;