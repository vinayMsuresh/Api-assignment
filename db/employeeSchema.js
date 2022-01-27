const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    emp_id: {
        type: String,
        required: true,
        unique: true
    },
    empname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("employee", employeeSchema);