const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const EmployeeScheme = new Scheme({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        // required: true
    },
    salary: {
        type: Number,
        required: true
    },
    createdAT: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const EmployeeModel = mongoose.model('employees', EmployeeScheme);

module.exports = EmployeeModel;