const mongoose = require("mongoose")
const empschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field must required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email field must required"]
    },
    number: {
        type: Number,
        unique: true,
        required: [true, "Phone number field must required"]
    },
    dsg: {
        type: String,
        required: [true, "Designation field must required"]
    },
    salary: {
        type: Number,
        required: [true, "Salary field must required"]
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    }
})

const Empployees = new mongoose.model("Employees", empschema)
module.exports = Empployees