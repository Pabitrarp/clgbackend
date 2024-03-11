const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    userType:{
        type: String,
        required: true,
        default: "customer",
        enum:["customer","admin"]
    },
},{timestamps: true,versionKey: false})

const Student = mongoose.model("User",userSchema);

module.exports = Student;
